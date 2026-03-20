'use client';

import { useParams } from 'next/navigation';
import { storyArcs } from '@/data/mock-story-arcs';
import Timeline from '@/components/story-arc/Timeline';
import PlayerNetwork from '@/components/story-arc/PlayerNetwork';
import SentimentChart from '@/components/story-arc/SentimentChart';
import PredictionCard from '@/components/story-arc/PredictionCard';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function StoryArcDetailPage() {
  const params = useParams();
  const arcId = params.arcId as string;
  const arc = storyArcs.find((a) => a.id === arcId);

  if (!arc) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Story arc not found.</p>
        <Link href="/story-arc" className="mt-2 inline-block text-sm text-indigo-600">
          Back to all arcs
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <Link href="/story-arc" className="ui-transition mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" /> Back to arcs
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-foreground">{arc.title}</h1>
          <Badge variant="secondary" className="bg-slate-100 text-slate-700">{arc.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{arc.description}</p>
      </div>

      {/* Timeline Section */}
      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <span className="w-2 h-2 bg-amber-400 rounded-full" /> Timeline
        </h2>
        <Timeline events={arc.events} />
      </section>

      {/* Player Network */}
      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <span className="w-2 h-2 bg-blue-400 rounded-full" /> Key Players
        </h2>
        <PlayerNetwork players={arc.players} />
      </section>

      {/* Sentiment Chart */}
      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <span className="w-2 h-2 bg-green-400 rounded-full" /> Sentiment Over Time
        </h2>
        <SentimentChart data={arc.sentimentData} />
      </section>

      {/* Predictions & Contrarian View */}
      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <span className="w-2 h-2 bg-purple-400 rounded-full" /> Predictions & Analysis
        </h2>
        <PredictionCard predictions={arc.predictions} contrarianView={arc.contrarianView} />
      </section>
    </div>
  );
}
