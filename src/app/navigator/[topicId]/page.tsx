'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { Briefing, Article } from '@/types';
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
  const [topicDescription, setTopicDescription] = useState('AI-generated briefing from latest market coverage');
  const [dataSource, setDataSource] = useState<LiveDataSource>('unknown');
  const [loading, setLoading] = useState(true);

  const fallbackBriefing = useMemo(
    () => ({
      id: `brief-local-fallback-${Date.now()}`,
      topicId,
      title: `Briefing: ${topicId}`,
      sections: [
        {
          title: 'Key Highlights',
          type: 'highlights',
          content: 'Generating fallback briefing content while live model output is unavailable.',
        },
        {
          title: 'Deep Dive',
          type: 'deep-dive',
          content: 'Use this as a temporary summary. Refresh to pull updated live AI output.',
        },
        {
          title: 'Sector Impact',
          type: 'sector-impact',
          content: 'Likely impact spans rate-sensitive sectors, exporters, and domestic consumption plays.',
        },
        {
          title: 'Expert Takes',
          type: 'expert-takes',
          content: 'Commentary remains mixed until additional official disclosures are released.',
        },
        {
          title: "What's Next",
          type: 'whats-next',
          content: 'Track management guidance, policy implementation data, and short-term volatility.',
        },
      ],
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
        setTopicDescription(selectedArticle?.summary || 'AI-generated briefing from latest market coverage');
        setDataSource(source);

        const res = await fetch('/api/ai/briefing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topicId: resolvedTopic,
            articles: relatedArticles,
          }),
        });

        if (!res.ok) {
          setBriefing(fallbackBriefing);
          return;
        }

        const data = await res.json();

        if (isValidBriefing(data)) {
          setBriefing(data);
        } else {
          setBriefing(fallbackBriefing);
        }
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
    <div className="h-[calc(100vh-4.5rem)] flex flex-col lg:flex-row">
      <div className="flex-1 lg:w-3/5 overflow-y-auto border-r border-border/80 p-4 sm:p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground">{topicTitle}</h1>
          <p className="text-xs text-muted-foreground">{topicDescription}</p>
          <div className="mt-2">
            <LiveDataBadge source={dataSource} />
          </div>
        </div>
        <BriefingView briefing={briefing} loading={loading} />
      </div>

      <div className="h-80 border-t border-border/80 lg:h-auto lg:w-2/5 lg:border-t-0">
        <ChatInterface
          briefingContext={briefingContext}
          topicTitle={topicTitle || 'this topic'}
        />
      </div>
    </div>
  );
}
