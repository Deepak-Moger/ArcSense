'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Today' },
  { href: '/my-et', label: 'My ET' },
  { href: '/navigator', label: 'Navigator' },
  { href: '/video-studio', label: 'Studio' },
  { href: '/story-arc', label: 'Story Arc' },
  { href: '/vernacular', label: 'Vernacular' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiMode, setAiMode] = useState<'loading' | 'live' | 'mock'>('loading');
  const [providerLabel, setProviderLabel] = useState<string>('');
  const [now, setNow] = useState<string>('');

  useEffect(() => {
    let mounted = true;

    async function loadStatus() {
      try {
        const res = await fetch('/api/ai/provider-status', { cache: 'no-store' });
        const data = (await res.json()) as { live?: boolean; provider?: string; model?: string | null };
        if (!mounted) return;
        setAiMode(data.live ? 'live' : 'mock');
        if (data.live && data.provider) {
          setProviderLabel(data.model ? `${data.provider} · ${data.model.split('-')[0]}` : data.provider);
        }
      } catch {
        if (!mounted) return;
        setAiMode('mock');
      }
    }

    function tick() {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, '0');
      const mm = String(d.getUTCMinutes()).padStart(2, '0');
      setNow(`${hh}:${mm} UTC`);
    }

    loadStatus();
    tick();
    const id = setInterval(tick, 1000 * 30);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border surface-glass">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-6 px-5 sm:px-8">
        {/* Wordmark */}
        <Link href="/" className="flex shrink-0 items-baseline gap-2">
          <span className="font-display text-2xl leading-none tracking-tight text-foreground">
            ArcSense
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Intelligence
          </span>
        </Link>

        <span className="hidden h-5 w-px bg-border md:block" />

        {/* Primary nav */}
        <div className="hidden flex-1 items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`ui-transition relative rounded-md px-3 py-1.5 text-[13.5px] font-medium ${
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-[18px] hidden h-px bg-primary md:block" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right cluster: clock + status + search hint */}
        <div className="ml-auto hidden items-center gap-3 sm:flex">
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground lg:inline">
            {now}
          </span>

          <span className="hidden h-5 w-px bg-border lg:block" />

          <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                aiMode === 'live'
                  ? 'bg-signal animate-pulse-dot'
                  : aiMode === 'mock'
                    ? 'bg-amber-500'
                    : 'bg-muted-foreground/60'
              }`}
            />
            {aiMode === 'live'
              ? providerLabel
                ? `Live · ${providerLabel}`
                : 'Live'
              : aiMode === 'mock'
                ? 'Demo Mode'
                : 'Checking'}
          </span>

          <span className="hidden h-5 w-px bg-border lg:block" />

          <span className="hidden items-center gap-1.5 lg:inline-flex">
            <span className="font-mono text-[11px] text-muted-foreground">Search</span>
            <kbd className="kbd">⌘</kbd>
            <kbd className="kbd">K</kbd>
          </span>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="ui-transition ml-auto rounded-md border border-border bg-card p-2 text-muted-foreground hover:text-foreground md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 md:hidden">
          <div className="grid divide-y divide-border">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`ui-transition px-5 py-3.5 text-sm ${
                    isActive
                      ? 'text-foreground bg-secondary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center justify-between border-t border-border px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
            <span>{now}</span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  aiMode === 'live'
                    ? 'bg-signal animate-pulse-dot'
                    : aiMode === 'mock'
                      ? 'bg-amber-500'
                      : 'bg-muted-foreground/60'
                }`}
              />
              {aiMode === 'live'
                ? providerLabel
                  ? `Live · ${providerLabel}`
                  : 'Live'
                : aiMode === 'mock'
                  ? 'Demo'
                  : 'Checking'}
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}
