'use client';

import { useState } from 'react';
import { StoryArcEvent } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineProps {
  events: StoryArcEvent[];
}

const impactColors: Record<string, { dot: string; border: string; bg: string }> = {
  positive: { dot: 'bg-green-500', border: 'border-green-500/30', bg: 'bg-green-500/5' },
  negative: { dot: 'bg-red-500', border: 'border-red-500/30', bg: 'bg-red-500/5' },
  neutral: { dot: 'bg-slate-400', border: 'border-slate-500/30', bg: 'bg-slate-500/5' },
};

export default function Timeline({ events }: TimelineProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      {/* Horizontal scrollable timeline */}
      <div className="overflow-x-auto pb-4">
        <div className="flex items-center gap-0 min-w-max px-4">
          {events.map((event, i) => {
            const colors = impactColors[event.impact];
            const isSelected = selected === event.id;
            return (
              <div key={event.id} className="flex items-center">
                <button
                  onClick={() => setSelected(isSelected ? null : event.id)}
                  className="flex flex-col items-center gap-1 group relative"
                >
                  <span className="text-xs text-slate-500 whitespace-nowrap">{event.date}</span>
                  <div className={`w-4 h-4 rounded-full ${colors.dot} transition-transform ${isSelected ? 'scale-125 ring-2 ring-white/20' : 'group-hover:scale-110'}`} />
                  <span className="max-w-[100px] text-center text-xs leading-tight text-slate-600 line-clamp-2">
                    {event.title}
                  </span>
                </button>
                {i < events.length - 1 && (
                  <div className="w-12 h-px bg-slate-300 mx-1 mt-[-8px]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected event detail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            {events.filter((e) => e.id === selected).map((event) => {
              const colors = impactColors[event.impact];
              return (
                <div key={event.id} className={`mt-2 rounded-xl border ${colors.border} ${colors.bg} p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                    <h3 className="text-sm font-semibold text-foreground">{event.title}</h3>
                    <span className="text-xs text-slate-500">{event.date}</span>
                  </div>
                  <p className="mb-2 text-sm text-slate-700">{event.description}</p>
                  <div className="flex gap-2">
                    {event.sources.map((src, i) => (
                      <span key={i} className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                        {src}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
