import { NextRequest, NextResponse } from 'next/server';
import { generateText, Output } from 'ai';
import { chatModel, hasLiveAIConfigured, DEFAULT_SYSTEM_PROMPT } from '@/lib/ai';
import { getSentimentPrompt } from '@/lib/prompts';
import { sentimentSchema } from '@/lib/schemas';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    if (!hasLiveAIConfigured()) {
      return NextResponse.json({
        overall: 'positive',
        score: 0.65,
        positive: 55,
        negative: 20,
        neutral: 25,
        keyPhrases: ['growth', 'record earnings', 'positive outlook'],
        analysis:
          'The text conveys a predominantly positive sentiment driven by strong financial metrics and forward-looking optimism.',
      });
    }

    const { experimental_output } = await generateText({
      model: chatModel,
      system: DEFAULT_SYSTEM_PROMPT,
      prompt: getSentimentPrompt(text),
      experimental_output: Output.object({ schema: sentimentSchema }),
    });

    return NextResponse.json(experimental_output);
  } catch (error) {
    console.error('[sentiment] error:', error);
    return NextResponse.json(
      {
        overall: 'neutral',
        score: 0,
        positive: 33,
        negative: 33,
        neutral: 34,
        keyPhrases: [],
        analysis: 'Unable to parse sentiment analysis.',
      },
      { status: 200 }
    );
  }
}
