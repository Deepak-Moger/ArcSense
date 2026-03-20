import { PersonaType, SupportedLanguage } from '@/types';

export function getPersonaSummaryPrompt(articleTitle: string, articleContent: string, persona: PersonaType): string {
  const personaInstructions: Record<PersonaType, string> = {
    investor: `Analyze this article from an INVESTOR perspective. Provide:
- personaInsights: 2-3 sentences on market impact and investment implications
- highlights: Array of 3-4 key points about stock movements, sector impact, portfolio relevance
- relevanceScore: 1-10 score for portfolio relevance
Focus on: stock mentions, market impact, sector trends, valuation implications.`,
    founder: `Analyze this article from a STARTUP FOUNDER perspective. Provide:
- personaInsights: 2-3 sentences on competitive intelligence and business opportunities
- highlights: Array of 3-4 key strategic takeaways
- actionItems: Array of 2-3 specific actions a founder should consider
Focus on: competitive landscape, funding implications, regulatory changes, market opportunities.`,
    student: `Analyze this article for a STUDENT who is learning about business. Provide:
- personaInsights: 2-3 sentences explaining the significance in simple terms
- highlights: Array of 3-4 key concepts explained simply
- explainerNotes: Array of 2-3 term definitions or concept explanations
Focus on: simplifying jargon, explaining context, connecting to broader economic concepts.`,
    journalist: `Analyze this article from a JOURNALIST perspective. Provide:
- personaInsights: 2-3 sentences on story angles and source quality
- highlights: Array of 3-4 key facts worth investigating further
- sourceAnalysis: Assessment of sources cited and potential angles not covered
Focus on: source credibility, missing perspectives, follow-up story angles, fact-check points.`,
  };

  return `Article Title: ${articleTitle}

Article Content: ${articleContent}

${personaInstructions[persona]}

Respond in JSON format:
{
  "personaInsights": "string",
  "highlights": ["string"],
  ${persona === 'investor' ? '"relevanceScore": number,' : ''}
  ${persona === 'founder' ? '"actionItems": ["string"],' : ''}
  ${persona === 'student' ? '"explainerNotes": ["string"],' : ''}
  ${persona === 'journalist' ? '"sourceAnalysis": "string",' : ''}
}`;
}

export function getBriefingPrompt(articleSummaries: string, topic: string): string {
  return `Generate a comprehensive news briefing on the topic: "${topic}"

Based on these article summaries:
${articleSummaries}

Create a structured briefing with exactly 5 sections. Respond in JSON format:
{
  "sections": [
    { "title": "Key Highlights", "type": "highlights", "content": "Bullet-point summary of the most important developments" },
    { "title": "Deep Dive", "type": "deep-dive", "content": "Detailed analysis of the core issues" },
    { "title": "Sector Impact", "type": "sector-impact", "content": "How different sectors/industries are affected" },
    { "title": "Expert Takes", "type": "expert-takes", "content": "Analysis from different expert perspectives" },
    { "title": "What's Next", "type": "whats-next", "content": "Forward-looking analysis and things to watch" }
  ]
}

Make each section 150-300 words. Use markdown formatting within content (bold, bullet points).`;
}

export function getChatPrompt(briefingContext: string, question: string, history: string): string {
  return `You are an AI news analyst discussing a briefing. Use the briefing context to answer questions accurately and insightfully.

BRIEFING CONTEXT:
${briefingContext}

CONVERSATION HISTORY:
${history}

USER QUESTION: ${question}

Provide a clear, concise answer (2-4 paragraphs). Reference specific facts from the briefing. If the question is outside the briefing scope, say so but offer related insights.`;
}

export function getVideoScriptPrompt(articleTitle: string, articleContent: string): string {
  return `Create a 60-90 second video news script based on this article.

Title: ${articleTitle}
Content: ${articleContent}

Generate a structured video script with 5-7 slides. Respond in JSON format:
{
  "slides": [
    {
      "type": "title",
      "narration": "Opening narration text (10-15 seconds)",
      "displayText": "Main headline text for the slide",
      "duration": 12
    },
    {
      "type": "narration",
      "narration": "Key facts narration (10-15 seconds)",
      "displayText": "Supporting text or key bullet points",
      "duration": 12
    },
    {
      "type": "data",
      "narration": "Data narration explaining the numbers",
      "displayText": "Chart title",
      "duration": 15,
      "dataPoints": [
        { "label": "Category", "value": 100 }
      ]
    },
    {
      "type": "quote",
      "narration": "Context for the quote",
      "displayText": "Quote attribution",
      "duration": 10,
      "quote": { "text": "The actual quote", "author": "Person Name, Title" }
    },
    {
      "type": "conclusion",
      "narration": "Closing narration summarizing impact",
      "displayText": "What to watch next",
      "duration": 10
    }
  ]
}

Make narration natural and broadcast-ready. Include at least one data slide with 3-5 numeric data points.`;
}

export function getStoryArcPrompt(topic: string): string {
  return `Analyze the story arc for: "${topic}"

Generate a comprehensive story arc analysis in JSON format:
{
  "events": [
    { "date": "YYYY-MM-DD", "title": "Event title", "description": "2-3 sentence description", "impact": "positive|negative|neutral", "sources": ["source names"] }
  ],
  "players": [
    { "name": "Person name", "role": "Their role", "description": "Brief description", "sentiment": "positive|negative|neutral", "imageInitials": "AB" }
  ],
  "sentimentData": [
    { "date": "YYYY-MM", "positive": 50, "negative": 30, "neutral": 20 }
  ],
  "predictions": ["Forward-looking prediction"],
  "contrarianView": "Alternative perspective paragraph"
}

Include 8-12 events, 4-6 players, 10+ sentiment data points, 3-4 predictions, and a substantive contrarian view.`;
}

export function getTranslationPrompt(text: string, language: SupportedLanguage, articleTitle: string): string {
  const langNames: Record<SupportedLanguage, string> = {
    hindi: 'Hindi',
    tamil: 'Tamil',
    telugu: 'Telugu',
    bengali: 'Bengali',
  };

  return `Translate and culturally adapt this business news article into ${langNames[language]}.

Article Title: ${articleTitle}
Article Content: ${text}

This is NOT a literal translation. Adapt the content for a ${langNames[language]}-speaking business audience:
- Explain Western business terms in local context
- Add cultural references where appropriate
- Maintain the factual accuracy while making it accessible
- Use appropriate business terminology in ${langNames[language]}

Respond in JSON format:
{
  "translatedText": "Full translated text in ${langNames[language]} script",
  "contextNotes": [
    { "original": "English term or phrase", "translated": "Translated equivalent", "note": "Explanation of the adaptation" }
  ],
  "culturalAdaptations": ["Description of cultural adaptations made"]
}

Include 3-5 context notes highlighting key translations or adaptations.`;
}

export function getSentimentPrompt(text: string): string {
  return `Analyze the sentiment of this business news text.

Text: ${text}

Respond in JSON format:
{
  "overall": "positive|negative|neutral",
  "score": 0.75,
  "positive": 60,
  "negative": 20,
  "neutral": 20,
  "keyPhrases": ["phrase contributing to sentiment"],
  "analysis": "Brief sentiment analysis explanation"
}

Score should be between -1 (very negative) and 1 (very positive).`;
}
