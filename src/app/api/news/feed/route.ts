import { NextResponse } from 'next/server';
import { fetchRSSFeed } from '@/lib/rss';
import { mockArticles } from '@/data/mock-articles';

export async function GET() {
  try {
    const articles = await fetchRSSFeed();
    if (articles.length > 0) {
      return NextResponse.json({ articles, source: 'rss' });
    }
    return NextResponse.json({ articles: mockArticles, source: 'mock' });
  } catch {
    return NextResponse.json({ articles: mockArticles, source: 'mock' });
  }
}
