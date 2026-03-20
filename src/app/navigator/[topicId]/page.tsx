'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Briefing } from '@/types';
import { briefingTopics, mockBriefings } from '@/data/mock-briefings';
import BriefingView from '@/components/navigator/BriefingView';
import ChatInterface from '@/components/navigator/ChatInterface';

function isValidBriefing(data: unknown): data is Briefing {
  if (!data || typeof data !== 'object') return false;

  const candidate = data as Partial<Briefing>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.topicId === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.generatedAt === 'string' &&
    Array.isArray(candidate.articleIds) &&
    Array.isArray(candidate.sections)
  );
}

export default function BriefingPage() {
  const params = useParams();
  const topicId = params.topicId as string;
  const [briefing, setBriefing] = useState<Briefing | null>(null);
  const [loading, setLoading] = useState(true);

  const topic = briefingTopics.find((t) => t.id === topicId);
  const fallbackBriefing = mockBriefings.find((b) => b.topicId === topicId) || mockBriefings[0];

  useEffect(() => {
    async function fetchBriefing() {
      setLoading(true);
      try {
        const res = await fetch('/api/ai/briefing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topicId }),
        });

        if (!res.ok) {
          setBriefing(fallbackBriefing);
          return;
        }

        const data = await res.json();

        if (isValidBriefing(data)) {
          setBriefing(data);
        } else {
          setBriefing(fallbackBriefing);
        }
      } catch {
        setBriefing(fallbackBriefing);
      } finally {
        setLoading(false);
      }
    }
    fetchBriefing();
  }, [topicId, fallbackBriefing]);

  const briefingContext = Array.isArray(briefing?.sections)
    ? briefing.sections.map((s) => `${s.title}: ${s.content}`).join('\n\n')
    : '';

  return (
    <div className="h-[calc(100vh-4.5rem)] flex flex-col lg:flex-row">
      <div className="flex-1 lg:w-3/5 overflow-y-auto border-r border-border/80 p-4 sm:p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground">{topic?.title || 'Briefing'}</h1>
          <p className="text-xs text-muted-foreground">{topic?.description}</p>
        </div>
        <BriefingView briefing={briefing} loading={loading} />
      </div>

      <div className="h-80 border-t border-border/80 lg:h-auto lg:w-2/5 lg:border-t-0">
        <ChatInterface
          briefingContext={briefingContext}
          topicTitle={topic?.title || 'this topic'}
        />
      </div>
    </div>
  );
}
