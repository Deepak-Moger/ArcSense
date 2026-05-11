import { PersonaType, SupportedLanguage } from '@/types';

/**
 * These prompts only contain the *analytical* instructions. JSON shape is
 * enforced separately via zod schemas + `Output.object()` in the route
 * handlers, so we no longer hand-roll JSON skeletons here.
 */

export function getPersonaSummaryPrompt(
  articleTitle: string,
  articleContent: string,
  persona: PersonaType
): string {
  const personaInstructions: Record<PersonaType, string> = {
    investor: `Analyze the article from an INVESTOR perspective. Focus on stock mentions, market impact, sector trends, and valuation implications. Provide 2-3 sentences of personaInsights, 3-4 highlights about stock movements / sector impact / portfolio relevance, and a 1-10 relevanceScore for portfolio relevance.`,
    founder: `Analyze the article from a STARTUP FOUNDER perspective. Focus on the competitive landscape, funding implications, regulatory shifts, and market opportunities. Provide 2-3 sentences of personaInsights, 3-4 strategic highlights, and 2-3 concrete actionItems a founder should consider.`,
    student: `Analyze the article for a STUDENT learning about business. Explain in simple terms. Provide 2-3 sentences of personaInsights, 3-4 highlights translating key concepts into plain language, and 2-3 explainerNotes that define jargon or connect the story to broader economic concepts.`,
    journalist: `Analyze the article from a JOURNALIST perspective. Focus on source credibility, missing angles, follow-up opportunities, and verification points. Provide 2-3 sentences of personaInsights, 3-4 highlights of facts worth investigating, and a sourceAnalysis paragraph evaluating cited sources and missing perspectives.`,
  };

  return `Article Title: ${articleTitle}

Article Content:
${articleContent}

${personaInstructions[persona]}

Only include the persona-specific optional field (relevanceScore / actionItems / explainerNotes / sourceAnalysis) that matches the persona above. Set the other optional fields to null.`;
}

export function getBriefingPrompt(articleSummaries: string, topic: string): string {
  return `Generate a comprehensive news briefing on the topic: "${topic}".

Source material:
${articleSummaries}

Produce exactly 5 sections in this order with these types:
1. Key Highlights (type: "highlights") — bullet-point summary of the most important developments.
2. Deep Dive (type: "deep-dive") — detailed analysis of the core issues.
3. Sector Impact (type: "sector-impact") — how different sectors / industries are affected.
4. Expert Takes (type: "expert-takes") — synthesis from different expert perspectives.
5. What's Next (type: "whats-next") — forward-looking analysis and signals to watch.

Each section's content should be 150-300 words. You MAY use markdown (bold, bullet lists) inside content. Do not include any other sections.`;
}

export function getVideoScriptPrompt(articleTitle: string, articleContent: string): string {
  return `Create a 60-90 second broadcast-ready video news script based on this article.

Title: ${articleTitle}
Content: ${articleContent}

Produce 5-7 slides total. Use the slide types in this rough order: title, narration, data, quote, narration, conclusion. Include at least one "data" slide with 3-5 numeric dataPoints. Include at least one "quote" slide with a realistic attributed quote. Narration must be natural spoken English. Each slide.duration is in seconds (10-15 typical). For slides without dataPoints or a quote, set those fields to null.`;
}

export function getStoryArcPrompt(topic: string): string {
  return `Build a story-arc analysis for the topic: "${topic}".

Include 8-12 events with realistic dates spanning the past 12-18 months (YYYY-MM-DD). Include 4-6 named players (people, companies, or institutions) with imageInitials (1-3 chars). Include 10+ sentimentData points with date in YYYY-MM form, where positive + negative + neutral sums to roughly 100 each month. Provide 3-4 forward-looking predictions and a substantive contrarianView paragraph (3-5 sentences) that genuinely challenges the consensus view.`;
}

export function getTranslationPrompt(
  text: string,
  language: SupportedLanguage,
  articleTitle: string
): string {
  const langNames: Record<SupportedLanguage, string> = {
    hindi: 'Hindi',
    tamil: 'Tamil',
    telugu: 'Telugu',
    bengali: 'Bengali',
  };

  return `Translate AND culturally adapt this business news article into ${langNames[language]}.

Article Title: ${articleTitle}
Article Content:
${text}

This is NOT a literal translation. Adapt for a ${langNames[language]}-speaking business audience:
- Explain Western business terms using local context.
- Add cultural references where appropriate.
- Maintain factual accuracy while keeping it accessible.
- Use appropriate ${langNames[language]} business terminology and the ${langNames[language]} script.

Also return 3-5 contextNotes that highlight key translations or adaptations (original English term, ${langNames[language]} equivalent, and a brief explanatory note in English), and 2-3 culturalAdaptations describing higher-level adaptations made.`;
}

export function getSentimentPrompt(text: string): string {
  return `Analyze the sentiment of the following business news text and return structured sentiment metrics. The positive / negative / neutral percentages must sum to roughly 100. score must be between -1 (very negative) and 1 (very positive). Include 3-6 keyPhrases and a 1-3 sentence analysis explaining the drivers.

Text:
${text}`;
}

export function getChatSystemPrompt(briefingContext: string, topicTitle: string): string {
  return `You are ArcSense, an AI news analyst discussing a briefing on "${topicTitle}".

Use the briefing context below to answer questions accurately and insightfully. Reference specific facts from the briefing when possible. If a question is outside the briefing's scope, say so but offer related insight grounded in Indian business / macro context. Keep answers to 2-4 short paragraphs.

BRIEFING CONTEXT:
${briefingContext || '(No briefing context provided.)'}`;
}
