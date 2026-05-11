import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { chatModel, hasLiveAIConfigured } from '@/lib/ai';
import { getChatSystemPrompt } from '@/lib/prompts';

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const {
      messages,
      briefingContext,
      topicTitle,
    }: {
      messages: UIMessage[];
      briefingContext?: string;
      topicTitle?: string;
    } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Demo mode: when no live key, stream a deterministic mock answer so the
    // UI still gets a streaming experience.
    if (!hasLiveAIConfigured()) {
      const lastUser = [...messages]
        .reverse()
        .find((m) => m.role === 'user');
      const text = getMockChatResponse(extractText(lastUser));
      return new Response(streamMock(text), {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
        },
      });
    }

    const result = streamText({
      model: chatModel,
      system: getChatSystemPrompt(briefingContext || '', topicTitle || 'this briefing'),
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('[chat] error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function extractText(message: UIMessage | undefined): string {
  if (!message) return '';
  if (!Array.isArray(message.parts)) return '';
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('');
}

function getMockChatResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('impact') || q.includes('affect')) {
    return 'Based on the briefing, the impact is multi-dimensional. The primary sectors affected include banking, infrastructure, and consumer goods. Short-term market reactions have been positive, with institutional investors increasing their exposure. The medium-term outlook depends on execution of policy measures and global economic conditions.\n\nKey metrics to watch include quarterly earnings growth, credit offtake data, and foreign institutional investment flows over the next 2-3 months.';
  }
  if (q.includes('risk') || q.includes('concern')) {
    return 'The briefing highlights several risk factors. Global trade tensions, particularly around tariff escalation, pose the most significant external risk. Domestically, monsoon performance and food inflation trajectory remain key variables.\n\nExecution risk on the government\'s ambitious capex program is also a concern, given the historical pattern of H1 underspending. Oil prices above $85/barrel would pressure fiscal calculations.';
  }
  return "Based on the briefing, India's economic fundamentals remain strong, supported by robust domestic demand, improving corporate earnings, and proactive policy measures.\n\nThe combination of fiscal stimulus through tax reforms and monetary easing through rate cuts creates a supportive environment for growth. Analysts expect GDP growth of 6.8-7.2% in FY27, making India the fastest-growing major economy.";
}

/**
 * Encode a mock answer as the AI SDK UIMessage SSE stream so the
 * client-side `useChat` consumer renders it identically to a real provider
 * response (token-by-token).
 */
function streamMock(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const messageId = 'mock-' + Date.now();
  const chunks = text.match(/.{1,8}(\s|$)/g) || [text];

  return new ReadableStream({
    async start(controller) {
      const send = (obj: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      };

      send({ type: 'start', messageId });
      send({ type: 'start-step' });
      send({ type: 'text-start', id: '0' });

      for (const piece of chunks) {
        send({ type: 'text-delta', id: '0', delta: piece });
        // small delay for the typing feel
        await new Promise((r) => setTimeout(r, 18));
      }

      send({ type: 'text-end', id: '0' });
      send({ type: 'finish-step' });
      send({ type: 'finish' });
      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });
}
