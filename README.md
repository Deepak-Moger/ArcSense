# ArcSense

<p align="center">
	<strong>AI-native business news intelligence platform</strong><br/>
	Personalized briefings, streaming chat, video stories, story arcs, and vernacular translations in one product.
</p>

<p align="center">
	<img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs" />
	<img alt="React" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" />
	<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
	<img alt="Tailwind" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
	<img alt="AI SDK" src="https://img.shields.io/badge/AI_SDK-6-000000" />
	<img alt="License" src="https://img.shields.io/badge/License-MIT-green" />
</p>

## Why ArcSense

ArcSense turns long-form business coverage into decision-ready intelligence through five AI workflows:

1. **My ET** — personalized article adaptation for Investor, Founder, Student, and Journalist personas.
2. **News Navigator** — topic briefings + follow-up conversational Q&A with real token streaming.
3. **AI Video Studio** — converts articles into storyboarded, narrated video slides.
4. **Story Arc Tracker** — tracks evolving narratives with a timeline, players, sentiment, and predictions.
5. **Vernacular Engine** — context-aware translations in Hindi, Tamil, Telugu, and Bengali.

## Demo Mode (Important)

ArcSense is demo-friendly out of the box. With no API key configured, every AI route returns a deterministic mock/fallback payload — and the briefing chat still streams character-by-character — so you can demo every product flow without a provider.

## Live AI Mode

ArcSense uses the [AI SDK v6](https://ai-sdk.dev/) with [`@ai-sdk/groq`](https://www.npmjs.com/package/@ai-sdk/groq) for fast Llama-class inference. All structured AI output (briefings, persona summaries, video scripts, story arcs, translations, sentiment) is validated through Zod schemas via `generateText` + `Output.object()`, so the UI never has to defensively parse free-form model text.

The briefing chat (`/api/ai/chat`) uses real `streamText` + `toUIMessageStreamResponse()` and the client renders tokens via `useChat` with `DefaultChatTransport`.

Copy `.env.example` to `.env.local` and set your Groq key:

```bash
GROQ_API_KEY=gsk_...
GROQ_MODEL=llama-3.3-70b-versatile   # optional, this is the default
```

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5
- **UI**: Tailwind CSS 4, Base UI primitives, Lucide icons, Framer Motion
- **Data Viz**: Recharts
- **AI**: AI SDK v6 (`ai`, `@ai-sdk/react`) + Groq (`@ai-sdk/groq`) + Zod-typed structured outputs
- **Content**: RSS ingestion + optional Go scraper backend + mock datasets

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # serve production build
npm run lint     # lint checks
```

## Architecture

```text
User UI (Next.js App Router, React 19)
  ↓
Feature pages: My ET · Navigator · Video Studio · Story Arc · Vernacular
  ↓
API routes (/api/ai/*, /api/news/feed)
  ├─ generateText + Output.object(zodSchema)  → structured JSON
  ├─ streamText + toUIMessageStreamResponse() → token streaming
  └─ Deterministic mock fallback when GROQ_API_KEY is missing
```

## Project Structure

```text
src/
  app/
    api/
      ai/        # AI SDK route handlers (Groq via @ai-sdk/groq)
      news/      # RSS / Go-backend bridge
    my-et/
    navigator/
    story-arc/
    vernacular/
    video-studio/
  components/
    layout/
    navigator/
    news/
    story-arc/
    vernacular/
    video/
    ui/
  data/
  lib/
    ai.ts        # Groq model + provider status helpers
    prompts.ts   # Analytical instructions (JSON shape lives in schemas.ts)
    schemas.ts   # Zod schemas for all structured AI outputs
  types/
```

## API Surface

| Route | Method | Purpose | AI shape |
|---|---|---|---|
| `/api/news/feed` | `GET` | Live Go backend → RSS → mock fallback | n/a |
| `/api/ai/summarize` | `POST` | Persona-adapted summary | `personaSummarySchema` |
| `/api/ai/briefing` | `POST` | 5-section topic briefing | `briefingSchema` |
| `/api/ai/chat` | `POST` | Briefing Q&A | **Streaming** (`toUIMessageStreamResponse`) |
| `/api/ai/video-script` | `POST` | Storyboard / video script | `videoScriptSchema` |
| `/api/ai/story-arc` | `POST` | Story arc analysis | `storyArcSchema` |
| `/api/ai/translate` | `POST` | Vernacular translation | `translationSchema` |
| `/api/ai/sentiment` | `POST` | Sentiment extraction | `sentimentSchema` |
| `/api/ai/provider-status` | `GET` | UI live/mock + active model | n/a |

## Go Backend (Optional Real-Time Scraping)

ArcSense includes an optional Go backend in `backend-go/` that scrapes Economic Times + Mint at request time and can also call Groq directly. Set `GO_BACKEND_URL` in `.env.local` to enable it; `/api/news/feed` will prefer the live scraper, fall back to RSS, and finally to mock data.

```bash
cd backend-go
go mod tidy
GROQ_API_KEY=gsk_... go run .
```

## Roadmap

- Saved briefings + watchlists (requires auth/db — out of scope for the demo build)
- Multi-source credibility scoring inside briefings
- Export to PDF / PPT / short-video
- Realtime briefing generation via streaming structured output

## Contributing

1. Fork the repo.
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit: `git commit -m "feat: add your feature"`
4. Push: `git push origin feat/your-feature`
5. Open a Pull Request.

## License

MIT License.
