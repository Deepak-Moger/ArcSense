'use client';

import { useState, useCallback, useEffect } from 'react';
import { TrendingUp, Target, BookOpen, Quote } from 'lucide-react';
import { personas } from '@/data/personas';
import { PersonaType, AdaptedArticle, Article } from '@/types';
import PersonaSelector from '@/components/news/PersonaSelector';
import ArticleList from '@/components/news/ArticleList';
import LiveDataBadge from '@/components/layout/LiveDataBadge';
import PageHeader from '@/components/layout/PageHeader';
import { fetchLiveArticlesWithSource, LiveDataSource } from '@/lib/news-client';

const personaIcons: Record<PersonaType, typeof TrendingUp> = {
  investor:   TrendingUp,
  founder:    Target,
  student:    BookOpen,
  journalist: Quote,
};

function normalizeAdaptedFields(data: unknown) {
  const payload = (typeof data === 'object' && data !== null ? data : {}) as Record<string, unknown>;

  const personaInsights =
    typeof payload.personaInsights === 'string' && payload.personaInsights.trim().length > 0
      ? payload.personaInsights
      : 'AI insights will appear here when the API is configured.';

  const highlights = Array.isArray(payload.highlights)
    ? payload.highlights.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : [];

  return {
    personaInsights,
    highlights: highlights.length > 0 ? highlights : ['Key insight loading...'],
    relevanceScore: typeof payload.relevanceScore === 'number' ? payload.relevanceScore : undefined,
    actionItems: Array.isArray(payload.actionItems)
      ? payload.actionItems.filter((item): item is string => typeof item === 'string')
      : undefined,
    explainerNotes: Array.isArray(payload.explainerNotes)
      ? payload.explainerNotes.filter((item): item is string => typeof item === 'string')
      : undefined,
    sourceAnalysis: typeof payload.sourceAnalysis === 'string' ? payload.sourceAnalysis : undefined,
  };
}

export default function MyETPage() {
  const [selectedPersona, setSelectedPersona] = useState<PersonaType | null>(null);
  const [showSelector, setShowSelector] = useState(true);
  const [adaptedArticles, setAdaptedArticles] = useState<Record<string, AdaptedArticle>>({});
  const [articles, setArticles] = useState<Article[]>([]);
  const [dataSource, setDataSource] = useState<LiveDataSource>('unknown');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadArticles() {
      const { articles: liveArticles, source } = await fetchLiveArticlesWithSource(9);
      if (mounted) {
        setArticles(liveArticles);
        setDataSource(source);
      }
    }

    loadArticles();

    return () => {
      mounted = false;
    };
  }, []);

  const adaptArticles = useCallback(
    async (persona: PersonaType) => {
      setLoading(true);
      const adapted: Record<string, AdaptedArticle> = {};

      for (const article of articles) {
        try {
          const res = await fetch('/api/ai/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ article, persona }),
          });
          if (!res.ok) throw new Error(`Summarize request failed (${res.status})`);

          const data = await res.json();
          adapted[article.id] = { ...article, ...normalizeAdaptedFields(data) };
        } catch {
          adapted[article.id] = {
            ...article,
            personaInsights: 'AI insights will appear here when the API is configured.',
            highlights: ['Key insight loading...'],
          };
        }
      }

      setAdaptedArticles(adapted);
      setLoading(false);
    },
    [articles],
  );

  const handlePersonaSelect = (persona: PersonaType) => {
    setSelectedPersona(persona);
    setShowSelector(false);
    adaptArticles(persona);
  };

  const currentPersona = personas.find((p) => p.id === selectedPersona);
  const CurrentIcon = selectedPersona ? personaIcons[selectedPersona] : null;

  return (
    <div>
      <PersonaSelector open={showSelector && !selectedPersona} onSelect={handlePersonaSelect} />

      <PageHeader
        eyebrow="01 / Personalised newsroom"
        title="My ET — same headline, four lenses."
        description="Switch personas and watch the same set of stories rewrite themselves for what you actually need from the news today."
        meta={<LiveDataBadge source={dataSource} />}
        actions={
          <div className="flex flex-wrap items-center gap-1.5">
            {personas.map((p) => {
              const Icon = personaIcons[p.id];
              const isActive = selectedPersona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePersonaSelect(p.id)}
                  className={`ui-transition inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium ${
                    isActive
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {p.name}
                </button>
              );
            })}
          </div>
        }
      />

      <div className="mx-auto max-w-[1320px] px-5 py-10 sm:px-8 lg:py-14">
        {currentPersona && CurrentIcon && (
          <div className="mb-8 flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-paper">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-secondary text-primary">
              <CurrentIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
                Reading as
              </p>
              <p className="mt-0.5 font-display text-xl leading-tight text-foreground">
                {currentPersona.name}
              </p>
              <p className="mt-0.5 text-[13px] text-muted-foreground">{currentPersona.description}</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <div className="h-3 w-3 animate-spin rounded-full border border-primary border-t-transparent" />
              Adapting articles for {currentPersona?.name}
            </div>
          </div>
        )}

        {!loading && (
          <ArticleList
            articles={articles}
            persona={selectedPersona}
            adaptedArticles={adaptedArticles}
          />
        )}
      </div>
    </div>
  );
}
