'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { storyArcs } from '@/data/mock-story-arcs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users } from 'lucide-react';

export default function StoryArcListPage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Story Arc Tracker</h1>
        <p className="text-sm text-muted-foreground">Follow evolving stories with AI-powered timelines, sentiment analysis, and predictions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        {storyArcs.map((arc, i) => (
          <motion.div
            key={arc.id}
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { delay: i * 0.1, duration: 0.35 }}
          >
            <Link href={`/story-arc/${arc.id}`} className="block group">
              <div className="ui-transition ui-hover-lift rounded-2xl border border-border bg-white/90 p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)] hover:border-indigo-200 hover:shadow-[0_16px_36px_rgba(15,23,42,0.1)]">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="ui-transition font-semibold text-foreground group-hover:text-indigo-600">
                    {arc.title}
                  </h3>
                  <Badge variant="secondary" className="text-xs shrink-0 ml-2 bg-slate-100 text-slate-700">
                    {arc.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{arc.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {arc.events.length} events
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {arc.players.length} players
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
