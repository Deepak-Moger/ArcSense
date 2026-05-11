import { Article } from '@/types';

const RSS_URL = 'https://economictimes.indiatimes.com/rssfeedstopstories.cms';

export async function fetchRSSFeed(): Promise<Article[]> {
  try {
    const response = await fetch(RSS_URL, { next: { revalidate: 300 } });
    const text = await response.text();
    return parseRSSXML(text);
  } catch (error) {
    console.error('RSS fetch error:', error);
    return [];
  }
}

function parseRSSXML(xml: string): Article[] {
  const items: Article[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  let index = 0;

  while ((match = itemRegex.exec(xml)) !== null && index < 20) {
    const itemXml = match[1];
    const title = extractTag(itemXml, 'title');
    const description = extractTag(itemXml, 'description');
    const pubDate = extractTag(itemXml, 'pubDate');

    if (title) {
      items.push({
        id: `rss-${index}`,
        title: cleanHTML(title),
        content: cleanHTML(description || ''),
        summary: cleanHTML(description || '').slice(0, 200),
        category: 'General',
        author: 'ET Bureau',
        date: pubDate || new Date().toISOString(),
        source: 'Economic Times',
        imageUrl: `/placeholder-${(index % 5) + 1}.jpg`,
        tags: ['business', 'india'],
      });
      index++;
    }
  }
  return items;
}

function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, 'i');
  const match = regex.exec(xml);
  return match ? match[1].trim() : '';
}

function cleanHTML(str: string): string {
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}
