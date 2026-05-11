'use client';

import { useState, useEffect, useCallback } from 'react';
import { VideoScript } from '@/types';
import VideoSlide from './VideoSlide';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface StoryboardPlayerProps {
  script: VideoScript;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export default function StoryboardPlayer({ script, isPlaying, onPlayPause }: StoryboardPlayerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const slide = script.slides[currentSlide];
  const elapsed = script.slides.slice(0, currentSlide).reduce((sum, s) => sum + s.duration, 0) + (progress / 100) * slide.duration;
  const totalProgress = (elapsed / script.totalDuration) * 100;

  const nextSlide = useCallback(() => {
    if (currentSlide < script.slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
      setProgress(0);
    } else {
      onPlayPause();
      setCurrentSlide(0);
      setProgress(0);
    }
  }, [currentSlide, script.slides.length, onPlayPause]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (slide.duration * 10);
        if (prev + increment >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, slide.duration, nextSlide]);

  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-border bg-white/90 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
      {/* Slide area */}
      <div className="flex flex-1 items-center justify-center p-4 lg:p-8">
        <div className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-300/80 bg-slate-900 shadow-[0_20px_40px_rgba(15,23,42,0.22)]">
          <VideoSlide slide={slide} />

          {/* Play/pause overlay */}
          <button
            onClick={onPlayPause}
            className="group absolute inset-0 flex items-center justify-center bg-black/0 transition-colors hover:bg-black/25"
          >
            <div className="rounded-full bg-black/60 p-4 opacity-0 transition-opacity group-hover:opacity-100">
              {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white" />}
            </div>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="border-t border-border/80 px-4 pb-4 pt-4 lg:px-8">
        {/* Progress bar */}
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-[linear-gradient(135deg,#4f46e5_0%,#7c3aed_100%)] transition-all duration-100"
            style={{ width: `${totalProgress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setCurrentSlide(Math.max(0, currentSlide - 1)); setProgress(0); }}
              className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={onPlayPause}
              className="rounded-full bg-[linear-gradient(135deg,#4f46e5_0%,#7c3aed_100%)] p-2 text-white shadow-[0_8px_20px_rgba(79,70,229,0.28)] transition-transform hover:-translate-y-0.5"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={nextSlide}
              className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-slate-500">
            Slide {currentSlide + 1} / {script.slides.length}
          </div>

          <div className="text-xs text-slate-500">
            {Math.floor(elapsed)}s / {script.totalDuration}s
          </div>
        </div>

        {/* Narration text */}
        <div className="mt-3 rounded-xl border border-border bg-slate-50/90 p-3">
          <p className="text-xs text-slate-500 mb-1">Narration:</p>
          <p className="text-sm text-slate-700">{slide.narration}</p>
        </div>
      </div>
    </div>
  );
}
