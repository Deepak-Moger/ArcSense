'use client';

import { useState, useCallback, useEffect } from 'react';
import { personas } from '@/data/personas';
import { PersonaType, AdaptedArticle, Article } from '@/types';
import PersonaSelector from '@/components/news/PersonaSelector';
import ArticleList from '@/components/news/ArticleList';
import LiveDataBadge from '@/components/layout/LiveDataBadge';
import { fetchLiveArticlesWithSource, LiveDataSource } from '@/lib/news-client';

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

  const adaptArticles = useCallback(async (persona: PersonaType) => {
    setLoading(true);
    const adapted: Record<string, AdaptedArticle> = {};

    for (const article of articles) {
      try {
        const res = await fetch('/api/ai/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ article, persona }),
        });
        if (!res.ok) {
          throw new Error(`Summarize request failed (${res.status})`);
        }

        const data = await res.json();
        adapted[article.id] = {
          ...article,
          ...normalizeAdaptedFields(data),
        };
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
  }, [articles]);

  const handlePersonaSelect = (persona: PersonaType) => {
    setSelectedPersona(persona);
    setShowSelector(false);
    adaptArticles(persona);
  };

  const currentPersona = personas.find((p) => p.id === selectedPersona);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PersonaSelector open={showSelector && !selectedPersona} onSelect={handlePersonaSelect} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My ET</h1>
          <p className="text-sm text-muted-foreground">Personalized newsroom adapted to your perspective</p>
          <div className="mt-2">
            <LiveDataBadge source={dataSource} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {personas.map((p) => (
            <button
              key={p.id}
              onClick={() => handlePersonaSelect(p.id)}
              className={`ui-transition flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border ${
                selectedPersona === p.id
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                  : 'border-border bg-white text-muted-foreground hover:border-indigo-200 hover:text-foreground'
              }`}
            >
              <span>{p.icon}</span>
              <span className="hidden sm:inline">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {currentPersona && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-border bg-white/90 p-4 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
          <span className="text-2xl">{currentPersona.icon}</span>
          <div>
            <span className="text-sm font-medium text-foreground">Viewing as {currentPersona.name}</span>
            <p className="text-xs text-muted-foreground">{currentPersona.description}</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            Adapting articles for {currentPersona?.name}...
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
  );
}
