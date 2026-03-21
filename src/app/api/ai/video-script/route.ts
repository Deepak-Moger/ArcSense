import { NextRequest, NextResponse } from 'next/server';
import { generateCompletion, hasLiveAIConfigured } from '@/lib/claude';
import { getVideoScriptPrompt } from '@/lib/prompts';
import { VideoSlide } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { article } = await request.json();

    if (!article) {
      return NextResponse.json({ error: 'Article is required' }, { status: 400 });
    }

    if (!hasLiveAIConfigured()) {
      return NextResponse.json(getMockVideoScript(article.id, article.title, article.content));
    }

    const prompt = getVideoScriptPrompt(article.title, article.content);
    const result = await generateCompletion(prompt);

    try {
      const parsed = JSON.parse(result);
      const slides: VideoSlide[] = parsed.slides.map((s: VideoSlide, i: number) => ({
        ...s,
        id: `slide-${i}`,
      }));
      const totalDuration = slides.reduce((sum: number, s: VideoSlide) => sum + s.duration, 0);

      return NextResponse.json({
        id: `video-${Date.now()}`,
        articleId: article.id,
        title: article.title,
        slides,
        totalDuration,
      });
    } catch {
      return NextResponse.json(getMockVideoScript(article.id, article.title, article.content));
    }
  } catch {
    return NextResponse.json({ error: 'Failed to generate video script' }, { status: 500 });
  }
}

function getMockVideoScript(articleId: string, title: string, content: string) {
  const firstSentence = content.split('.')[0] + '.';
  const slides: VideoSlide[] = [
    {
      id: 'slide-0',
      type: 'title',
      narration: `Breaking news from the Economic Times. ${firstSentence}`,
      displayText: title,
      duration: 12,
    },
    {
      id: 'slide-1',
      type: 'narration',
      narration: 'Let\'s break down the key developments and what they mean for you.',
      displayText: 'Key Developments',
      duration: 10,
    },
    {
      id: 'slide-2',
      type: 'data',
      narration: 'Here are the numbers that matter. The data tells a compelling story of growth and transformation across key metrics.',
      displayText: 'Key Metrics',
      duration: 15,
      dataPoints: [
        { label: 'Growth', value: 72, color: '#10b981' },
        { label: 'Market Share', value: 45, color: '#6366f1' },
        { label: 'Revenue', value: 88, color: '#f59e0b' },
        { label: 'Sentiment', value: 65, color: '#ef4444' },
      ],
    },
    {
      id: 'slide-3',
      type: 'quote',
      narration: 'Industry experts have weighed in on the significance of this development.',
      displayText: 'Expert Analysis',
      duration: 12,
      quote: {
        text: 'This development marks a significant inflection point for the Indian economy and could reshape the competitive landscape.',
        author: 'Industry Analyst, Goldman Sachs',
      },
    },
    {
      id: 'slide-4',
      type: 'narration',
      narration: 'The implications extend beyond the immediate sector, with ripple effects expected across banking, technology, and consumer markets.',
      displayText: 'Broader Implications',
      duration: 12,
    },
    {
      id: 'slide-5',
      type: 'conclusion',
      narration: 'Stay tuned for more updates as this story develops. This has been your ArcSense AI news briefing.',
      displayText: 'What to Watch Next',
      duration: 10,
    },
  ];

  return {
    id: `video-${Date.now()}`,
    articleId,
    title,
    slides,
    totalDuration: slides.reduce((sum, s) => sum + s.duration, 0),
  };
}
