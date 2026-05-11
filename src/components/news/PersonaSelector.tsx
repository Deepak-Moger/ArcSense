'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { personas } from '@/data/personas';
import { PersonaType } from '@/types';
import { TrendingUp, Target, BookOpen, Quote, ArrowUpRight } from 'lucide-react';

interface PersonaSelectorProps {
  open: boolean;
  onSelect: (persona: PersonaType) => void;
}

const personaIcons: Record<PersonaType, typeof TrendingUp> = {
  investor:   TrendingUp,
  founder:    Target,
  student:    BookOpen,
  journalist: Quote,
};

export default function PersonaSelector({ open, onSelect }: PersonaSelectorProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="border-border bg-card text-foreground sm:max-w-xl">
        <DialogHeader className="space-y-2 text-left">
          <p className="eyebrow">Step 01 — Choose lens</p>
          <DialogTitle className="font-display text-[1.65rem] leading-tight">
            Same news, four lenses.
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Pick the perspective you read from. Every article will be rewritten for what you
            actually need to do with it.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {personas.map((p, i) => {
            const Icon = personaIcons[p.id];
            return (
              <button
                key={p.id}
                onClick={() => onSelect(p.id)}
                className="ui-transition group flex items-start gap-4 rounded-lg border border-border bg-background p-4 text-left hover:border-primary/40 hover:bg-secondary"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-card text-foreground group-hover:border-primary/40 group-hover:text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
                      {String(i + 1).padStart(2, '0')} / Persona
                    </p>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <p className="mt-1 font-display text-[1.05rem] leading-tight text-foreground">
                    {p.name}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
