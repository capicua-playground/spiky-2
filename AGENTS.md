# AGENTS.md — Souped Boilerplate

This file is the source of truth for any AI agent (Claude, Cursor, Copilot, etc.) working on a project scaffolded from the Souped boilerplate. Read it in full before writing or editing code.

`CLAUDE.md` in the repo root points back here — the two stay in sync.

---

## The stack

All decisions below are fixed. Do not swap them without explicit user approval.

| Concern                         | Choice                                                                 |
| ------------------------------- | ---------------------------------------------------------------------- |
| Framework                       | Next.js 16+ (App Router, Turbopack)                                    |
| Language                        | TypeScript, strict mode                                                |
| Package manager                 | `pnpm` only — never `npm` or `yarn`                                    |
| Node version                    | 22+ (see `.nvmrc` and `engines`)                                       |
| Styling                         | Tailwind CSS v4 (PostCSS plugin, no `tailwind.config.ts`)              |
| UI kit                          | `shadcn/ui` with `radix-nova` style, `neutral` base color              |
| Icons                           | `lucide-react`                                                         |
| DB                              | PostgreSQL via Prisma 7 (adapter-pg). Schema in `prisma/schema.prisma` |
| Auth                            | `@souped-tools/auth-nextjs` — behind the `SOUPED_AUTH_ENABLED` flag    |
| Testing                         | Vitest + React Testing Library + jsdom (70% coverage target)           |
| Forms                           | `react-hook-form` + `zod` (add `react-hook-form` when needed)          |
| Formatting                      | Prettier + `prettier-plugin-tailwindcss`                               |
| Linting                         | ESLint 9 flat config (from `eslint-config-next`)                       |
| Runtime language for all output | English — code, comments, commits, docs                                |

---

## Repo layout

```
.
├── AGENTS.md             ← you are here
├── CLAUDE.md             ← @AGENTS.md (pointer)
├── .env.example          ← copy to .env.local; never commit .env.local
├── .nvmrc                ← Node 22
├── prisma/
│   └── schema.prisma     ← models go here
├── prisma.config.ts      ← Prisma 7 runtime config (datasource URL lives here)
├── src/
│   ├── actions/          ← server actions ("use server" at top)
│   ├── app/              ← App Router routes
│   │   ├── api/
│   │   │   ├── auth/[...souped]/route.ts  ← Souped OAuth handlers
│   │   │   └── health/route.ts            ← sample API route
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── landing/      ← marketing surfaces — use Souped brand tokens
│   │   └── ui/           ← shadcn components — DO NOT edit, regenerate via CLI
│   ├── generated/        ← Prisma client — gitignored, auto-generated
│   ├── hooks/            ← custom React hooks
│   ├── lib/
│   │   ├── db.ts         ← PrismaClient singleton — always import from here
│   │   └── utils.ts      ← shadcn cn() helper
│   ├── proxy.ts          ← Next 16 proxy (auth gate behind flag)
│   └── types/
│       └── index.ts      ← shared types barrel
└── vitest.config.ts
```

---

## Enabling auth

Auth is wired but **off by default**. Every route is public until you flip the switch.

**To turn auth on in a project that was scaffolded from this boilerplate:**

1. Create a Web App in the [Souped dashboard](https://souped.tools). Copy the `client_id`, `client_secret`, and project id.
2. Add the redirect URIs in Souped:
   - `http://localhost:3000/api/auth/callback` (dev)
   - `https://yourapp.com/api/auth/callback` (prod)
3. In `.env.local`:
   ```env
   SOUPED_AUTH_ENABLED=true
   SOUPED_URL=https://souped.tools
   SOUPED_CLIENT_ID=souped_client_xxx
   SOUPED_CLIENT_SECRET=souped_secret_xxx
   SOUPED_PROJECT_ID=...
   SOUPED_SESSION_SECRET=...   # openssl rand -base64 32
   ```
4. Restart the dev server. The proxy (`src/proxy.ts`) now enforces auth on every non-static route.
5. In Vercel, mirror the same env vars for each environment (production, preview).

**How the flag works:** `src/proxy.ts` reads `SOUPED_AUTH_ENABLED` at module load. When `"true"`, it wraps the handler with `withSoupedAuth`. When anything else (or unset), it returns the passthrough handler. No code edits are needed to activate — just env vars.

**Auth primitives available once enabled:**

- `GET /api/auth/login` → starts OAuth redirect to Souped
- `GET /api/auth/callback` → OAuth callback, sets session cookie
- `GET /api/auth/logout` → clears the session
- `getSession()` from `@souped-tools/auth-nextjs` in server components/actions
- `<SoupedProvider user={session}>` + `useSession()` in client components

**Do NOT try to roll your own auth.** If a requirement doesn't fit the Souped SDK, escalate to a human.

---

## Database

- Prisma 7 changed two things from older versions:
  1. The datasource `url` lives in `prisma.config.ts`, NOT in `schema.prisma`.
  2. `PrismaClient` requires an adapter (`@prisma/adapter-pg`) — instantiation is already wired in `src/lib/db.ts`.
- Always import the client from `@/lib/db`:
  ```ts
  import { db } from "@/lib/db";
  const users = await db.user.findMany();
  ```
- **Never modify `prisma/schema.prisma` or create migrations without asking the user first.** This is a hard rule.
- To run migrations after adding models: `pnpm prisma migrate dev --name <name>`.
- The generated client (`src/generated/prisma`) is gitignored. `pnpm install` runs `prisma generate` automatically via the postinstall hook.

---

## Styling

- Use Tailwind utility classes. No inline styles except when you need a CSS variable value that can't be expressed as a utility (see the landing page for examples).
- Souped brand tokens are in `src/app/globals.css` under `:root`:
  - `--souped-bg` (deep navy)
  - `--souped-ink` (warm white)
  - `--souped-accent` (orange `#FF6B35`)
  - `--souped-accent-alt`, `--souped-accent-warm`, `--souped-accent-blue`
  - `--souped-bg-elevated`, `--souped-bg-subtle`
- Use Souped tokens for **marketing / landing** surfaces. Use shadcn tokens (`--primary`, `--background`, etc.) for **in-app** surfaces so dark mode and theme switches work.
- Do not edit `src/components/ui/*` by hand. Regenerate with `pnpm dlx shadcn@latest add <component>`.

---

## Testing

- Vitest is already wired. Run:
  - `pnpm test` — watch mode
  - `pnpm test:run` — single pass
  - `pnpm test:coverage` — with coverage
- The coverage target is 70% across lines/functions/branches/statements, excluding generated code and shadcn UI primitives.
- Co-locate tests next to the source: `foo.ts` ↔ `foo.test.ts`.
- Server actions, lib helpers, and hooks MUST have tests. UI components should have at least a smoke render test.

---

## Conventions

- **Import alias:** `@/*` → `src/*`. Use it for everything above `./`.
- **Server actions** live in `src/actions/` with `"use server"` as the first line. Validate input with zod. Always return a tagged result (`{ ok: true, ... } | { ok: false, error }`), never throw to the client.
- **API routes** live in `src/app/api/<name>/route.ts` and export `GET`, `POST`, etc. Use `NextResponse.json(...)`.
- **Forms** use `react-hook-form` + zod for anything non-trivial. The sample `PingForm` uses `useTransition` for simplicity — copy that pattern for small forms.
- **Never commit `.env*` except `.env.example`.** The `.gitignore` enforces this.
- **Never use the `any` type.** Use `unknown` and narrow.
- **Branch naming:** `{author}/{ticket?}-{description}` — e.g. `pablo/PRE-1234-add-login`.
- **Commit style:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).
- **Repos are always private.**

---

## When something doesn't fit

If a task requires deviating from this stack (different ORM, different UI kit, different auth), STOP and ask the user. Do not silently install alternatives.

For architecture or schema decisions, stop and ask. For anything touching `prisma/schema.prisma`, stop and ask.

---

## Quick commands

```bash
pnpm install             # installs + generates Prisma client
pnpm dev                 # dev server at http://localhost:3000
pnpm build               # production build
pnpm start               # run the built app
pnpm lint                # ESLint
pnpm format              # Prettier write
pnpm test                # Vitest watch
pnpm prisma migrate dev  # after editing schema.prisma (ASK FIRST)
```
