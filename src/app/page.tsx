'use client';

import Link from 'next/link';
import { Newspaper, Compass, Video, GitBranch, Languages, ArrowUpRight, ArrowRight } from 'lucide-react';
import FeatureCard from '@/components/layout/FeatureCard';
import { motion, useReducedMotion } from 'framer-motion';

const features = [
  {
    number: '01',
    eyebrow: 'Personalised Newsroom',
    title: 'My ET — same headline, four lenses',
    description:
      'Switch between Investor, Founder, Analyst and Journalist personas. Every story is rewritten for what you actually do at 9 a.m.',
    icon: <Newspaper className="h-4 w-4" />,
    href: '/my-et',
    meta: '4 personas',
  },
  {
    number: '02',
    eyebrow: 'Interactive Briefings',
    title: 'News Navigator with on-topic Q&A',
    description:
      "Multi-article briefings on the day's most-cited topics, with a streaming chat that stays grounded in the source set.",
    icon: <Compass className="h-4 w-4" />,
    href: '/navigator',
    meta: '5-section reports',
  },
  {
    number: '03',
    eyebrow: 'AI Video Studio',
    title: 'Articles to broadcast-ready storyboards',
    description:
      'Generate animated slides, data overlays and a narrator script from any article. Export-ready in under a minute.',
    icon: <Video className="h-4 w-4" />,
    href: '/video-studio',
    meta: 'Auto-storyboard',
  },
  {
    number: '04',
    eyebrow: 'Story Arc Tracker',
    title: 'Watch stories the way analysts do',
    description:
      'Timelines, player networks, sentiment shifts and AI predictions — for any narrative arc unfolding across the market.',
    icon: <GitBranch className="h-4 w-4" />,
    href: '/story-arc',
    meta: 'Live timelines',
  },
  {
    number: '05',
    eyebrow: 'Vernacular Engine',
    title: 'Context-aware translation, not just translation',
    description:
      'Hindi, Tamil, Telugu and Bengali — with cultural adaptations and notes the wires never include.',
    icon: <Languages className="h-4 w-4" />,
    href: '/vernacular',
    meta: '4 languages',
  },
];

const marketStrip = [
  { label: 'NIFTY 50',     value: '24,712.30', delta: '+0.84%', up: true  },
  { label: 'SENSEX',       value: '82,184.12', delta: '+0.71%', up: true  },
  { label: 'BANK NIFTY',   value: '52,308.45', delta: '-0.22%', up: false },
  { label: 'INR / USD',    value: '83.42',     delta: '-0.04%', up: false },
  { label: '10Y G-SEC',    value: '6.87%',     delta: '+3 bps', up: true  },
  { label: 'BRENT',        value: '$72.91',    delta: '+1.12%', up: true  },
];

const tickerHeadlines = [
  'Sensex crosses 82,000 mark for the first time',
  'RBI signals accommodative stance, rate cut expected in April',
  'Zepto raises $750M at $8.5B valuation',
  'India GDP grows 7.1% in Q3 FY26',
  'Tata semiconductor fab begins trial production',
  'Union Budget 2026: ₹12 lakh income made tax-free',
  'UPI crosses 20 billion monthly transactions',
  'India-US trade deal covers $25B in goods',
];

const todaysBriefings = [
  { kicker: 'Monetary policy', title: "How the MPC's February pause reshapes the rate-cut calendar", minutes: '6 min' },
  { kicker: 'Semiconductors',  title: 'Inside the Tata-PSMC fab: what trial production actually means', minutes: '4 min' },
  { kicker: 'Consumer tech',   title: "Why Zepto's $8.5B mark is rewriting the quick-commerce playbook", minutes: '5 min' },
];

export default function Home() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="bg-grid-soft absolute inset-0" />

        <div className="relative mx-auto max-w-[1320px] px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:pb-24 lg:pt-24">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.45 }}
            className="eyebrow"
          >
            Issue 026 &nbsp;·&nbsp; Vol. 1 &nbsp;·&nbsp; AI-native business intelligence
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.05 }}
            className="display-xl mt-5 max-w-[20ch] text-balance text-foreground"
          >
            The newsroom for people who <em className="italic text-primary">decide</em> for a living.
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.12 }}
            className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground"
          >
            ArcSense turns the day&apos;s market signal into decision-ready intelligence — five
            AI-native workspaces, one editorial voice. Built for investors, founders, analysts
            and journalists who can&apos;t afford to read the noise.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/my-et"
              className="ui-transition inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[13.5px] font-medium text-background hover:bg-foreground/90"
            >
              Open the newsroom
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/navigator"
              className="ui-transition inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-[13.5px] font-medium text-foreground hover:border-foreground/30"
            >
              Try a briefing
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          {/* Market index strip */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.25 }}
            className="mt-14 grid grid-cols-2 divide-x divide-border overflow-hidden rounded-xl border border-border bg-card shadow-paper sm:grid-cols-3 lg:grid-cols-6"
          >
            {marketStrip.map((m) => (
              <div key={m.label} className="px-4 py-4">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
                  {m.label}
                </p>
                <p className="mt-2 font-mono text-[18px] tabular-nums text-foreground">{m.value}</p>
                <p
                  className={`mt-1 font-mono text-[11px] tabular-nums ${
                    m.up ? 'text-signal' : 'text-destructive'
                  }`}
                >
                  {m.up ? '▲' : '▼'} {m.delta}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Live ticker rail */}
        <div className="relative border-t border-border bg-card">
          <div className="mx-auto flex max-w-[1320px] items-center gap-0">
            <div className="flex shrink-0 items-center gap-2 border-r border-border bg-foreground px-4 py-2.5 text-background">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal" />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em]">Live wire</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee flex gap-10 whitespace-nowrap py-2.5">
                {[...tickerHeadlines, ...tickerHeadlines].map((h, i) => (
                  <span key={i} className="inline-flex items-center gap-2 text-[13px] text-muted-foreground">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                      {String((i % tickerHeadlines.length) + 1).padStart(2, '0')}
                    </span>
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== FEATURE MOSAIC ============== */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:py-24">
          <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Workspaces · 01 / 05</p>
              <h2 className="display-lg mt-3 max-w-[18ch] text-balance text-foreground">
                Five workspaces. One editorial voice.
              </h2>
            </div>
            <p className="max-w-md text-[14.5px] leading-relaxed text-muted-foreground">
              Each workspace is a self-contained AI workflow — designed in collaboration with the
              people who&apos;d actually use it on a desk, in a fund, or in a story meeting.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div key={f.href} className="bg-background">
                <FeatureCard {...f} index={i} />
              </div>
            ))}

            {/* 6th tile: invitation / status */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.45, delay: 0.36 }}
              className="bg-background"
            >
              <div className="flex h-full flex-col justify-between rounded-xl border border-transparent bg-secondary p-7">
                <header className="mb-8 flex items-start justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    06 &nbsp;/&nbsp; Status
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal" />
                    All systems
                  </span>
                </header>

                <div className="flex-1">
                  <h3 className="font-display text-2xl leading-[1.1] text-foreground sm:text-[1.6rem]">
                    Built on AI SDK v6 with grounded outputs.
                  </h3>
                  <p className="mt-3 max-w-[34ch] text-[14.5px] leading-relaxed text-muted-foreground">
                    Every workspace is wired through Groq via the AI SDK, with Zod schemas
                    validating each structured response. Streaming chat where it matters.
                  </p>
                </div>

                <footer className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-4">
                  <Stat label="Routes" value="8" />
                  <Stat label="Schemas" value="6" />
                  <Stat label="Personas" value="4" />
                </footer>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============== TODAY'S BRIEFINGS RAIL ============== */}
      <section>
        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:py-24">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="eyebrow">Editor&apos;s deck</p>
              <h2 className="display-lg mt-3 text-balance text-foreground">Today&apos;s briefings.</h2>
            </div>
            <Link
              href="/navigator"
              className="ui-transition hidden items-center gap-1.5 text-[13.5px] font-medium text-muted-foreground hover:text-foreground sm:inline-flex"
            >
              See all briefings
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {todaysBriefings.map((b, i) => (
              <Link
                key={b.title}
                href="/navigator"
                className="group flex flex-col rounded-xl border border-border bg-card p-7 ui-hover-lift shadow-paper hover:shadow-paper-lg"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-primary">
                    {b.kicker}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
                    {String(i + 1).padStart(2, '0')} / 03
                  </span>
                </div>
                <h3 className="flex-1 font-display text-[1.55rem] leading-[1.12] text-foreground">
                  {b.title}
                </h3>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
                    {b.minutes} read
                  </span>
                  <span className="ui-transition inline-flex items-center gap-1.5 text-[13px] text-foreground group-hover:text-primary">
                    Open briefing
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============== FOOTER STRIP ============== */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
            ArcSense &copy; 2026 &nbsp;·&nbsp; AI-native business intelligence
          </p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
            Built on Next.js · AI SDK v6 · Groq
          </p>
        </div>
      </footer>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1.5 font-display text-2xl leading-none text-foreground">{value}</p>
    </div>
  );
}
