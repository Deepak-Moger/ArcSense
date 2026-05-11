import { LiveDataSource } from '@/lib/news-client';

interface LiveDataBadgeProps {
  source: LiveDataSource;
  className?: string;
}

const dotStyles: Record<LiveDataSource, string> = {
  'go-live': 'bg-signal animate-pulse-dot',
  rss: 'bg-signal animate-pulse-dot',
  mock: 'bg-amber-500',
  unknown: 'bg-muted-foreground/60',
};

const sourceLabels: Record<LiveDataSource, string> = {
  'go-live': 'Live · Go scraper',
  rss: 'Live · RSS feed',
  mock: 'Demo · Mock data',
  unknown: 'Source · Checking',
};

export default function LiveDataBadge({ source, className = '' }: LiveDataBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[source]}`} />
      {sourceLabels[source]}
    </span>
  );
}
