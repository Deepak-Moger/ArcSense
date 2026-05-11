import { NextRequest, NextResponse } from 'next/server';
import { generateText, Output } from 'ai';
import { chatModel, hasLiveAIConfigured, DEFAULT_SYSTEM_PROMPT } from '@/lib/ai';
import { getPersonaSummaryPrompt } from '@/lib/prompts';
import { personaSummarySchema } from '@/lib/schemas';
import { PersonaType } from '@/types';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const { article, persona } = await request.json();

    if (!article || !persona) {
      return NextResponse.json(
        { error: 'Article and persona are required' },
        { status: 400 }
      );
    }

    if (!hasLiveAIConfigured()) {
      return NextResponse.json(getMockAdaptation(persona));
    }

    const { experimental_output } = await generateText({
      model: chatModel,
      system: DEFAULT_SYSTEM_PROMPT,
      prompt: getPersonaSummaryPrompt(article.title, article.content, persona),
      experimental_output: Output.object({ schema: personaSummarySchema }),
    });

    return NextResponse.json(stripNulls(experimental_output));
  } catch (error) {
    console.error('[summarize] error:', error);
    // Fail soft to mock so the UI remains usable.
    try {
      const { persona } = await request.clone().json();
      if (persona) return NextResponse.json(getMockAdaptation(persona));
    } catch {
      // ignore
    }
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}

function stripNulls<T extends Record<string, unknown>>(value: T): Partial<T> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value)) {
    if (v !== null && v !== undefined) out[k] = v;
  }
  return out as Partial<T>;
}

function getMockAdaptation(persona: PersonaType) {
  const adaptations: Record<PersonaType, object> = {
    investor: {
      personaInsights:
        'This development has significant implications for portfolio positioning. Market participants should watch for sector rotation opportunities and evaluate exposure to affected stocks.',
      highlights: [
        'Direct impact on related sector stocks and indices',
        'Potential catalyst for institutional fund flows',
        'Valuation re-rating opportunity in affected segments',
        'Monitor for follow-through in coming trading sessions',
      ],
      relevanceScore: 7,
    },
    founder: {
      personaInsights:
        'This creates new competitive dynamics and potential opportunities for startups. Founders should evaluate how this affects their market positioning and funding landscape.',
      highlights: [
        'Shifts in competitive landscape create entry opportunities',
        'Regulatory changes may open new market segments',
        'Funding sentiment likely to be influenced',
        'Strategic partnership opportunities emerging',
      ],
      actionItems: [
        "Evaluate impact on your startup's target market",
        'Reach out to affected industry players for partnerships',
        'Update your investor pitch with relevant market context',
      ],
    },
    student: {
      personaInsights:
        'This article covers an important development in the Indian economy. It helps you understand how government policies, market forces, and business strategies interact in the real world.',
      highlights: [
        'Key economic concept demonstrated through real events',
        'Shows interconnection between policy decisions and market outcomes',
        'Example of how businesses adapt to changing environments',
        'Important for understanding the Indian economic landscape',
      ],
      explainerNotes: [
        'GDP (Gross Domestic Product): Total value of goods and services produced in a country.',
        "Market Cap: Total value of a company's shares — share price × total shares outstanding.",
        'YoY (Year-on-Year): Comparing a metric to the same period in the previous year.',
      ],
    },
    journalist: {
      personaInsights:
        'Multiple story angles emerge from this development. Key sources to follow up with include industry analysts, regulatory officials, and affected stakeholders.',
      highlights: [
        'Primary sources cited are institutional — verify with independent sources',
        'Data points need cross-referencing with official statistics',
        'Underrepresented stakeholder perspectives worth exploring',
        'Timeline suggests follow-up story opportunity in 2-3 weeks',
      ],
      sourceAnalysis:
        'The article relies primarily on official statements and institutional analyst quotes. Independent verification of key claims would strengthen the reporting. Reaching out to affected communities or smaller industry players would add alternative perspectives.',
    },
  };

  return adaptations[persona];
}
