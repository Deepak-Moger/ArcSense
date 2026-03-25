'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Article } from '@/types';
import LiveDataBadge from '@/components/layout/LiveDataBadge';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users } from 'lucide-react';
import { fetchLiveArticlesWithSource, LiveDataSource } from '@/lib/news-client';

export default function StoryArcListPage() {
  const reduceMotion = useReducedMotion();
  const [articles, setArticles] = useState<Article[]>([]);
  const [dataSource, setDataSource] = useState<LiveDataSource>('unknown');

  useEffect(() => {
    let mounted = true;

    async function loadStoryCandidates() {
      const { articles: liveArticles, source } = await fetchLiveArticlesWithSource(8);
      if (mounted) {
        setArticles(liveArticles);
        setDataSource(source);
      }
    }

    loadStoryCandidates();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Story Arc Tracker</h1>
        <p className="text-sm text-muted-foreground">Follow evolving stories with AI-powered timelines, sentiment analysis, and predictions</p>
        <div className="mt-2">
          <LiveDataBadge source={dataSource} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        {articles.map((article, i) => (
          <motion.div
            key={article.id}
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { delay: i * 0.1, duration: 0.35 }}
          >
            <Link href={`/story-arc/${article.id}`} className="block group">
              <div className="ui-transition ui-hover-lift rounded-2xl border border-border bg-white/90 p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)] hover:border-indigo-200 hover:shadow-[0_16px_36px_rgba(15,23,42,0.1)]">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="ui-transition font-semibold text-foreground group-hover:text-indigo-600">
                    {article.title}
                  </h3>
                  <Badge variant="secondary" className="text-xs shrink-0 ml-2 bg-slate-100 text-slate-700">
                    {article.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{article.summary || article.content.slice(0, 160)}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Live timeline
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    AI players map
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
