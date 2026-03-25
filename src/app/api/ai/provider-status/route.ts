import { NextResponse } from 'next/server';
import { getActiveAIProvider, hasLiveAIConfigured } from '@/lib/ai';

export async function GET() {
  const provider = getActiveAIProvider();

  return NextResponse.json({
    live: hasLiveAIConfigured(),
    provider,
    mode: provider === 'none' ? 'mock-fallback' : 'live-api',
  });
}
