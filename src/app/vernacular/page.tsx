'use client';

import { useEffect, useState } from 'react';
import { Article, SupportedLanguage, TranslationResult } from '@/types';
import LanguageSelector from '@/components/vernacular/LanguageSelector';
import TranslationView from '@/components/vernacular/TranslationView';
import LiveDataBadge from '@/components/layout/LiveDataBadge';
import PageHeader from '@/components/layout/PageHeader';
import { ArrowRight } from 'lucide-react';
import { fetchLiveArticlesWithSource, LiveDataSource } from '@/lib/news-client';

function isValidTranslationResult(data: unknown): data is TranslationResult {
  if (!data || typeof data !== 'object') return false;
  const candidate = data as Partial<TranslationResult>;
  return (
    typeof candidate.translatedText === 'string' &&
    typeof candidate.language === 'string' &&
    Array.isArray(candidate.contextNotes) &&
    Array.isArray(candidate.culturalAdaptations)
  );
}

export default function VernacularPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [dataSource, setDataSource] = useState<LiveDataSource>('unknown');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage | null>(null);
  const [translation, setTranslation] = useState<TranslationResult | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadArticles() {
      const { articles: liveArticles, source } = await fetchLiveArticlesWithSource(12);
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

  const handleTranslate = async () => {
    if (!selectedArticle || !selectedLanguage) return;

    const textToTranslate =
      selectedArticle.content?.trim() ||
      selectedArticle.summary?.trim() ||
      selectedArticle.title?.trim() ||
      '';

    if (!textToTranslate) {
      setError('This article has no translatable content. Please select another article.');
      return;
    }

    setIsTranslating(true);
    setTranslation(null);
    setError(null);

    try {
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToTranslate,
          language: selectedLanguage,
          articleTitle: selectedArticle.title,
        }),
      });

      if (!res.ok) {
        setError('Translation failed. Please try a different article or language.');
        return;
      }

      const data = await res.json();
      if (isValidTranslationResult(data)) {
        setTranslation(data);
      } else {
        setError('Received an invalid translation response. Please retry.');
      }
    } catch {
      setError('Translation service is temporarily unavailable. Please retry in a moment.');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="05 / Vernacular Engine"
        title="Context-aware translation, not just translation."
        description="Hindi, Tamil, Telugu and Bengali — with the cultural adaptations and editor's notes that wires never include."
        meta={<LiveDataBadge source={dataSource} />}
      />

      <div className="mx-auto max-w-[1320px] px-5 py-10 sm:px-8 lg:py-14">
        <div className="grid grid-cols-1 gap-6 rounded-xl border border-border bg-card p-6 shadow-paper sm:p-8 lg:grid-cols-[2fr_1fr] lg:items-end">
          {/* Article picker */}
          <div>
            <label className="eyebrow block">Step 01 — Article</label>
            <select
              value={selectedArticle?.id || ''}
              onChange={(e) => {
                const article = articles.find((a) => a.id === e.target.value);
                setSelectedArticle(article || null);
                setTranslation(null);
                setError(null);
              }}
              className="ui-transition mt-3 w-full rounded-lg border border-input bg-background px-3 py-3 text-[14px] text-foreground focus:border-primary focus:outline-none"
            >
              <option value="">Choose an article…</option>
              {articles.map((article) => (
                <option key={article.id} value={article.id}>
                  {article.title}
                </option>
              ))}
            </select>
          </div>

          {/* Action */}
          <div className="flex flex-col gap-3">
            <label className="eyebrow block">Step 03 — Translate</label>
            <button
              onClick={handleTranslate}
              disabled={!selectedArticle || !selectedLanguage || isTranslating}
              className="ui-transition inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-3 text-[13.5px] font-medium text-background hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isTranslating ? (
                <>
                  <div className="h-3 w-3 animate-spin rounded-full border border-background/40 border-t-background" />
                  Translating
                </>
              ) : (
                <>
                  Translate
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Language picker (full width below) */}
          <div className="lg:col-span-2">
            <label className="eyebrow block">Step 02 — Target language</label>
            <div className="mt-3">
              <LanguageSelector selected={selectedLanguage} onSelect={setSelectedLanguage} />
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-[13px] text-destructive">
            {error}
          </p>
        )}

        {(translation || isTranslating) && selectedArticle && (
          <div className="mt-8">
            <TranslationView
              translation={translation}
              loading={isTranslating}
              originalTitle={selectedArticle.title}
              originalContent={selectedArticle.content}
            />
          </div>
        )}
      </div>
    </div>
  );
}
