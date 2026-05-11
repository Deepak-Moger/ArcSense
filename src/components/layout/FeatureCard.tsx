'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ReactNode } from 'react';

interface FeatureCardProps {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  ctaLabel?: string;
  meta?: string;
  index?: number;
}

export default function FeatureCard({
  number,
  eyebrow,
  title,
  description,
  icon,
  href,
  ctaLabel = 'Open workspace',
  meta,
  index = 0,
}: FeatureCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.45, delay: index * 0.06 }}
    >
      <Link href={href} className="group block h-full">
        <article className="ui-hover-lift relative flex h-full flex-col justify-between rounded-xl border border-border bg-card p-7 shadow-paper hover:shadow-paper-lg">
          {/* Top row: number + eyebrow */}
          <header className="mb-8 flex items-start justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {number} &nbsp;/&nbsp; {eyebrow}
            </span>
            <span className="ui-transition flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary text-foreground group-hover:border-primary/40 group-hover:text-primary">
              {icon}
            </span>
          </header>

          {/* Title + description */}
          <div className="flex-1">
            <h3 className="font-display text-2xl leading-[1.1] text-foreground sm:text-[1.6rem]">
              {title}
            </h3>
            <p className="mt-3 max-w-[34ch] text-[14.5px] leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          {/* Footer: CTA + meta */}
          <footer className="mt-8 flex items-end justify-between border-t border-border pt-4">
            <span className="ui-transition inline-flex items-center gap-1.5 text-[13.5px] font-medium text-foreground group-hover:text-primary">
              {ctaLabel}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            {meta && (
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
                {meta}
              </span>
            )}
          </footer>
        </article>
      </Link>
    </motion.div>
  );
}
