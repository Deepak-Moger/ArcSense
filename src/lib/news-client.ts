import { mockArticles } from '@/data/mock-articles';
import { Article } from '@/types';

interface NewsFeedResponse {
  articles?: unknown;
  source?: unknown;
}

export type LiveDataSource = 'go-live' | 'rss' | 'mock' | 'unknown';

export interface LiveArticlesResult {
  articles: Article[];
  source: LiveDataSource;
}

function isArticle(value: unknown): value is Article {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<Article>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.content === 'string' &&
    typeof candidate.summary === 'string' &&
    typeof candidate.category === 'string' &&
    typeof candidate.author === 'string' &&
    typeof candidate.date === 'string' &&
    typeof candidate.source === 'string' &&
    typeof candidate.imageUrl === 'string' &&
    Array.isArray(candidate.tags)
  );
}

function normalizeSource(source: unknown): LiveDataSource {
  if (source === 'go-live' || source === 'rss' || source === 'mock') {
    return source;
  }
  return 'unknown';
}

export async function fetchLiveArticlesWithSource(limit = 12): Promise<LiveArticlesResult> {
  try {
    const res = await fetch('/api/news/feed', { cache: 'no-store' });
    if (!res.ok) {
      return { articles: mockArticles.slice(0, limit), source: 'mock' };
    }

    const data = (await res.json()) as NewsFeedResponse;
    const parsed = Array.isArray(data.articles) ? data.articles.filter(isArticle) : [];
    const source = normalizeSource(data.source);

    if (parsed.length === 0) {
      return { articles: mockArticles.slice(0, limit), source: 'mock' };
    }

    return { articles: parsed.slice(0, limit), source };
  } catch {
    return { articles: mockArticles.slice(0, limit), source: 'mock' };
  }
}

export async function fetchLiveArticles(limit = 12): Promise<Article[]> {
  const result = await fetchLiveArticlesWithSource(limit);
  return result.articles;
}
