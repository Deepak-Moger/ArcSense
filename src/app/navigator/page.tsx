'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import LiveDataBadge from '@/components/layout/LiveDataBadge';
import PageHeader from '@/components/layout/PageHeader';
import { ArrowUpRight, FileText } from 'lucide-react';
import { fetchLiveArticlesWithSource, LiveDataSource } from '@/lib/news-client';

interface NavigatorTopic {
  id: string;
  title: string;
  description: string;
  articleCount: number;
  category: string;
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
        const relatedCount = articles.filter((c) => c.category === article.category).length;
        return {
          id: article.id,
          title: article.title,
          description: article.summary || article.content.slice(0, 160),
          articleCount: relatedCount,
          category: article.category,
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
    <div>
      <PageHeader
        eyebrow="02 / Interactive briefings"
        title="News Navigator — pick a topic, get a briefing."
        description="Multi-article briefings on the day's most-cited topics, with a streaming Q&amp;A that stays grounded in the source set."
        meta={<LiveDataBadge source={dataSource} />}
      />

      <div className="mx-auto max-w-[1320px] px-5 py-10 sm:px-8 lg:py-14">
        <div className="mb-6 flex items-baseline justify-between">
          <p className="eyebrow">{topics.length} topics in queue</p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
            Updated continuously
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { delay: i * 0.05, duration: 0.35 }}
              className="bg-background"
            >
              <Link href={`/navigator/${topic.id}`} className="group block h-full">
                <article className="ui-hover-lift flex h-full flex-col p-6 hover:bg-secondary/40">
                  <header className="mb-4 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
                    <span className="text-primary">{topic.category}</span>
                    <span>{String(i + 1).padStart(2, '0')} / {String(topics.length).padStart(2, '0')}</span>
                  </header>

                  <h3 className="ui-transition font-display text-[1.3rem] leading-[1.15] text-foreground group-hover:text-primary">
                    {topic.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">
                    {topic.description}
                  </p>

                  <footer className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                      <FileText className="h-3 w-3" />
                      {topic.articleCount} articles
                    </span>
                    <span className="ui-transition inline-flex items-center gap-1 text-[12.5px] font-medium text-foreground group-hover:text-primary">
                      Open briefing
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
