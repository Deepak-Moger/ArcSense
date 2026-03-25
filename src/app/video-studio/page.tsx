'use client';

import { useEffect, useState } from 'react';
import { Article, VideoScript } from '@/types';
import StoryboardPlayer from '@/components/video/StoryboardPlayer';
import LiveDataBadge from '@/components/layout/LiveDataBadge';
import { Video, Sparkles } from 'lucide-react';
import { fetchLiveArticlesWithSource, LiveDataSource } from '@/lib/news-client';

function isValidVideoScript(data: unknown): data is VideoScript {
  if (typeof data !== 'object' || data === null) return false;
  const script = data as Partial<VideoScript>;

  if (typeof script.id !== 'string') return false;
  if (typeof script.articleId !== 'string') return false;
  if (typeof script.title !== 'string') return false;
  if (typeof script.totalDuration !== 'number') return false;
  if (!Array.isArray(script.slides) || script.slides.length === 0) return false;

  return script.slides.every((slide) => (
    typeof slide?.id === 'string'
    && typeof slide?.type === 'string'
    && typeof slide?.narration === 'string'
    && typeof slide?.displayText === 'string'
    && typeof slide?.duration === 'number'
  ));
}

export default function VideoStudioPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [dataSource, setDataSource] = useState<LiveDataSource>('unknown');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [videoScript, setVideoScript] = useState<VideoScript | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadArticles() {
      const { articles: liveArticles, source } = await fetchLiveArticlesWithSource(12);
      if (mounted) {
        setArticles(liveArticles);
        setDataSource(source);
      }
    }

    loadArticles();

    return () => {
      mounted = false;
    };
  }, []);

  const generateVideo = async (article: Article) => {
    setSelectedArticle(article);
    setIsGenerating(true);
    setVideoScript(null);
    setError(null);

    try {
      const res = await fetch('/api/ai/video-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article }),
      });
      if (!res.ok) {
        throw new Error(`Video script request failed (${res.status})`);
      }

      const data = await res.json();
      if (!isValidVideoScript(data)) {
        throw new Error('Invalid video script payload');
      }

      setVideoScript(data);
      setIsPlaying(true);
    } catch {
      setVideoScript(null);
      setIsPlaying(false);
      setError('Could not generate a video script right now. Please try another article.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4.5rem)] flex-col lg:flex-row">
      {/* Article picker sidebar */}
      <div className="overflow-y-auto border-b border-border/80 lg:w-80 lg:border-r lg:border-b-0">
        <div className="sticky top-0 z-10 border-b border-border/80 bg-background/95 p-4 backdrop-blur-sm">
          <h1 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Video className="w-5 h-5 text-indigo-600" />
            AI Video Studio
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">Select an article to generate a video</p>
          <div className="mt-2">
            <LiveDataBadge source={dataSource} />
          </div>
        </div>

        <div className="p-2 space-y-1 max-h-60 lg:max-h-none overflow-y-auto">
          {articles.map((article) => (
            <button
              key={article.id}
              onClick={() => generateVideo(article)}
              disabled={isGenerating}
              className={`ui-transition w-full text-left p-3 rounded-lg text-sm ${
                selectedArticle?.id === article.id
                  ? 'border border-indigo-300 bg-indigo-50'
                  : 'border border-transparent bg-white hover:border-border hover:bg-muted/60'
              } disabled:opacity-50`}
            >
              <p className="text-xs font-medium text-foreground line-clamp-2">{article.title}</p>
              <p className="text-xs text-slate-500 mt-1">{article.category} &middot; {article.date}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Player area */}
      <div className="relative flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_20%_10%,rgba(79,70,229,0.08),transparent_45%),#f8fafc]">
        {isGenerating && (
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-3 border-indigo-500 border-t-transparent" />
            <p className="text-sm text-muted-foreground">Generating video script...</p>
            <p className="mt-1 text-xs text-slate-500">AI is creating your storyboard</p>
          </div>
        )}

        {!isGenerating && !videoScript && (
          <div className="text-center px-4">
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-indigo-300" />
            <p className="text-sm text-muted-foreground">Select an article to generate a video</p>
            <p className="mt-1 text-xs text-slate-500">
              AI will create animated slides with data visualizations and narration
            </p>
            {error && <p className="mt-3 text-xs text-rose-600">{error}</p>}
          </div>
        )}

        {!isGenerating && videoScript && (
          <StoryboardPlayer
            script={videoScript}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
          />
        )}
      </div>
    </div>
  );
}
