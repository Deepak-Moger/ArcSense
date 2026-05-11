import { createGroq } from '@ai-sdk/groq';

const DEFAULT_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

function isUsableKey(value?: string): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return trimmed !== 'your-api-key-here' && !trimmed.startsWith('sk-ant-');
}

/**
 * Whether a live Groq key is configured. When false, API routes should
 * return their deterministic mock/fallback payloads so the demo still works
 * end-to-end without any provider configured.
 */
export function hasLiveAIConfigured(): boolean {
  return isUsableKey(process.env.GROQ_API_KEY);
}

/**
 * Provider metadata for the /api/ai/provider-status endpoint.
 */
export function getProviderStatus() {
  const live = hasLiveAIConfigured();
  return {
    live,
    provider: live ? 'groq' : 'none',
    model: live ? DEFAULT_MODEL : null,
    mode: live ? 'live-api' : 'mock-fallback',
  };
}

/**
 * Shared Groq client. We resolve the API key lazily so demo mode (no key)
 * never crashes at import time.
 */
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || '',
});

/**
 * The configured chat model. Importable as a `LanguageModel` so it plugs into
 * `generateText`, `streamText`, etc.
 */
export const chatModel = groq(DEFAULT_MODEL);

export const DEFAULT_SYSTEM_PROMPT =
  'You are ArcSense, an AI analyst specialized in Indian business and capital-markets news. Be concise, factual, and decision-oriented. When asked for JSON, return only valid JSON with no prose, code fences, or commentary.';
