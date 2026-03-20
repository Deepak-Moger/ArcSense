'use client';

import { motion } from 'framer-motion';
import { Sparkles, AlertTriangle } from 'lucide-react';

interface PredictionCardProps {
  predictions: string[];
  contrarianView: string;
}

export default function PredictionCard({ predictions, contrarianView }: PredictionCardProps) {
  return (
    <div className="space-y-4">
      {/* Predictions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {predictions.map((pred, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-purple-200 bg-purple-50/70 p-4"
          >
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <div>
                <span className="text-xs text-purple-700 font-medium">Prediction {i + 1}</span>
                <p className="text-sm text-slate-700 mt-1">{pred}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contrarian View */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl border border-amber-200 bg-amber-50/70 p-4"
      >
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="mb-2 text-sm font-semibold text-amber-700">Contrarian View</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{contrarianView}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
