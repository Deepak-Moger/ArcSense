import { NextResponse } from 'next/server';
import { getProviderStatus } from '@/lib/ai';

export async function GET() {
  return NextResponse.json(getProviderStatus());
}
