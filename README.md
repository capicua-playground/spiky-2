# Souped Boilerplate

Next.js 16 + Tailwind v4 + shadcn/ui + Prisma 7 + Souped auth, wired and ready to go.

## Quickstart

```bash
cp .env.example .env.local
# Fill DATABASE_URL and the SOUPED_* values (see .env.example for where to get them)
pnpm install
pnpm dev
```

Then open:

- **http://localhost:3000/** — public landing (placeholder; replace with your real one)
- **http://localhost:3000/app** — authenticated app shell (redirects to Souped login if there is no session)
- **http://localhost:3000/api/auth/login** — starts the OAuth flow directly

## Routing convention

| Route | Auth | Notes |
| --- | --- | --- |
| `/` | public | Landing — `src/app/page.tsx` |
| `/app/:path*` | authenticated | App shell — `src/app/app/layout.tsx` + `page.tsx` |
| `/api/auth/*` | public | OAuth endpoints — never gate these |
| `/api/((?!auth).*)` | authenticated | Default API protection |

The proxy in `src/proxy.ts` enforces this. The Souped `auth-scaffolder` agent fine-tunes the matcher when you need per-route protection beyond the default.

## What's inside

- **Next.js 16** App Router with Turbopack
- **Tailwind v4** + **shadcn/ui** (Button, Card, Input, Label preinstalled)
- **Prisma 7** with the new adapter-pg pattern (`src/lib/db.ts`)
- **`@souped-tools/auth-nextjs`** — full OAuth flow, session cookies, `SoupedProvider` wired in `src/app/app/layout.tsx`
- **Vitest** + React Testing Library, 70% coverage target
- **ESLint 9** flat config + **Prettier** with the Tailwind plugin

## Next steps

Read `AGENTS.md` before editing — it captures the stack rules, conventions, and gotchas that agents (Claude, Cursor, …) and humans both need.
