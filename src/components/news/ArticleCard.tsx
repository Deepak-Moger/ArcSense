'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Article, AdaptedArticle, PersonaType } from '@/types';

interface ArticleCardProps {
  article: Article;
  persona: PersonaType | null;
  adapted?: AdaptedArticle;
}

const personaColors: Record<PersonaType, { border: string; bg: string; label: string }> = {
  investor: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', label: 'Investor View' },
  founder: { border: 'border-violet-500/30', bg: 'bg-violet-500/10', label: 'Founder View' },
  student: { border: 'border-blue-500/30', bg: 'bg-blue-500/10', label: 'Student View' },
  journalist: { border: 'border-amber-500/30', bg: 'bg-amber-500/10', label: 'Journalist View' },
};

export default function ArticleCard({ article, persona, adapted }: ArticleCardProps) {
  const pColors = persona ? personaColors[persona] : null;
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
    >
      <Card className={`ui-transition h-full bg-white ${pColors ? pColors.border : 'border-border'}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-slate-100 text-slate-700 text-xs">
              {article.category}
            </Badge>
            <span className="text-xs text-slate-500">{article.date}</span>
          </div>
          <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
            {article.title}
          </h3>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-xs text-slate-600 line-clamp-3 mb-3">{article.summary}</p>

          {persona && adapted && (
            <div className={`rounded-lg p-3 ${pColors?.bg} border ${pColors?.border}`}>
              <span className="text-xs font-medium text-slate-700 block mb-1.5">{pColors?.label}</span>
              <p className="text-xs text-slate-700 mb-2">{adapted.personaInsights}</p>

              {adapted.highlights && adapted.highlights.length > 0 && (
                <ul className="space-y-1">
                  {adapted.highlights.slice(0, 2).map((h, i) => (
                    <li key={i} className="text-xs text-slate-600 flex gap-1.5">
                      <span className="text-blue-400 shrink-0">&#8226;</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {persona === 'investor' && adapted.relevanceScore !== undefined && (
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="text-xs text-slate-500">Relevance:</span>
                  <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${adapted.relevanceScore * 10}%` }}
                    />
                  </div>
                  <span className="text-xs text-emerald-400">{adapted.relevanceScore}/10</span>
                </div>
              )}

              {persona === 'founder' && adapted.actionItems && (
                <div className="mt-2 space-y-1">
                  {adapted.actionItems.slice(0, 2).map((item, i) => (
                    <div key={i} className="text-xs text-violet-700 flex gap-1.5">
                      <span>→</span> {item}
                    </div>
                  ))}
                </div>
              )}

              {persona === 'student' && adapted.explainerNotes && (
                <div className="mt-2 space-y-1">
                  {adapted.explainerNotes.slice(0, 2).map((note, i) => (
                    <div key={i} className="text-xs text-blue-700 italic">{note}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
            <span className="text-xs text-slate-500">{article.author}</span>
            <span className="text-xs text-slate-600">{article.source}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
