# ArcSense — AI-Native News Experience Platform

Business news reimagined with 5 AI-powered features.

## Features

1. **My ET** — Personalized newsroom with 4 persona views (Investor, Founder, Student, Journalist)
2. **News Navigator** — Interactive AI briefings with Q&A chat
3. **AI Video Studio** — Transform articles into animated video presentations
4. **Story Arc Tracker** — Timelines, player networks, sentiment charts, and predictions
5. **Vernacular Engine** — Culturally adapted translations (Hindi, Tamil, Telugu, Bengali)

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui + Framer Motion
- Recharts for data visualizations
- Claude API via `@anthropic-ai/sdk`
- Mock data fallback when API key is not configured

## Setup

```bash
# Install dependencies
npm install

# Set your Claude API key (optional — app works with mock data)
# Edit .env.local and replace "your-api-key-here" with your key
ANTHROPIC_API_KEY=sk-ant-...

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── my-et/             # Feature 1: Personalized Newsroom
│   ├── navigator/         # Feature 2: Interactive Briefings
│   ├── video-studio/      # Feature 3: AI Video Studio
│   ├── story-arc/         # Feature 4: Story Arc Tracker
│   ├── vernacular/        # Feature 5: Vernacular Engine
│   └── api/               # API routes (AI + RSS)
├── components/            # React components
├── lib/                   # Claude client, RSS parser, prompts
├── data/                  # Mock articles, arcs, briefings
└── types/                 # TypeScript types
```

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/news/feed` | GET | RSS feed with mock fallback |
| `/api/ai/summarize` | POST | Persona-adapted article summary |
| `/api/ai/briefing` | POST | Structured topic briefing |
| `/api/ai/chat` | POST | Briefing Q&A |
| `/api/ai/video-script` | POST | Video storyboard generation |
| `/api/ai/story-arc` | POST | Story arc analysis |
| `/api/ai/translate` | POST | Culturally adapted translation |
| `/api/ai/sentiment` | POST | Sentiment analysis |

All API routes fall back to mock data when the Claude API key is not configured.
