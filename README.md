# ArcSense

<p align="center">
	<strong>AI-native business news intelligence platform</strong><br/>
	Personalized briefings, chat, video stories, story arcs, and vernacular translations in one product.
</p>

<p align="center">
	<img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs" />
	<img alt="React" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" />
	<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
	<img alt="Tailwind" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
	<img alt="License" src="https://img.shields.io/badge/License-MIT-green" />
</p>

## Why ArcSense

ArcSense turns long-form business coverage into decision-ready intelligence through five AI workflows:

1. **My ET**: Personalized article adaptation for Investor, Founder, Student, and Journalist personas.
2. **News Navigator**: Topic briefings + follow-up conversational Q&A.
3. **AI Video Studio**: Converts articles into storyboarded, narrated video slides.
4. **Story Arc Tracker**: Tracks evolving narratives with timeline, players, sentiment, and predictions.
5. **Vernacular Engine**: Context-aware translations in Hindi, Tamil, Telugu, and Bengali.

## Demo Mode (Important)

ArcSense is demo-friendly out of the box.

- If `ANTHROPIC_API_KEY` is missing or invalid, API routes return stable mock/fallback responses.
- This means you can still demo all product flows without live provider dependency.

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5
- **UI**: Tailwind CSS 4, Base UI primitives, Lucide icons, Framer Motion
- **Data Viz**: Recharts
- **AI**: Anthropic SDK (`@anthropic-ai/sdk`) with fail-soft fallback behavior
- **Content**: RSS ingestion + mock news datasets

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Optional `.env.local`:

```bash
ANTHROPIC_API_KEY=sk-ant-...
```

## Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # serve production build
npm run lint     # lint checks
```

## Architecture

```text
User UI (Next.js App Router)
	-> Feature pages (My ET, Navigator, Video Studio, Story Arc, Vernacular)
	-> API routes (/api/ai/*, /api/news/feed)
		 -> Claude provider call (when available)
		 -> Mock/fallback payloads (when unavailable or invalid)
```

## Project Structure

```text
src/
	app/
		api/
			ai/
			news/
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
	types/
```

## API Surface

| Route | Method | Purpose |
|---|---|---|
| `/api/news/feed` | `GET` | RSS-backed feed with fallback |
| `/api/ai/summarize` | `POST` | Persona-adapted summary |
| `/api/ai/briefing` | `POST` | Structured topic briefing |
| `/api/ai/chat` | `POST` | Briefing contextual chat |
| `/api/ai/video-script` | `POST` | Storyboard/video script generation |
| `/api/ai/story-arc` | `POST` | Story arc analysis |
| `/api/ai/translate` | `POST` | Vernacular translation with context notes |
| `/api/ai/sentiment` | `POST` | Sentiment extraction |

## Roadmap

- Provider model selection from env config
- Real-time streaming responses in chat and briefing generation
- Multi-source credibility scoring for news summaries
- Export to PDF, PPT, and short-video formats
- Auth + saved briefings and personalized watchlists

## Contributing

1. Fork the repo.
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m "feat: add your feature"`
4. Push branch: `git push origin feat/your-feature`
5. Open a Pull Request.

## License

MIT License.

## Star This Repo

If ArcSense helped you, consider starring the repo to support the project.
