'use client';

import { StoryArcPlayer } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface PlayerNetworkProps {
  players: StoryArcPlayer[];
}

const sentimentColors: Record<string, { bg: string; text: string; border: string }> = {
  positive: { bg: 'bg-green-500', text: 'text-green-700', border: 'border-green-300' },
  negative: { bg: 'bg-red-500', text: 'text-red-700', border: 'border-red-300' },
  neutral: { bg: 'bg-slate-400', text: 'text-slate-700', border: 'border-slate-300' },
};

export default function PlayerNetwork({ players }: PlayerNetworkProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {players.map((player) => {
        const colors = sentimentColors[player.sentiment];
        return (
          <Card key={player.id} className={`bg-white ${colors.border}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full ${colors.bg}/20 flex items-center justify-center shrink-0`}>
                  <span className={`text-sm font-bold ${colors.text}`}>{player.imageInitials}</span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-foreground text-sm">{player.name}</h4>
                  <p className="text-xs text-slate-500 mb-1">{player.role}</p>
                  <p className="text-xs text-slate-600 line-clamp-3">{player.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
