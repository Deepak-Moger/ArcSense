import { LiveDataSource } from '@/lib/news-client';

interface LiveDataBadgeProps {
  source: LiveDataSource;
  className?: string;
}

const sourceStyles: Record<LiveDataSource, string> = {
  'go-live': 'border border-emerald-300 bg-emerald-50 text-emerald-700',
  rss: 'border border-sky-300 bg-sky-50 text-sky-700',
  mock: 'border border-amber-300 bg-amber-50 text-amber-700',
  unknown: 'border border-slate-300 bg-slate-50 text-slate-600',
};

const sourceLabels: Record<LiveDataSource, string> = {
  'go-live': 'Live Source: Go Scraper',
  rss: 'Live Source: RSS Feed',
  mock: 'Fallback Source: Mock Data',
  unknown: 'Source: Checking...',
};

export default function LiveDataBadge({ source, className = '' }: LiveDataBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${sourceStyles[source]} ${className}`}>
      {sourceLabels[source]}
    </span>
  );
}
