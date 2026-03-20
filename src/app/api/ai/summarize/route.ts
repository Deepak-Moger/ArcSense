import { NextRequest, NextResponse } from 'next/server';
import { generateCompletion } from '@/lib/claude';
import { getPersonaSummaryPrompt } from '@/lib/prompts';
import { PersonaType } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { article, persona } = await request.json();

    if (!article || !persona) {
      return NextResponse.json({ error: 'Article and persona are required' }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your-api-key-here') {
      return NextResponse.json(getMockAdaptation(persona, article.title));
    }

    const prompt = getPersonaSummaryPrompt(article.title, article.content, persona);
    const result = await generateCompletion(prompt);

    try {
      const parsed = JSON.parse(result);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json(getMockAdaptation(persona, article.title));
    }
  } catch {
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}

function getMockAdaptation(persona: PersonaType, title: string) {
  const adaptations: Record<PersonaType, object> = {
    investor: {
      personaInsights: `This development has significant implications for portfolio positioning. Market participants should watch for sector rotation opportunities and evaluate exposure to affected stocks.`,
      highlights: [
        'Direct impact on related sector stocks and indices',
        'Potential catalyst for institutional fund flows',
        'Valuation re-rating opportunity in affected segments',
        'Monitor for follow-through in coming trading sessions',
      ],
      relevanceScore: 7,
    },
    founder: {
      personaInsights: `This creates new competitive dynamics and potential opportunities for startups. Founders should evaluate how this affects their market positioning and funding landscape.`,
      highlights: [
        'Shifts in competitive landscape create entry opportunities',
        'Regulatory changes may open new market segments',
        'Funding sentiment likely to be influenced',
        'Strategic partnerships opportunities emerging',
      ],
      actionItems: [
        'Evaluate impact on your startup\'s target market',
        'Consider reaching out to affected industry players for partnerships',
        'Update investor pitch with relevant market context',
      ],
    },
    student: {
      personaInsights: `This article covers an important development in the Indian economy. It helps understand how government policies, market forces, and business strategies interact in the real world.`,
      highlights: [
        'Key economic concept demonstrated through real events',
        'Shows interconnection between policy decisions and market outcomes',
        'Example of how businesses adapt to changing environments',
        'Important for understanding Indian economic landscape',
      ],
      explainerNotes: [
        'GDP (Gross Domestic Product): Total value of goods and services produced in a country',
        'Market Cap: Total value of a company\'s shares — calculated as share price × total shares',
        'YoY (Year-on-Year): Comparing a metric to the same period in the previous year',
      ],
    },
    journalist: {
      personaInsights: `Multiple story angles emerge from this development. Key sources to follow up with include industry analysts, regulatory officials, and affected stakeholders for deeper coverage.`,
      highlights: [
        'Primary sources cited are institutional — verify with independent sources',
        'Data points need cross-referencing with official statistics',
        'Underrepresented stakeholder perspectives worth exploring',
        'Timeline suggests follow-up story opportunity in 2-3 weeks',
      ],
      sourceAnalysis: 'The article relies primarily on official statements and institutional analyst quotes. Independent verification of key claims would strengthen the reporting. Consider reaching out to affected communities or smaller industry players for alternative perspectives.',
    },
  };

  return adaptations[persona];
}
