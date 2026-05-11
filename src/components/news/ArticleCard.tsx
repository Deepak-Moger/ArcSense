'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Target, BookOpen, Quote } from 'lucide-react';
import { Article, AdaptedArticle, PersonaType } from '@/types';

interface ArticleCardProps {
  article: Article;
  persona: PersonaType | null;
  adapted?: AdaptedArticle;
}

const personaMeta: Record<
  PersonaType,
  { label: string; Icon: typeof TrendingUp }
> = {
  investor:   { label: 'Investor view',   Icon: TrendingUp },
  founder:    { label: 'Founder view',    Icon: Target },
  student:    { label: 'Student view',    Icon: BookOpen },
  journalist: { label: 'Journalist view', Icon: Quote },
};

export default function ArticleCard({ article, persona, adapted }: ArticleCardProps) {
  const reduceMotion = useReducedMotion();
  const pMeta = persona ? personaMeta[persona] : null;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.35 }}
      className="ui-hover-lift group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-paper hover:shadow-paper-lg"
    >
      {/* Top metadata row */}
      <header className="mb-4 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
        <span className="text-primary">{article.category}</span>
        <span>{article.date}</span>
      </header>

      {/* Headline */}
      <h3 className="font-display text-[1.35rem] leading-[1.15] text-foreground">
        {article.title}
      </h3>

      {/* Summary */}
      {article.summary && (
        <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-muted-foreground">
          {article.summary}
        </p>
      )}

      {/* Persona insight block */}
      {persona && adapted && pMeta && (
        <div className="mt-5 rounded-lg border border-border bg-secondary p-4">
          <div className="mb-2 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-primary">
            <pMeta.Icon className="h-3 w-3" />
            {pMeta.label}
          </div>
          <p className="text-[13.5px] leading-relaxed text-foreground">{adapted.personaInsights}</p>

          {adapted.highlights && adapted.highlights.length > 0 && (
            <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
              {adapted.highlights.slice(0, 2).map((h, i) => (
                <li key={i} className="flex gap-2 text-[13px] text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {h}
                </li>
              ))}
            </ul>
          )}

          {persona === 'investor' && adapted.relevanceScore !== undefined && (
            <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                Relevance
              </span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-signal"
                  style={{ width: `${adapted.relevanceScore * 10}%` }}
                />
              </div>
              <span className="font-mono text-[11px] tabular-nums text-foreground">
                {adapted.relevanceScore}/10
              </span>
            </div>
          )}

          {persona === 'founder' && adapted.actionItems && adapted.actionItems.length > 0 && (
            <ul className="mt-3 space-y-1 border-t border-border pt-3">
              {adapted.actionItems.slice(0, 2).map((item, i) => (
                <li key={i} className="flex gap-2 text-[13px] text-foreground">
                  <span className="font-mono text-[11px] text-primary">→</span>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {persona === 'student' && adapted.explainerNotes && adapted.explainerNotes.length > 0 && (
            <ul className="mt-3 space-y-1 border-t border-border pt-3">
              {adapted.explainerNotes.slice(0, 2).map((note, i) => (
                <li key={i} className="text-[13px] italic text-muted-foreground">
                  {note}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto flex items-center justify-between border-t border-border pt-4">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
          {article.source}
        </span>
        <span className="ui-transition inline-flex items-center gap-1 text-[12px] font-medium text-foreground group-hover:text-primary">
          Read
          <ArrowUpRight className="h-3 w-3" />
        </span>
      </footer>
    </motion.article>
  );
}
