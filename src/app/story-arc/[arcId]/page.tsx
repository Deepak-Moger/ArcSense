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

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <header className="mb-5 flex items-baseline gap-4 border-b border-border pb-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        {index}
      </span>
      <h2 className="font-display text-xl text-foreground sm:text-2xl">{title}</h2>
    </header>
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
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <div className="mx-auto mb-4 h-6 w-6 animate-spin rounded-full border border-foreground/20 border-t-foreground" />
        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
          Generating live AI story arc
        </p>
      </div>
    );
  }

  if (!arc) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="text-muted-foreground">Story arc not found.</p>
        <Link
          href="/story-arc"
          className="ui-transition mt-3 inline-flex items-center gap-1 text-sm text-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all arcs
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1100px] px-5 py-8 sm:px-8 sm:py-12">
          <Link
            href="/story-arc"
            className="ui-transition inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            All arcs
          </Link>

          <p className="eyebrow mt-5">04 / Story Arc · {arc.category}</p>
          <h1 className="display-lg mt-3 text-balance text-foreground">{arc.title}</h1>
          <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-muted-foreground">
            {arc.description}
          </p>
          <div className="mt-4">
            <LiveDataBadge source={dataSource} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8 lg:py-14">
        <section className="mb-12">
          <SectionHeading index="01 / Timeline" title="What happened, in order" />
          <Timeline events={arc.events} />
        </section>

        <section className="mb-12">
          <SectionHeading index="02 / Network" title="Who is moving the story" />
          <PlayerNetwork players={arc.players} />
        </section>

        <section className="mb-12">
          <SectionHeading index="03 / Sentiment" title="How the mood is shifting" />
          {sentiment && (
            <div className="mb-5 rounded-xl border border-border bg-card p-5 shadow-paper">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
                Live sentiment
              </p>
              <p className="mt-2 font-display text-xl text-foreground">
                {sentiment.overall.charAt(0).toUpperCase() + sentiment.overall.slice(1)} ·{' '}
                {Math.round(sentiment.score * 100)} score
              </p>
              <p className="mt-1.5 font-mono text-[11px] tabular-nums text-muted-foreground">
                {sentiment.positive}% positive · {sentiment.neutral}% neutral · {sentiment.negative}% negative
              </p>
              {sentiment.analysis && (
                <p className="mt-3 border-t border-border pt-3 text-[13.5px] leading-relaxed text-foreground/90">
                  {sentiment.analysis}
                </p>
              )}
            </div>
          )}
          <SentimentChart data={arc.sentimentData} />
        </section>

        <section className="mb-12">
          <SectionHeading index="04 / Outlook" title="What happens next" />
          <PredictionCard predictions={arc.predictions} contrarianView={arc.contrarianView} />
        </section>
      </div>
    </div>
  );
}
