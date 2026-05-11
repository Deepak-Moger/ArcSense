'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { Send, Bot, User } from 'lucide-react';

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
          text: `I've analyzed the briefing on "${topicTitle}". Ask me anything about the key developments, sector impacts, or what to watch next.`,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isBusy) return;
    sendMessage({ text: trimmed });
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border/80 px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">Ask about this briefing</h3>
        <p className="text-xs text-muted-foreground">
          AI-powered Q&amp;A &middot; streaming
        </p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const text = getMessageText(msg);
          if (!text) return null;
          return (
            <div
              key={msg.id}
              className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100">
                  <Bot className="w-3.5 h-3.5 text-indigo-600" />
                </div>
              )}
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm ${
                  msg.role === 'user'
                    ? 'bg-[linear-gradient(135deg,#4f46e5_0%,#7c3aed_100%)] text-white'
                    : 'border border-border bg-white text-slate-700'
                }`}
              >
                {text}
              </div>
              {msg.role === 'user' && (
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200">
                  <User className="w-3.5 h-3.5 text-slate-600" />
                </div>
              )}
            </div>
          );
        })}

        {isBusy && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100">
              <Bot className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <div className="rounded-lg border border-border bg-white px-3 py-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
            Sorry, something went wrong. Please try again.
          </div>
        )}
      </div>

      <div className="border-t border-border/80 p-3">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="ui-transition flex-1 rounded-xl border border-input bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-indigo-400 focus:outline-none"
            disabled={isBusy}
          />
          <button
            type="submit"
            disabled={!input.trim() || isBusy}
            className="ui-transition rounded-xl bg-[linear-gradient(135deg,#4f46e5_0%,#7c3aed_100%)] p-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
