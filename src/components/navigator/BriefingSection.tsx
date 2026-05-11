'use client';

import { useState } from 'react';
import { BriefingSection as BriefingSectionType } from '@/types';
import { ChevronDown, Star, Search, TrendingUp, Quote, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BriefingSectionProps {
  section: BriefingSectionType;
  index?: number;
}

const sectionConfig: Record<string, { Icon: typeof Star }> = {
  highlights:       { Icon: Star },
  'deep-dive':      { Icon: Search },
  'sector-impact':  { Icon: TrendingUp },
  'expert-takes':   { Icon: Quote },
  'whats-next':     { Icon: ArrowRight },
};

export default function BriefingSection({ section, index = 0 }: BriefingSectionProps) {
  const [expanded, setExpanded] = useState(true);
  const config = sectionConfig[section.type] || sectionConfig.highlights;
  const Icon = config.Icon;

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card shadow-paper">
      <button
        onClick={() => setExpanded(!expanded)}
        className="ui-transition flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-secondary/60"
        aria-expanded={expanded}
      >
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-secondary text-primary">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <h3 className="flex-1 font-display text-[1.15rem] leading-tight text-foreground">
          {section.title}
        </h3>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-t border-border px-5 py-4 text-[14.5px] leading-relaxed text-foreground/90 whitespace-pre-line">
              {section.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
