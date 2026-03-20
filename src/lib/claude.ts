import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function generateCompletion(prompt: string, systemPrompt?: string): Promise<string> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt || 'You are a helpful AI assistant specialized in business news analysis for Indian markets.',
      messages: [{ role: 'user', content: prompt }],
    });

    const textBlock = message.content.find((block) => block.type === 'text');
    return textBlock?.text || '';
  } catch (error) {
    console.error('Claude API error:', error);
    // Fail soft so callers can fall back to deterministic mock payloads.
    return '';
  }
}

export async function generateStreamingCompletion(
  prompt: string,
  systemPrompt?: string
): Promise<ReadableStream> {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        const stream = anthropic.messages.stream({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2048,
          system: systemPrompt || 'You are a helpful AI assistant specialized in business news analysis for Indian markets.',
          messages: [{ role: 'user', content: prompt }],
        });

        const response = await stream.finalMessage();
        for (const block of response.content) {
          if (block.type === 'text') {
            controller.enqueue(encoder.encode(block.text));
          }
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}

export default anthropic;
