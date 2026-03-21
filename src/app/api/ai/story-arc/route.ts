import { NextRequest, NextResponse } from 'next/server';
import { generateCompletion, hasLiveAIConfigured } from '@/lib/claude';
import { getStoryArcPrompt } from '@/lib/prompts';
import { storyArcs } from '@/data/mock-story-arcs';

export async function POST(request: NextRequest) {
  try {
    const { topic, arcId } = await request.json();

    if (arcId) {
      const arc = storyArcs.find((a) => a.id === arcId);
      if (arc) return NextResponse.json(arc);
    }

    if (!topic && !arcId) {
      return NextResponse.json({ error: 'Topic or arcId is required' }, { status: 400 });
    }

    if (!hasLiveAIConfigured()) {
      return NextResponse.json(storyArcs[0]);
    }

    const prompt = getStoryArcPrompt(topic);
    const result = await generateCompletion(prompt);

    try {
      const parsed = JSON.parse(result);
      return NextResponse.json({
        id: `arc-${Date.now()}`,
        title: topic,
        description: `Story arc analysis for ${topic}`,
        category: 'Analysis',
        ...parsed,
      });
    } catch {
      return NextResponse.json(storyArcs[0]);
    }
  } catch {
    return NextResponse.json({ error: 'Failed to generate story arc' }, { status: 500 });
  }
}
