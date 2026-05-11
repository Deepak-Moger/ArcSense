'use client';

import { useEffect, useState } from 'react';
import { Article, VideoScript } from '@/types';
import StoryboardPlayer from '@/components/video/StoryboardPlayer';
import LiveDataBadge from '@/components/layout/LiveDataBadge';
import { Sparkles, Film } from 'lucide-react';
import { fetchLiveArticlesWithSource, LiveDataSource } from '@/lib/news-client';

function isValidVideoScript(data: unknown): data is VideoScript {
  if (typeof data !== 'object' || data === null) return false;
  const script = data as Partial<VideoScript>;

  if (typeof script.id !== 'string') return false;
  if (typeof script.articleId !== 'string') return false;
  if (typeof script.title !== 'string') return false;
  if (typeof script.totalDuration !== 'number') return false;
  if (!Array.isArray(script.slides) || script.slides.length === 0) return false;

  return script.slides.every(
    (slide) =>
      typeof slide?.id === 'string' &&
      typeof slide?.type === 'string' &&
      typeof slide?.narration === 'string' &&
      typeof slide?.displayText === 'string' &&
      typeof slide?.duration === 'number',
  );
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
      if (!res.ok) throw new Error(`Video script request failed (${res.status})`);

      const data = await res.json();
      if (!isValidVideoScript(data)) throw new Error('Invalid video script payload');

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
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
      {/* Article picker rail */}
      <aside className="overflow-hidden border-b border-border bg-card lg:w-[340px] lg:border-b-0 lg:border-r">
        <div className="border-b border-border bg-background px-5 py-5">
          <p className="eyebrow">03 / AI Video Studio</p>
          <h1 className="mt-3 font-display text-[1.6rem] leading-tight text-foreground">
            Pick an article. Get a storyboard.
          </h1>
          <div className="mt-3">
            <LiveDataBadge source={dataSource} />
          </div>
        </div>

        <div className="max-h-72 overflow-y-auto p-3 lg:max-h-none">
          <p className="px-2 pb-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
            Queue · {articles.length}
          </p>
          <div className="space-y-1.5">
            {articles.map((article, i) => {
              const active = selectedArticle?.id === article.id;
              return (
                <button
                  key={article.id}
                  onClick={() => generateVideo(article)}
                  disabled={isGenerating}
                  className={`ui-transition w-full rounded-lg border px-3.5 py-3 text-left disabled:opacity-50 ${
                    active
                      ? 'border-foreground bg-secondary'
                      : 'border-transparent bg-background hover:border-border hover:bg-secondary/60'
                  }`}
                >
                  <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    <span className={active ? 'text-primary' : ''}>{article.category}</span>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="line-clamp-2 text-[13px] leading-snug text-foreground">
                    {article.title}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {article.date}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Player canvas */}
      <section className="bg-grid-soft relative flex flex-1 items-center justify-center bg-background p-6 sm:p-10">
        {isGenerating && (
          <div className="text-center">
            <div className="mx-auto mb-5 h-9 w-9 animate-spin rounded-full border border-foreground/20 border-t-foreground" />
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
              Generating storyboard
            </p>
            <p className="mt-2 font-display text-xl text-foreground">
              AI is composing animated slides
            </p>
          </div>
        )}

        {!isGenerating && !videoScript && (
          <div className="max-w-md text-center">
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-md border border-border bg-card text-primary">
              <Film className="h-5 w-5" />
            </span>
            <p className="eyebrow">Storyboard canvas</p>
            <p className="mt-3 font-display text-2xl leading-tight text-foreground">
              Select an article to generate a broadcast-ready video script.
            </p>
            <p className="mt-4 text-[13.5px] leading-relaxed text-muted-foreground">
              AI will create animated slides with data overlays and narration. Typical run takes
              ten to twenty seconds.
            </p>

            {error && (
              <p className="mt-5 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-[12.5px] text-destructive">
                {error}
              </p>
            )}

            <p className="mt-6 inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              Auto-storyboard · Powered by ArcSense AI
            </p>
          </div>
        )}

        {!isGenerating && videoScript && (
          <StoryboardPlayer
            script={videoScript}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
          />
        )}
      </section>
    </div>
  );
}
