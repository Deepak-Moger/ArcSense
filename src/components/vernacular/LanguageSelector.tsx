'use client';

import { SupportedLanguage } from '@/types';
import { languages } from '@/data/personas';

interface LanguageSelectorProps {
  selected: SupportedLanguage | null;
  onSelect: (lang: SupportedLanguage) => void;
}

export default function LanguageSelector({ selected, onSelect }: LanguageSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {languages.map((lang) => (
        <button
          key={lang.id}
          onClick={() => onSelect(lang.id)}
          className={`ui-transition flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm ${
            selected === lang.id
              ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
              : 'border-border bg-white text-muted-foreground hover:border-indigo-200 hover:text-foreground'
          }`}
        >
          <span className="text-lg">{lang.nativeName}</span>
          <span className="text-xs text-slate-500">({lang.name})</span>
        </button>
      ))}
    </div>
  );
}
