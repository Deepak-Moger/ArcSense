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
      <div className="space-y-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-border bg-card p-5 shadow-paper"
          >
            <div className="flex items-center gap-3">
              <div className="h-3 w-6 rounded bg-secondary animate-pulse" />
              <div className="h-7 w-7 rounded-md bg-secondary animate-pulse" />
              <div className="h-4 w-1/3 rounded bg-secondary animate-pulse" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full rounded bg-secondary animate-pulse" />
              <div className="h-3 w-11/12 rounded bg-secondary animate-pulse" />
              <div className="h-3 w-4/6 rounded bg-secondary animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!briefing) {
    return (
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        No briefing available.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {briefing.sections.map((section: BriefingSectionType, i: number) => (
        <BriefingSection key={i} section={section} index={i} />
      ))}
      <p className="pt-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
        Generated {new Date(briefing.generatedAt).toLocaleString()}
      </p>
    </div>
  );
}
