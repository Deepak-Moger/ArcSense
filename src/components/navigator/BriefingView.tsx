'use client';

import { Briefing, BriefingSection as BriefingSectionType } from '@/types';
import BriefingSection from './BriefingSection';

interface BriefingViewProps {
  briefing: Briefing | null;
  loading: boolean;
}

export default function BriefingView({ briefing, loading }: BriefingViewProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="rounded-lg bg-slate-800/40 animate-pulse p-4">
            <div className="h-4 bg-slate-700/50 rounded w-1/3 mb-3" />
            <div className="space-y-2">
              <div className="h-3 bg-slate-700/30 rounded w-full" />
              <div className="h-3 bg-slate-700/30 rounded w-5/6" />
              <div className="h-3 bg-slate-700/30 rounded w-4/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!briefing) {
    return <p className="text-slate-400 text-sm">No briefing available.</p>;
  }

  return (
    <div className="space-y-4">
      {briefing.sections.map((section: BriefingSectionType, i: number) => (
        <BriefingSection key={i} section={section} />
      ))}
      <p className="text-xs text-slate-600 pt-2">
        Generated {new Date(briefing.generatedAt).toLocaleString()}
      </p>
    </div>
  );
}
