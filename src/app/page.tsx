'use client';

import { Newspaper, Compass, Video, GitBranch, Languages } from 'lucide-react';
import FeatureCard from '@/components/layout/FeatureCard';
import { motion, useReducedMotion } from 'framer-motion';

const features = [
  {
    title: 'My ET — Personalized Newsroom',
    description: 'Same news, different lens. Choose your persona — Investor, Founder, Student, or Journalist — and get AI-adapted insights.',
    icon: <Newspaper className="w-6 h-6" />,
    href: '/my-et',
    color: 'emerald',
  },
  {
    title: 'News Navigator',
    description: 'Interactive AI briefings that synthesize multiple articles into structured reports. Ask follow-up questions and dive deeper.',
    icon: <Compass className="w-6 h-6" />,
    href: '/navigator',
    color: 'blue',
  },
  {
    title: 'AI Video Studio',
    description: 'Transform any article into a broadcast-ready video with animated slides, data visualizations, and AI narration.',
    icon: <Video className="w-6 h-6" />,
    href: '/video-studio',
    color: 'purple',
  },
  {
    title: 'Story Arc Tracker',
    description: 'Track evolving stories with timelines, player networks, sentiment analysis, and AI-generated predictions.',
    icon: <GitBranch className="w-6 h-6" />,
    href: '/story-arc',
    color: 'amber',
  },
  {
    title: 'Vernacular Engine',
    description: 'Culturally adapted translations in Hindi, Tamil, Telugu, and Bengali — context-aware localization for business news.',
    icon: <Languages className="w-6 h-6" />,
    href: '/vernacular',
    color: 'rose',
  },
];

const headlines = [
  'Sensex crosses 82,000 mark for the first time',
  'RBI signals accommodative stance, rate cut expected in April',
  'Zepto raises $750M at $8.5B valuation',
  'India GDP grows 7.1% in Q3 FY26',
  'Tata semiconductor fab begins trial production',
  'Union Budget 2026: ₹12 lakh income made tax-free',
  'UPI crosses 20 billion monthly transactions',
  'India-US trade deal covers $25B in goods',
];

export default function Home() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_14%,rgba(79,70,229,0.09),transparent_45%),radial-gradient(circle_at_82%_28%,rgba(124,58,237,0.1),transparent_42%)]" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.08) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div className="relative mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <motion.div
          className="mx-auto mb-16 max-w-4xl text-center"
          initial={reduceMotion ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.55 }}
        >
          <p className="mb-4 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            AI-native intelligence platform
          </p>
          <h1 className="mb-5 text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Read market signals with
            <span className="text-gradient-primary"> speed and clarity</span>
          </h1>
          <p className="mx-auto mb-2 max-w-2xl text-xl font-medium text-slate-700">ArcSense</p>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Business news reimagined with five AI-native workflows, designed to turn noisy updates into decision-ready intelligence.
          </p>
        </motion.div>

        <div className="mx-auto mb-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.href} {...feature} index={index} />
          ))}
        </div>

        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-border/80 bg-white/85 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur-sm">
          <div className="flex items-center">
            <div className="shrink-0 bg-[linear-gradient(135deg,#4f46e5_0%,#7c3aed_100%)] px-3 py-2 text-xs font-bold text-white">
              LIVE
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee flex gap-8 whitespace-nowrap py-2.5">
                {[...headlines, ...headlines].map((headline, i) => (
                  <span key={i} className="inline-flex items-center gap-2 text-sm text-slate-600">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                    {headline}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
