'use client';

import { useState } from 'react';
import { BriefingSection as BriefingSectionType } from '@/types';
import { ChevronDown, Star, Search, TrendingUp, Quote, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BriefingSectionProps {
  section: BriefingSectionType;
}

const sectionConfig: Record<string, { icon: typeof Star; color: string }> = {
  highlights: { icon: Star, color: 'text-yellow-400' },
  'deep-dive': { icon: Search, color: 'text-blue-400' },
  'sector-impact': { icon: TrendingUp, color: 'text-green-400' },
  'expert-takes': { icon: Quote, color: 'text-purple-400' },
  'whats-next': { icon: ArrowRight, color: 'text-orange-400' },
};

export default function BriefingSection({ section }: BriefingSectionProps) {
  const [expanded, setExpanded] = useState(true);
  const config = sectionConfig[section.type] || sectionConfig.highlights;
  const Icon = config.icon;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white/90 shadow-[0_6px_16px_rgba(15,23,42,0.06)]">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2 p-3 transition-colors hover:bg-muted/60"
      >
        <Icon className={`w-4 h-4 ${config.color} shrink-0`} />
        <span className="flex-1 text-left text-sm font-semibold text-foreground">{section.title}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-3 pb-3 text-sm leading-relaxed whitespace-pre-line text-slate-700">
              {section.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
