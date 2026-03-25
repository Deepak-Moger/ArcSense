import { NextRequest, NextResponse } from 'next/server';
import { fetchRSSFeed } from '@/lib/rss';
import { mockArticles } from '@/data/mock-articles';
import { Article } from '@/types';

interface GoNewsItem {
  title?: string;
  source?: string;
  summary?: string;
  publishedAt?: string;
}

interface GoNewsResponse {
  articles?: GoNewsItem[];
}

function mapGoArticle(item: GoNewsItem, index: number): Article {
  const title = item.title?.trim() || `Live story ${index + 1}`;
  const content = item.summary?.trim() || title;
  return {
    id: `live-${index}`,
    title,
    content,
    summary: content,
    category: 'Markets',
    author: item.source?.trim() || 'Live Desk',
    date: item.publishedAt || new Date().toISOString(),
    source: item.source?.trim() || 'Live News',
    imageUrl: `/placeholder-${(index % 5) + 1}.jpg`,
    tags: ['live', 'business'],
  };
}

export async function GET(request: NextRequest) {
  try {
    const topic = request.nextUrl.searchParams.get('topic') || '';
    const backendBase = process.env.GO_BACKEND_URL || 'http://localhost:8080';
    const backendUrl = `${backendBase}/api/v1/news?limit=20${topic ? `&topic=${encodeURIComponent(topic)}` : ''}`;

    try {
      const liveRes = await fetch(backendUrl, { cache: 'no-store' });
      if (liveRes.ok) {
        const livePayload = (await liveRes.json()) as GoNewsResponse;
        const liveArticles = (livePayload.articles || []).map(mapGoArticle).slice(0, 20);
        if (liveArticles.length > 0) {
          return NextResponse.json({ articles: liveArticles, source: 'go-live' });
        }
      }
    } catch {
      // Fall back to RSS if backend is unavailable.
    }

    const articles = await fetchRSSFeed();
    if (articles.length > 0) {
      return NextResponse.json({ articles, source: 'rss' });
    }
    return NextResponse.json({ articles: mockArticles, source: 'mock' });
  } catch {
    return NextResponse.json({ articles: mockArticles, source: 'mock' });
  }
}
