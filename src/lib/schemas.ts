import { z } from 'zod';

/** Persona-adapted summary (My ET). */
export const personaSummarySchema = z.object({
  personaInsights: z.string().describe('2-3 sentences of persona-specific analysis.'),
  highlights: z.array(z.string()).min(2).max(6).describe('3-4 short bullet takeaways.'),
  // Optional persona-specific fields. We use .nullable() (not .optional()) so
  // strict-mode JSON schemas work consistently across providers.
  relevanceScore: z
    .number()
    .min(1)
    .max(10)
    .nullable()
    .describe('1-10 portfolio relevance (investor persona only).'),
  actionItems: z
    .array(z.string())
    .nullable()
    .describe('2-3 founder action items (founder persona only).'),
  explainerNotes: z
    .array(z.string())
    .nullable()
    .describe('2-3 term/concept explanations (student persona only).'),
  sourceAnalysis: z
    .string()
    .nullable()
    .describe('Source / angle analysis (journalist persona only).'),
});
export type PersonaSummary = z.infer<typeof personaSummarySchema>;

/** Multi-section topic briefing (News Navigator). */
export const briefingSchema = z.object({
  sections: z
    .array(
      z.object({
        title: z.string(),
        type: z.enum([
          'highlights',
          'deep-dive',
          'sector-impact',
          'expert-takes',
          'whats-next',
        ]),
        content: z.string().min(40),
      })
    )
    .length(5),
});
export type BriefingPayload = z.infer<typeof briefingSchema>;

/** Storyboard video script (AI Video Studio). */
export const videoScriptSchema = z.object({
  slides: z
    .array(
      z.object({
        type: z.enum(['title', 'narration', 'data', 'quote', 'conclusion']),
        narration: z.string(),
        displayText: z.string(),
        duration: z.number().min(5).max(20),
        dataPoints: z
          .array(
            z.object({
              label: z.string(),
              value: z.number(),
              color: z.string().nullable(),
            })
          )
          .nullable(),
        quote: z
          .object({
            text: z.string(),
            author: z.string(),
          })
          .nullable(),
      })
    )
    .min(4)
    .max(8),
});
export type VideoScriptPayload = z.infer<typeof videoScriptSchema>;

/** Story arc analysis (Story Arc Tracker). */
export const storyArcSchema = z.object({
  events: z
    .array(
      z.object({
        date: z.string(),
        title: z.string(),
        description: z.string(),
        impact: z.enum(['positive', 'negative', 'neutral']),
        sources: z.array(z.string()),
      })
    )
    .min(4),
  players: z
    .array(
      z.object({
        name: z.string(),
        role: z.string(),
        description: z.string(),
        sentiment: z.enum(['positive', 'negative', 'neutral']),
        imageInitials: z.string().max(3),
      })
    )
    .min(2),
  sentimentData: z
    .array(
      z.object({
        date: z.string(),
        positive: z.number(),
        negative: z.number(),
        neutral: z.number(),
      })
    )
    .min(3),
  predictions: z.array(z.string()).min(2),
  contrarianView: z.string(),
});
export type StoryArcPayload = z.infer<typeof storyArcSchema>;

/** Translation result (Vernacular Engine). */
export const translationSchema = z.object({
  translatedText: z.string().min(20),
  contextNotes: z.array(
    z.object({
      original: z.string(),
      translated: z.string(),
      note: z.string(),
    })
  ),
  culturalAdaptations: z.array(z.string()),
});
export type TranslationPayload = z.infer<typeof translationSchema>;

/** Sentiment analysis (shared by Story Arc + admin). */
export const sentimentSchema = z.object({
  overall: z.enum(['positive', 'negative', 'neutral']),
  score: z.number().min(-1).max(1),
  positive: z.number().min(0).max(100),
  negative: z.number().min(0).max(100),
  neutral: z.number().min(0).max(100),
  keyPhrases: z.array(z.string()),
  analysis: z.string(),
});
export type SentimentPayload = z.infer<typeof sentimentSchema>;
