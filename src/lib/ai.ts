import Anthropic from '@anthropic-ai/sdk';

type AIProvider = 'anthropic' | 'groq' | 'gemini' | 'none';

const DEFAULT_SYSTEM_PROMPT = 'You are a helpful AI assistant specialized in business news analysis for Indian markets.';

function isUsableKey(value?: string): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return trimmed !== 'your-api-key-here' && trimmed !== 'sk-ant-...';
}

function getConfiguredProvider(): AIProvider {
  const explicit = (process.env.AI_PROVIDER || '').trim().toLowerCase();
  const hasAnthropic = isUsableKey(process.env.ANTHROPIC_API_KEY);
  const hasGroq = isUsableKey(process.env.GROQ_API_KEY);
  const hasGemini = isUsableKey(process.env.GEMINI_API_KEY);

  if (explicit === 'anthropic' && hasAnthropic) return 'anthropic';
  if (explicit === 'groq' && hasGroq) return 'groq';
  if (explicit === 'gemini' && hasGemini) return 'gemini';

  if (hasAnthropic) return 'anthropic';
  if (hasGroq) return 'groq';
  if (hasGemini) return 'gemini';
  return 'none';
}

export function getActiveAIProvider(): AIProvider {
  return getConfiguredProvider();
}

export function hasLiveAIConfigured(): boolean {
  return getConfiguredProvider() !== 'none';
}

async function generateWithAnthropic(prompt: string, systemPrompt: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY || '';
  if (!isUsableKey(apiKey)) return '';

  const anthropic = new Anthropic({ apiKey });
  const model = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-latest';
  const message = await anthropic.messages.create({
    model,
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: 'user', content: prompt }],
  });

  const textBlock = message.content.find((block) => block.type === 'text');
  return textBlock?.text || '';
}

async function generateWithGroq(prompt: string, systemPrompt: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY || '';
  if (!isUsableKey(apiKey)) return '';

  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API failed (${response.status})`);
  }

  const data = await response.json() as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return data.choices?.[0]?.message?.content || '';
}

async function generateWithGemini(prompt: string, systemPrompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!isUsableKey(apiKey)) return '';

  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API failed (${response.status})`);
  }

  const data = await response.json() as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };

  const parts = data.candidates?.[0]?.content?.parts || [];
  return parts.map((p) => p.text || '').join('');
}

export async function generateCompletion(prompt: string, systemPrompt?: string): Promise<string> {
  const resolvedSystemPrompt = systemPrompt || DEFAULT_SYSTEM_PROMPT;
  const provider = getConfiguredProvider();

  try {
    if (provider === 'anthropic') {
      return await generateWithAnthropic(prompt, resolvedSystemPrompt);
    }
    if (provider === 'groq') {
      return await generateWithGroq(prompt, resolvedSystemPrompt);
    }
    if (provider === 'gemini') {
      return await generateWithGemini(prompt, resolvedSystemPrompt);
    }

    return '';
  } catch (error) {
    console.error('AI provider error:', error);
    // Fail soft so callers can fall back to deterministic mock payloads.
    return '';
  }
}

export async function generateStreamingCompletion(
  prompt: string,
  systemPrompt?: string
): Promise<ReadableStream> {
  const encoder = new TextEncoder();
  const provider = getConfiguredProvider();

  return new ReadableStream({
    async start(controller) {
      try {
        if (provider === 'anthropic' && isUsableKey(process.env.ANTHROPIC_API_KEY)) {
          const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || '' });
          const stream = anthropic.messages.stream({
            model: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-latest',
            max_tokens: 2048,
            system: systemPrompt || DEFAULT_SYSTEM_PROMPT,
            messages: [{ role: 'user', content: prompt }],
          });

          const response = await stream.finalMessage();
          for (const block of response.content) {
            if (block.type === 'text') {
              controller.enqueue(encoder.encode(block.text));
            }
          }

          controller.close();
          return;
        }

        // Non-Anthropic providers currently use one-shot completion and stream as a single chunk.
        const text = await generateCompletion(prompt, systemPrompt);
        controller.enqueue(encoder.encode(text));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}
