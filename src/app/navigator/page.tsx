'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import LiveDataBadge from '@/components/layout/LiveDataBadge';
import { FileText } from 'lucide-react';
import { fetchLiveArticlesWithSource, LiveDataSource } from '@/lib/news-client';

interface NavigatorTopic {
  id: string;
  title: string;
  description: string;
  articleCount: number;
}

export default function NavigatorPage() {
  const reduceMotion = useReducedMotion();
  const [topics, setTopics] = useState<NavigatorTopic[]>([]);
  const [dataSource, setDataSource] = useState<LiveDataSource>('unknown');

  useEffect(() => {
    let mounted = true;

    async function loadTopics() {
      const { articles, source } = await fetchLiveArticlesWithSource(12);
      const derivedTopics = articles.slice(0, 9).map((article) => {
        const relatedCount = articles.filter((candidate) => candidate.category === article.category).length;
        return {
          id: article.id,
          title: article.title,
          description: article.summary || article.content.slice(0, 140),
          articleCount: relatedCount,
        };
      });

      if (mounted) {
        setTopics(derivedTopics);
        setDataSource(source);
      }
    }

    loadTopics();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">News Navigator</h1>
        <p className="text-sm text-muted-foreground">Choose a topic for an AI-generated interactive briefing</p>
        <div className="mt-2">
          <LiveDataBadge source={dataSource} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
        {topics.map((topic, i) => (
          <motion.div
            key={topic.id}
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { delay: i * 0.08, duration: 0.35 }}
          >
            <Link
              href={`/navigator/${topic.id}`}
              className="block group"
            >
              <div className="ui-transition ui-hover-lift rounded-2xl border border-border bg-white/90 p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)] hover:border-indigo-200 hover:shadow-[0_16px_36px_rgba(15,23,42,0.1)]">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🧭</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="ui-transition mb-1 text-sm font-semibold text-foreground group-hover:text-indigo-600">
                      {topic.title}
                    </h3>
                    <p className="mb-2 line-clamp-2 text-xs text-muted-foreground">{topic.description}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <FileText className="w-3 h-3" />
                      {topic.articleCount} articles
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
