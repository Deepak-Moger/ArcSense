'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { ArrowUp, Sparkles } from 'lucide-react';

interface ChatInterfaceProps {
  briefingContext: string;
  topicTitle: string;
}

function getMessageText(msg: UIMessage): string {
  if (!Array.isArray(msg.parts)) return '';
  return msg.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('');
}

const suggestions = [
  'Summarize the three most important takeaways.',
  'Which sectors look most exposed to this story?',
  'What should I watch in the next 48 hours?',
];

export default function ChatInterface({ briefingContext, topicTitle }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const initialMessages: UIMessage[] = [
    {
      id: 'intro',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: `I have read the briefing on "${topicTitle}". Ask about key developments, sector impact, or what to watch next.`,
        },
      ],
    },
  ];

  const { messages, sendMessage, status, error } = useChat({
    id: `briefing-${topicTitle}`,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: '/api/ai/chat',
      prepareSendMessagesRequest: ({ messages: msgs }) => ({
        body: {
          messages: msgs,
          briefingContext,
          topicTitle,
        },
      }),
    }),
  });

  const isBusy = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    sendMessage({ text: trimmed });
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const showSuggestions = messages.length <= 1 && !isBusy;

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-5 py-4">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Ask the briefing</p>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            Streaming Q&amp;A
          </span>
        </div>
        <p className="mt-1.5 font-display text-base leading-tight text-foreground">
          Conversation grounded in this report.
        </p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5">
        <div className="space-y-4">
          {messages.map((msg) => {
            const text = getMessageText(msg);
            if (!text) return null;
            const isUser = msg.role === 'user';
            return (
              <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {isUser ? 'You' : 'ArcSense'}
                  </span>
                  <div
                    className={`whitespace-pre-wrap rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
                      isUser
                        ? 'bg-foreground text-background'
                        : 'border border-border bg-card text-foreground shadow-paper'
                    }`}
                  >
                    {text}
                  </div>
                </div>
              </div>
            );
          })}

          {isBusy && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex justify-start">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  ArcSense
                </span>
                <div className="rounded-2xl border border-border bg-card px-4 py-3 shadow-paper">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/70" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/70" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/70" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-[12.5px] text-destructive">
              Sorry, something went wrong. Please try again.
            </div>
          )}
        </div>

        {/* Suggested prompts */}
        {showSuggestions && (
          <div className="mt-6 grid gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Try
            </span>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="ui-transition rounded-lg border border-border bg-card px-3.5 py-2.5 text-left text-[13.5px] text-foreground hover:border-primary/40 hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-border bg-card px-4 py-3">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about this briefing..."
            className="ui-transition w-full rounded-xl border border-input bg-background py-3 pl-4 pr-12 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            disabled={isBusy}
          />
          <button
            type="submit"
            disabled={!input.trim() || isBusy}
            className="ui-transition absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-foreground p-1.5 text-background disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send message"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          AI may make mistakes. Ground-checked against the briefing above.
        </p>
      </div>
    </div>
  );
}
