'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Article } from '@/types';
import LiveDataBadge from '@/components/layout/LiveDataBadge';
import PageHeader from '@/components/layout/PageHeader';
import { ArrowUpRight, Calendar, Users, Activity } from 'lucide-react';
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
    <div>
      <PageHeader
        eyebrow="04 / Story Arc Tracker"
        title="Watch stories the way analysts do."
        description="Timelines, player networks, sentiment shifts and AI predictions for every narrative arc that matters this week."
        meta={<LiveDataBadge source={dataSource} />}
      />

      <div className="mx-auto max-w-[1320px] px-5 py-10 sm:px-8 lg:py-14">
        <div className="mb-6 flex items-baseline justify-between">
          <p className="eyebrow">{articles.length} live arcs</p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
            Updated continuously
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { delay: i * 0.06, duration: 0.35 }}
              className="bg-background"
            >
              <Link href={`/story-arc/${article.id}`} className="group block h-full">
                <article className="ui-hover-lift flex h-full flex-col p-6 hover:bg-secondary/40 sm:p-7">
                  <header className="mb-4 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
                    <span className="text-primary">{article.category}</span>
                    <span>Arc · {String(i + 1).padStart(2, '0')}</span>
                  </header>

                  <h3 className="ui-transition font-display text-[1.4rem] leading-[1.15] text-foreground group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">
                    {article.summary || article.content.slice(0, 200)}
                  </p>

                  <footer className="mt-6 flex items-end justify-between border-t border-border pt-4">
                    <div className="flex flex-wrap items-center gap-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" /> Timeline
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-3 w-3" /> Players
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Activity className="h-3 w-3" /> Sentiment
                      </span>
                    </div>
                    <span className="ui-transition inline-flex items-center gap-1 text-[12.5px] font-medium text-foreground group-hover:text-primary">
                      Open arc
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </footer>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
