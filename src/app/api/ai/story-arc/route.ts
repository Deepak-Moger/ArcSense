import { NextRequest, NextResponse } from 'next/server';
import { generateText, Output } from 'ai';
import { chatModel, hasLiveAIConfigured, DEFAULT_SYSTEM_PROMPT } from '@/lib/ai';
import { getStoryArcPrompt } from '@/lib/prompts';
import { storyArcSchema } from '@/lib/schemas';
import { storyArcs } from '@/data/mock-story-arcs';

export const maxDuration = 60;

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

    const { experimental_output } = await generateText({
      model: chatModel,
      system: DEFAULT_SYSTEM_PROMPT,
      prompt: getStoryArcPrompt(topic),
      experimental_output: Output.object({ schema: storyArcSchema }),
    });

    return NextResponse.json({
      id: `arc-${Date.now()}`,
      title: topic,
      description: `Story arc analysis for ${topic}`,
      category: 'Analysis',
      events: experimental_output.events.map((e, i) => ({ id: `evt-${i}`, ...e })),
      players: experimental_output.players.map((p, i) => ({ id: `player-${i}`, ...p })),
      sentimentData: experimental_output.sentimentData,
      predictions: experimental_output.predictions,
      contrarianView: experimental_output.contrarianView,
    });
  } catch (error) {
    console.error('[story-arc] error:', error);
    return NextResponse.json(storyArcs[0]);
  }
}
