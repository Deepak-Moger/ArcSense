'use client';

import { TranslationResult } from '@/types';
import { Info } from 'lucide-react';

interface TranslationViewProps {
  translation: TranslationResult | null;
  loading: boolean;
  originalTitle: string;
  originalContent: string;
}

export default function TranslationView({ translation, loading, originalTitle, originalContent }: TranslationViewProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-white/90 p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <div className="h-4 bg-slate-200 rounded w-1/4 mb-4" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-3 bg-slate-200 rounded" style={{ width: `${90 - i * 8}%` }} />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-white/90 p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)] animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-1/4 mb-4" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-3 bg-slate-200 rounded" style={{ width: `${85 - i * 7}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!translation) return null;

  const languageLabel =
    typeof translation.language === 'string' && translation.language.length > 0
      ? `${translation.language.charAt(0).toUpperCase()}${translation.language.slice(1)}`
      : 'Translated';

  return (
    <div className="space-y-6">
      {/* Side-by-side panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Original */}
        <div className="rounded-2xl border border-border bg-white/90 p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            English (Original)
          </h3>
          <h4 className="mb-3 text-sm font-medium text-foreground">{originalTitle}</h4>
          <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
            {originalContent}
          </p>
        </div>

        {/* Translated */}
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-indigo-700">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            {languageLabel} (Translated)
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {translation.translatedText}
          </p>
        </div>
      </div>

      {/* Context Notes */}
      {translation.contextNotes && translation.contextNotes.length > 0 && (
        <div className="rounded-2xl border border-border bg-white/90 p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Info className="w-4 h-4 text-indigo-500" />
            Translation Context Notes
          </h3>
          <div className="space-y-3">
            {translation.contextNotes.map((note, i) => (
              <div key={i} className="flex gap-3 text-sm border-l-2 border-indigo-300 pl-3">
                <div className="flex-1">
                  <span className="text-slate-600">{note.original}</span>
                  <span className="text-slate-600 mx-2">&rarr;</span>
                  <span className="text-indigo-700">{note.translated}</span>
                  <p className="text-xs text-slate-500 mt-1">{note.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cultural Adaptations */}
      {translation.culturalAdaptations && translation.culturalAdaptations.length > 0 && (
        <div className="rounded-2xl border border-border bg-white/90 p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Cultural Adaptations</h3>
          <ul className="space-y-1.5">
            {translation.culturalAdaptations.map((adaptation, i) => (
              <li key={i} className="text-sm text-slate-600 flex gap-2">
                <span className="text-indigo-500 shrink-0">&#8226;</span>
                {adaptation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
