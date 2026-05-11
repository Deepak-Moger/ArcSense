'use client';

import { VideoSlide as VideoSlideType } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import DataOverlay from './DataOverlay';
import { Quote } from 'lucide-react';

interface VideoSlideProps {
  slide: VideoSlideType;
}

export default function VideoSlide({ slide }: VideoSlideProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slide.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.4 }}
        className="w-full h-full flex items-center justify-center p-8"
      >
        {slide.type === 'title' && (
          <div className="text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/55 via-violet-950/40 to-slate-900/35" />
            <div className="relative">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl lg:text-2xl font-bold text-white leading-snug max-w-xl"
              >
                {slide.displayText}
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 }}
                className="mx-auto mt-4 h-0.5 w-24 bg-[linear-gradient(135deg,#4f46e5_0%,#7c3aed_100%)]"
              />
            </div>
          </div>
        )}

        {slide.type === 'narration' && (
          <div className="text-center max-w-lg">
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-lg font-semibold text-white mb-4"
            >
              {slide.displayText}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mx-auto h-2 w-2 animate-pulse rounded-full bg-indigo-400"
            />
          </div>
        )}

        {slide.type === 'data' && slide.dataPoints && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-semibold text-white mb-4"
            >
              {slide.displayText}
            </motion.h2>
            <div className="h-48 w-full max-w-md rounded-xl border border-slate-300/30 bg-white/85 p-2">
              <DataOverlay dataPoints={slide.dataPoints} />
            </div>
          </div>
        )}

        {slide.type === 'quote' && slide.quote && (
          <div className="text-center max-w-lg">
            <Quote className="w-8 h-8 text-purple-400/40 mx-auto mb-3" />
            <motion.blockquote
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg text-white italic leading-relaxed mb-4"
            >
              &ldquo;{slide.quote.text}&rdquo;
            </motion.blockquote>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-slate-400"
            >
              — {slide.quote.author}
            </motion.p>
          </div>
        )}

        {slide.type === 'conclusion' && (
          <div className="text-center max-w-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/55 via-slate-900/20 to-transparent" />
            <div className="relative">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-semibold text-white mb-3"
              >
                {slide.displayText}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-slate-500"
              >
                ArcSense AI News Studio
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
