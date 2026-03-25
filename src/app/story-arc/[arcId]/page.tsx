'use client';

import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { storyArcs } from '@/data/mock-story-arcs';
import { StoryArc, Article } from '@/types';
import Timeline from '@/components/story-arc/Timeline';
import PlayerNetwork from '@/components/story-arc/PlayerNetwork';
import SentimentChart from '@/components/story-arc/SentimentChart';
import PredictionCard from '@/components/story-arc/PredictionCard';
import LiveDataBadge from '@/components/layout/LiveDataBadge';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { fetchLiveArticlesWithSource, LiveDataSource } from '@/lib/news-client';

interface SentimentSummary {
  overall: 'positive' | 'negative' | 'neutral';
  score: number;
  positive: number;
  negative: number;
  neutral: number;
  analysis?: string;
  keyPhrases?: string[];
}

function isSentimentSummary(data: unknown): data is SentimentSummary {
  if (!data || typeof data !== 'object') return false;

  const candidate = data as Partial<SentimentSummary>;
  return (
    (candidate.overall === 'positive' || candidate.overall === 'negative' || candidate.overall === 'neutral') &&
    typeof candidate.score === 'number' &&
    typeof candidate.positive === 'number' &&
    typeof candidate.negative === 'number' &&
    typeof candidate.neutral === 'number'
  );
}

function isStoryArc(data: unknown): data is StoryArc {
  if (!data || typeof data !== 'object') return false;

  const candidate = data as Partial<StoryArc>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.description === 'string' &&
    typeof candidate.category === 'string' &&
    Array.isArray(candidate.events) &&
    Array.isArray(candidate.players) &&
    Array.isArray(candidate.sentimentData) &&
    Array.isArray(candidate.predictions) &&
    typeof candidate.contrarianView === 'string'
  );
}

export default function StoryArcDetailPage() {
  const params = useParams();
  const arcId = params.arcId as string;
  const [arc, setArc] = useState<StoryArc | null>(null);
  const [sentiment, setSentiment] = useState<SentimentSummary | null>(null);
  const [dataSource, setDataSource] = useState<LiveDataSource>('unknown');
  const [loading, setLoading] = useState(true);
  const fallbackArc = useMemo(
    () => storyArcs.find((a) => a.id === arcId) || storyArcs[0],
    [arcId],
  );

  useEffect(() => {
    let mounted = true;

    async function loadArc() {
      setLoading(true);
      try {
        const { articles, source } = await fetchLiveArticlesWithSource(20);
        const selected = articles.find((a: Article) => a.id === arcId);
        const topic = selected?.title || arcId.replace(/-/g, ' ');
        setDataSource(source);

        const res = await fetch('/api/ai/story-arc', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic }),
        });

        if (!res.ok) {
          if (mounted) setArc(fallbackArc);
          return;
        }

        const data = await res.json();
        if (mounted) {
          const resolvedArc = isStoryArc(data) ? data : fallbackArc;
          setArc(resolvedArc);

          const sentimentText = [
            selected?.title || topic,
            selected?.summary || selected?.content || '',
            resolvedArc.description,
            ...resolvedArc.events.slice(0, 6).map((event) => event.description),
          ]
            .filter(Boolean)
            .join('\n\n');

          try {
            const sentimentRes = await fetch('/api/ai/sentiment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text: sentimentText }),
            });

            if (sentimentRes.ok) {
              const sentimentData = await sentimentRes.json();
              setSentiment(isSentimentSummary(sentimentData) ? sentimentData : null);
            } else {
              setSentiment(null);
            }
          } catch {
            setSentiment(null);
          }
        }
      } catch {
        if (mounted) {
          setArc(fallbackArc);
          setSentiment(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadArc();

    return () => {
      mounted = false;
    };
  }, [arcId, fallbackArc]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Generating a live AI story arc...</p>
      </div>
    );
  }

  if (!arc) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Story arc not found.</p>
        <Link href="/story-arc" className="mt-2 inline-block text-sm text-indigo-600">
          Back to all arcs
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <Link href="/story-arc" className="ui-transition mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" /> Back to arcs
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-foreground">{arc.title}</h1>
          <Badge variant="secondary" className="bg-slate-100 text-slate-700">{arc.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{arc.description}</p>
        <div className="mt-2">
          <LiveDataBadge source={dataSource} />
        </div>
      </div>

      {/* Timeline Section */}
      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <span className="w-2 h-2 bg-amber-400 rounded-full" /> Timeline
        </h2>
        <Timeline events={arc.events} />
      </section>

      {/* Player Network */}
      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <span className="w-2 h-2 bg-blue-400 rounded-full" /> Key Players
        </h2>
        <PlayerNetwork players={arc.players} />
      </section>

      {/* Sentiment Chart */}
      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <span className="w-2 h-2 bg-green-400 rounded-full" /> Sentiment Over Time
        </h2>
        {sentiment && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
            <p className="text-sm font-semibold text-emerald-800">
              Live sentiment: {sentiment.overall} ({Math.round(sentiment.score * 100)} score)
            </p>
            <p className="mt-1 text-xs text-emerald-900/80">
              Mix: {sentiment.positive}% positive, {sentiment.neutral}% neutral, {sentiment.negative}% negative
            </p>
            {sentiment.analysis && <p className="mt-2 text-xs text-slate-700">{sentiment.analysis}</p>}
          </div>
        )}
        <SentimentChart data={arc.sentimentData} />
      </section>

      {/* Predictions & Contrarian View */}
      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <span className="w-2 h-2 bg-purple-400 rounded-full" /> Predictions & Analysis
        </h2>
        <PredictionCard predictions={arc.predictions} contrarianView={arc.contrarianView} />
      </section>
    </div>
  );
}
