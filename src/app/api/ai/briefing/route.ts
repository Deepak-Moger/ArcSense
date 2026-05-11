import { NextRequest, NextResponse } from 'next/server';
import { generateText, Output } from 'ai';
import { chatModel, hasLiveAIConfigured, DEFAULT_SYSTEM_PROMPT } from '@/lib/ai';
import { getBriefingPrompt } from '@/lib/prompts';
import { briefingSchema } from '@/lib/schemas';

export const maxDuration = 45;

interface BriefingArticle {
  id: string;
  title: string;
  summary: string;
}

function getRuntimeFallbackBriefing(topicId: string, articles: BriefingArticle[] = []) {
  const topArticles = articles.slice(0, 4);
  const bullets =
    topArticles.length > 0
      ? topArticles.map((a) => `- ${a.title}`).join('\n')
      : '- Live article context unavailable, using model-safe fallback.';

  return {
    id: `brief-fallback-${Date.now()}`,
    topicId,
    title: `Briefing: ${topicId}`,
    sections: [
      {
        title: 'Key Highlights',
        type: 'highlights' as const,
        content: `## Snapshot\n${bullets}`,
      },
      {
        title: 'Deep Dive',
        type: 'deep-dive' as const,
        content: `This briefing is running in fallback mode for ${topicId}. Re-run when live AI is available for richer analysis.`,
      },
      {
        title: 'Sector Impact',
        type: 'sector-impact' as const,
        content:
          'Primary effects are likely concentrated in policy-sensitive and macro-linked sectors.',
      },
      {
        title: 'Expert Takes',
        type: 'expert-takes' as const,
        content:
          'Analyst consensus is mixed in fallback mode; use live generation for concrete viewpoints.',
      },
      {
        title: "What's Next",
        type: 'whats-next' as const,
        content:
          'Track upcoming announcements, earnings commentary, and policy execution signals.',
      },
    ],
    generatedAt: new Date().toISOString(),
    articleIds: topArticles.map((a) => a.id),
  };
}

export async function POST(request: NextRequest) {
  try {
    const { topicId, articles } = await request.json();

    if (!topicId) {
      return NextResponse.json({ error: 'Topic ID is required' }, { status: 400 });
    }

    const normalizedArticles: BriefingArticle[] = Array.isArray(articles)
      ? articles.filter(
          (a: unknown): a is BriefingArticle =>
            !!a &&
            typeof a === 'object' &&
            typeof (a as BriefingArticle).id === 'string' &&
            typeof (a as BriefingArticle).title === 'string' &&
            typeof (a as BriefingArticle).summary === 'string'
        )
      : [];

    if (!hasLiveAIConfigured()) {
      return NextResponse.json(getRuntimeFallbackBriefing(topicId, normalizedArticles));
    }

    const articleSummaries = normalizedArticles.length
      ? normalizedArticles.map((a) => `- ${a.title}: ${a.summary}`).join('\n')
      : 'Use your knowledge of recent Indian business news.';

    const { experimental_output } = await generateText({
      model: chatModel,
      system: DEFAULT_SYSTEM_PROMPT,
      prompt: getBriefingPrompt(articleSummaries, topicId),
      experimental_output: Output.object({ schema: briefingSchema }),
    });

    return NextResponse.json({
      id: `brief-${Date.now()}`,
      topicId,
      title: `Briefing: ${topicId}`,
      sections: experimental_output.sections,
      generatedAt: new Date().toISOString(),
      articleIds: normalizedArticles.map((a) => a.id),
    });
  } catch (error) {
    console.error('[briefing] error:', error);
    try {
      const { topicId, articles } = await request.clone().json();
      const normalizedArticles: BriefingArticle[] = Array.isArray(articles) ? articles : [];
      if (topicId) {
        return NextResponse.json(
          getRuntimeFallbackBriefing(topicId, normalizedArticles)
        );
      }
    } catch {
      // ignore
    }
    return NextResponse.json({ error: 'Failed to generate briefing' }, { status: 500 });
  }
}
