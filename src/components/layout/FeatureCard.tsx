'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  color: string;
  index?: number;
}

const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  emerald: { border: 'border-emerald-500/25', bg: 'bg-emerald-100', text: 'text-emerald-700', glow: 'hover:shadow-emerald-500/15' },
  blue: { border: 'border-blue-500/25', bg: 'bg-blue-100', text: 'text-blue-700', glow: 'hover:shadow-blue-500/15' },
  purple: { border: 'border-purple-500/25', bg: 'bg-purple-100', text: 'text-purple-700', glow: 'hover:shadow-purple-500/15' },
  amber: { border: 'border-amber-500/25', bg: 'bg-amber-100', text: 'text-amber-700', glow: 'hover:shadow-amber-500/15' },
  rose: { border: 'border-rose-500/25', bg: 'bg-rose-100', text: 'text-rose-700', glow: 'hover:shadow-rose-500/15' },
};

export default function FeatureCard({ title, description, icon, href, color, index = 0 }: FeatureCardProps) {
  const colors = colorMap[color] || colorMap.blue;
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.45, delay: index * 0.08 }}
    >
      <Link href={href} className="block group">
        <div
          className={`ui-transition ui-hover-lift relative overflow-hidden rounded-2xl border ${colors.border} bg-card p-7 shadow-[0_10px_26px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] ${colors.glow}`}
        >
          <div className={`mb-5 inline-flex rounded-xl p-3 ${colors.bg}`}>
            <div className={colors.text}>{icon}</div>
          </div>

          <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{description}</p>

          <div className={`ui-transition inline-flex items-center gap-1.5 text-sm font-medium ${colors.text} group-hover:gap-2.5`}>
            Try it <ArrowRight className="w-4 h-4" />
          </div>

          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(135deg,#4f46e5_0%,#7c3aed_100%)] opacity-60" />
          <div className={`absolute top-0 right-0 h-32 w-32 ${colors.bg} rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2`} />
        </div>
      </Link>
    </motion.div>
  );
}
