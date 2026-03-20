'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { personas } from '@/data/personas';
import { PersonaType } from '@/types';

interface PersonaSelectorProps {
  open: boolean;
  onSelect: (persona: PersonaType) => void;
}

const colorClasses: Record<string, string> = {
  emerald: 'hover:border-emerald-300 hover:bg-emerald-50',
  violet: 'hover:border-violet-300 hover:bg-violet-50',
  blue: 'hover:border-blue-300 hover:bg-blue-50',
  amber: 'hover:border-amber-300 hover:bg-amber-50',
};

export default function PersonaSelector({ open, onSelect }: PersonaSelectorProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-lg border-border bg-white text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl">Choose Your Perspective</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            How would you like to read the news? Pick your persona for personalized insights.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {personas.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={`ui-transition flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 text-center ${colorClasses[p.color] || ''}`}
            >
              <span className="text-3xl">{p.icon}</span>
              <span className="font-semibold text-sm">{p.name}</span>
              <span className="text-xs text-muted-foreground">{p.description}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
