# About Me Frontend (minimal)

Next.js 16 portfolio frontend with an AI chat assistant, project grid, and legal pages.

## Stack

- Next.js App Router + React 19
- Tailwind CSS v4 + `@tailwindcss/typography`
- next-intl (`en` / `de` / `tr`, URLs like `/en/...`)
- Vitest + Playwright

## Setup

```bash
npm install
cp .env.example .env.local
# set NEXT_PUBLIC_API_URL to your FastAPI backend
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en).

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit tests |
| `npm run test:e2e` | Playwright (expects a production build via `webServer`) |

## Chat API

The UI `POST`s JSON `{ "prompt": "..." }` to `{NEXT_PUBLIC_API_URL}/stream?locale=xx` and sends `Accept-Language`. Prefer deploying a backend that supports this contract (legacy GET still works on the API but is not used by this frontend).

## Theme

Theme preference (`light` / `dark` / `system`) is stored in `localStorage` under `theme`. An inline boot script in the root layout prevents FOUC.
