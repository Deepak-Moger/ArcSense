'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Briefing, BriefingSection, Article } from '@/types';
import BriefingView from '@/components/navigator/BriefingView';
import ChatInterface from '@/components/navigator/ChatInterface';
import LiveDataBadge from '@/components/layout/LiveDataBadge';
import { fetchLiveArticlesWithSource, LiveDataSource } from '@/lib/news-client';

function isValidBriefing(data: unknown): data is Briefing {
  if (!data || typeof data !== 'object') return false;
  const candidate = data as Partial<Briefing>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.topicId === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.generatedAt === 'string' &&
    Array.isArray(candidate.articleIds) &&
    Array.isArray(candidate.sections)
  );
}

export default function BriefingPage() {
  const params = useParams();
  const topicId = params.topicId as string;
  const [briefing, setBriefing] = useState<Briefing | null>(null);
  const [topicTitle, setTopicTitle] = useState('Briefing');
  const [topicDescription, setTopicDescription] = useState(
    'AI-generated briefing from latest market coverage',
  );
  const [topicCategory, setTopicCategory] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<LiveDataSource>('unknown');
  const [loading, setLoading] = useState(true);

  const fallbackBriefing = useMemo<Briefing>(
    () => ({
      id: `brief-local-fallback-${Date.now()}`,
      topicId,
      title: `Briefing: ${topicId}`,
      sections: [
        { title: 'Key Highlights', type: 'highlights', content: 'Generating fallback briefing content while live model output is unavailable.' },
        { title: 'Deep Dive', type: 'deep-dive', content: 'Use this as a temporary summary. Refresh to pull updated live AI output.' },
        { title: 'Sector Impact', type: 'sector-impact', content: 'Likely impact spans rate-sensitive sectors, exporters, and domestic consumption plays.' },
        { title: 'Expert Takes', type: 'expert-takes', content: 'Commentary remains mixed until additional official disclosures are released.' },
        { title: "What's Next", type: 'whats-next', content: 'Track management guidance, policy implementation data, and short-term volatility.' },
      ] satisfies BriefingSection[],
      generatedAt: new Date().toISOString(),
      articleIds: [],
    }),
    [topicId],
  );

  useEffect(() => {
    async function fetchBriefing() {
      setLoading(true);
      try {
        const { articles, source } = await fetchLiveArticlesWithSource(18);
        const selectedArticle = articles.find((a) => a.id === topicId);
        const resolvedTopic = selectedArticle?.title || topicId.replace(/-/g, ' ');
        const relatedArticles: Article[] = selectedArticle
          ? articles.filter((a) => a.category === selectedArticle.category).slice(0, 6)
          : articles.slice(0, 6);

        setTopicTitle(resolvedTopic);
        setTopicDescription(
          selectedArticle?.summary || 'AI-generated briefing from latest market coverage',
        );
        setTopicCategory(selectedArticle?.category ?? null);
        setDataSource(source);

        const res = await fetch('/api/ai/briefing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topicId: resolvedTopic, articles: relatedArticles }),
        });

        if (!res.ok) {
          setBriefing(fallbackBriefing);
          return;
        }

        const data = await res.json();
        setBriefing(isValidBriefing(data) ? data : fallbackBriefing);
      } catch {
        setBriefing(fallbackBriefing);
      } finally {
        setLoading(false);
      }
    }
    fetchBriefing();
  }, [topicId, fallbackBriefing]);

  const briefingContext = Array.isArray(briefing?.sections)
    ? briefing.sections.map((s) => `${s.title}: ${s.content}`).join('\n\n')
    : '';

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
      {/* Briefing column */}
      <div className="flex-1 border-b border-border lg:w-3/5 lg:border-b-0 lg:border-r">
        <div className="border-b border-border bg-background">
          <div className="mx-auto max-w-[860px] px-5 py-8 sm:px-8 sm:py-10">
            <Link
              href="/navigator"
              className="ui-transition inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3" />
              All briefings
            </Link>
            <p className="eyebrow mt-5">
              02 / Briefing {topicCategory ? `· ${topicCategory}` : ''}
            </p>
            <h1 className="display-lg mt-3 text-balance text-foreground">{topicTitle}</h1>
            <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-muted-foreground">
              {topicDescription}
            </p>
            <div className="mt-4">
              <LiveDataBadge source={dataSource} />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[860px] px-5 py-8 sm:px-8 lg:py-10">
          <BriefingView briefing={briefing} loading={loading} />
        </div>
      </div>

      {/* Chat column */}
      <aside className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:w-2/5">
        <ChatInterface briefingContext={briefingContext} topicTitle={topicTitle || 'this topic'} />
      </aside>
    </div>
  );
}
