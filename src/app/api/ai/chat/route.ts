import { NextRequest, NextResponse } from 'next/server';
import { generateCompletion, hasLiveAIConfigured } from '@/lib/ai';
import { getChatPrompt } from '@/lib/prompts';

export async function POST(request: NextRequest) {
  try {
    const { question, briefingContext, history } = await request.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    if (!hasLiveAIConfigured()) {
      return NextResponse.json({
        response: getMockChatResponse(question),
      });
    }

    const historyStr = history
      ?.map((m: { role: string; content: string }) => `${m.role}: ${m.content}`)
      .join('\n') || '';

    const prompt = getChatPrompt(briefingContext || '', question, historyStr);
    const result = await generateCompletion(prompt);

    return NextResponse.json({ response: result });
  } catch {
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}

function getMockChatResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('impact') || q.includes('affect')) {
    return 'Based on the briefing analysis, the impact is multi-dimensional. The primary sectors affected include banking, infrastructure, and consumer goods. Short-term market reactions have been positive, with institutional investors increasing their exposure. However, the medium-term outlook depends on execution of policy measures and global economic conditions.\n\nKey metrics to watch include quarterly earnings growth, credit offtake data, and foreign institutional investment flows over the next 2-3 months.';
  }
  if (q.includes('risk') || q.includes('concern')) {
    return 'The briefing highlights several risk factors worth monitoring. Global trade tensions, particularly around tariff escalation, pose the most significant external risk. Domestically, monsoon performance and food inflation trajectory remain key variables.\n\nAdditionally, execution risk on the government\'s ambitious capex program is a concern, given the historical pattern of H1 underspending. Oil prices above $85/barrel would also pressure fiscal calculations.';
  }
  return 'That\'s a great question. Based on the information in this briefing, the key takeaway is that India\'s economic fundamentals remain strong, supported by robust domestic demand, improving corporate earnings, and proactive policy measures.\n\nThe combination of fiscal stimulus through tax reforms and monetary easing through rate cuts creates a supportive environment for growth. Analysts expect GDP growth of 6.8-7.2% in FY27, making India the fastest-growing major economy.';
}
