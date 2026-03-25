import { NextRequest, NextResponse } from 'next/server';
import { generateCompletion, hasLiveAIConfigured } from '@/lib/ai';
import { getSentimentPrompt } from '@/lib/prompts';

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
        analysis: 'The text conveys a predominantly positive sentiment driven by strong financial metrics and forward-looking optimism.',
      });
    }

    const prompt = getSentimentPrompt(text);
    const result = await generateCompletion(prompt);

    try {
      return NextResponse.json(JSON.parse(result));
    } catch {
      return NextResponse.json({
        overall: 'neutral',
        score: 0,
        positive: 33,
        negative: 33,
        neutral: 34,
        analysis: 'Unable to parse sentiment analysis.',
      });
    }
  } catch {
    return NextResponse.json({ error: 'Failed to analyze sentiment' }, { status: 500 });
  }
}
