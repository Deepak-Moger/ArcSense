'use client';

import { Article, AdaptedArticle, PersonaType } from '@/types';
import ArticleCard from './ArticleCard';

interface ArticleListProps {
  articles: Article[];
  persona: PersonaType | null;
  adaptedArticles?: Record<string, AdaptedArticle>;
}

export default function ArticleList({ articles, persona, adaptedArticles }: ArticleListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          persona={persona}
          adapted={adaptedArticles?.[article.id]}
        />
      ))}
    </div>
  );
}
