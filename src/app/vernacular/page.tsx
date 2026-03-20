'use client';

import { useState } from 'react';
import { mockArticles } from '@/data/mock-articles';
import { Article, SupportedLanguage, TranslationResult } from '@/types';
import LanguageSelector from '@/components/vernacular/LanguageSelector';
import TranslationView from '@/components/vernacular/TranslationView';
import { Languages, ArrowRight } from 'lucide-react';

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
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage | null>(null);
  const [translation, setTranslation] = useState<TranslationResult | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!selectedArticle || !selectedLanguage) return;

    setIsTranslating(true);
    setTranslation(null);

    try {
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: selectedArticle.content,
          language: selectedLanguage,
          articleTitle: selectedArticle.title,
        }),
      });

      if (!res.ok) {
        setTranslation(null);
        return;
      }

      const data = await res.json();

      if (isValidTranslationResult(data)) {
        setTranslation(data);
      } else {
        setTranslation(null);
      }
    } catch {
      setTranslation(null);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Languages className="w-6 h-6 text-indigo-600" />
          Vernacular Engine
        </h1>
        <p className="text-sm text-muted-foreground">Culturally adapted business news translation</p>
      </div>

      {/* Article Selection */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground block mb-2">Select Article</label>
        <select
          value={selectedArticle?.id || ''}
          onChange={(e) => {
            const article = mockArticles.find((a) => a.id === e.target.value);
            setSelectedArticle(article || null);
            setTranslation(null);
          }}
          className="w-full max-w-xl rounded-xl border border-input bg-white px-3 py-2.5 text-sm text-foreground shadow-[0_4px_12px_rgba(15,23,42,0.06)] focus:border-indigo-400 focus:outline-none"
        >
          <option value="">Choose an article...</option>
          {mockArticles.map((article) => (
            <option key={article.id} value={article.id}>
              {article.title}
            </option>
          ))}
        </select>
      </div>

      {/* Language Selection */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground block mb-2">Target Language</label>
        <LanguageSelector selected={selectedLanguage} onSelect={setSelectedLanguage} />
      </div>

      {/* Translate Button */}
      <button
        onClick={handleTranslate}
        disabled={!selectedArticle || !selectedLanguage || isTranslating}
        className="ui-transition mb-8 inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#4f46e5_0%,#7c3aed_100%)] px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_20px_rgba(79,70,229,0.24)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isTranslating ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Translating...
          </>
        ) : (
          <>
            Translate <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Translation View */}
      {(translation || isTranslating) && selectedArticle && (
        <TranslationView
          translation={translation}
          loading={isTranslating}
          originalTitle={selectedArticle.title}
          originalContent={selectedArticle.content}
        />
      )}
    </div>
  );
}
