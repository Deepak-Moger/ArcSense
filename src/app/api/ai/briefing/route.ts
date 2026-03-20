import { NextRequest, NextResponse } from 'next/server';
import { generateCompletion } from '@/lib/claude';
import { getBriefingPrompt } from '@/lib/prompts';
import { mockBriefings } from '@/data/mock-briefings';

export async function POST(request: NextRequest) {
  try {
    const { topicId, articles } = await request.json();

    if (!topicId) {
      return NextResponse.json({ error: 'Topic ID is required' }, { status: 400 });
    }

    const mockBriefing = mockBriefings.find((b) => b.topicId === topicId);

    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your-api-key-here') {
      if (mockBriefing) {
        return NextResponse.json(mockBriefing);
      }
      return NextResponse.json(mockBriefings[0]);
    }

    const articleSummaries = articles
      ?.map((a: { title: string; summary: string }) => `- ${a.title}: ${a.summary}`)
      .join('\n') || 'Use your knowledge of recent Indian business news.';

    const prompt = getBriefingPrompt(articleSummaries, topicId);
    const result = await generateCompletion(prompt);

    try {
      const parsed = JSON.parse(result);
      return NextResponse.json({
        id: `brief-${Date.now()}`,
        topicId,
        title: `Briefing: ${topicId}`,
        sections: parsed.sections,
        generatedAt: new Date().toISOString(),
        articleIds: articles?.map((a: { id: string }) => a.id) || [],
      });
    } catch {
      if (mockBriefing) return NextResponse.json(mockBriefing);
      return NextResponse.json(mockBriefings[0]);
    }
  } catch {
    return NextResponse.json({ error: 'Failed to generate briefing' }, { status: 500 });
  }
}
