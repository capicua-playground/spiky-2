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
| Auth                            | `@souped-tools/auth-nextjs` — gated by `config.matcher` in `src/proxy.ts` |
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
│   │   ├── wireframe/    ← Wf* blocks (default Souped look) + SoupedLogo
│   │   └── ui/           ← shadcn components — DO NOT edit, regenerate via CLI
│   ├── generated/        ← Prisma client — gitignored, auto-generated
│   ├── hooks/            ← custom React hooks
│   ├── lib/
│   │   ├── db.ts         ← PrismaClient singleton — always import from here
│   │   └── utils.ts      ← shadcn cn() helper
│   ├── proxy.ts          ← Next 16 proxy (auth gate — populate `config.matcher` to enable)
│   └── types/
│       └── index.ts      ← shared types barrel
└── vitest.config.ts
```

---

## Enabling auth

Auth is wired but **inactive by default**. The boilerplate ships with the SDK installed, the OAuth route handlers (`/api/auth/[...souped]`), and a proxy. The single switch is `config.matcher` in `src/proxy.ts` — with `matcher: []` (the default) the proxy doesn't run on any route, so everything is public. Populate `matcher` to start protecting routes.

**The recommended path:** don't wire auth by hand. Run the `souped-auth-scaffolder` agent — it enables auth on the Souped project, fills the env vars, adds the Prisma `User` model, the lazy-sync helper, RBAC helpers, login/logout UI, and populates `config.matcher` for the routes you want to protect. See the orchestrator skill (`/souped`) for the full flow.

**If you do want to wire it manually**, here's the minimum:

1. Create a Web App in the [Souped dashboard](https://build.souped.app), or use `glaze_get_project_auth_setup` over MCP. The MCP tool returns a ready-to-copy `.env` snippet — prefer it over copying values by hand.
2. Make sure auth is enabled on the project (`glaze_enable_project_auth(slug, enabled: true)`). New projects ship disabled.
3. Add the redirect URIs in Souped (`glaze_update_redirect_uris`):
   - `http://localhost:3000/api/auth/callback` (dev)
   - `https://yourapp.com/api/auth/callback` (prod)
4. In `.env.local`:
   ```env
   # Glaze auth API URL — value comes from `glaze_get_project_auth_setup`
   # (or the dashboard). Never the marketing site, never the dashboard host.
   SOUPED_URL=...
   SOUPED_CLIENT_ID=souped_client_xxx
   SOUPED_CLIENT_SECRET=souped_secret_xxx
   SOUPED_APP_ID=...                # Souped project UUID
   SOUPED_SESSION_SECRET=...        # openssl rand -base64 32
   ```
5. Edit `src/proxy.ts` and set `config.matcher` to the routes you want behind login. Examples:
   - **Specific routes:** `matcher: ["/admin/:path*", "/api/admin/:path*"]`
   - **Everything except static:** `matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]`
6. Restart the dev server.
7. In Vercel, mirror the same env vars for each environment (production, preview).

**Important — the loop trap:** if `matcher` covers every route, the OAuth callback (`/api/auth/callback`) is itself behind login, and the user ends up in a redirect loop. The SDK's proxy lets `/api/auth/*` through internally; just don't layer your own cookie/CSRF checks on top of it. When in doubt, protect specific routes, not everything.

**How the matcher works:** `src/proxy.ts` always wraps the handler with `withSoupedAuth`, but the proxy only runs on routes listed in `config.matcher` (Next.js constraint). Empty matcher = proxy never runs = everything public.

**Auth primitives available once routes are protected:**

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

- Use Tailwind utility classes. No inline styles except when you need a CSS variable value that can't be expressed as a utility (the `Wf*` components have a few examples).
- Souped brand tokens are in `src/app/globals.css` under `:root`:
  - `--souped-bg` (deep navy)
  - `--souped-ink` (warm white)
  - `--souped-accent` (orange `#FF6B35`)
  - `--souped-accent-alt`, `--souped-accent-warm`, `--souped-accent-blue`
  - `--souped-bg-elevated`, `--souped-bg-subtle`
- Use Souped tokens for **branded marketing** surfaces. Use shadcn tokens (`--primary`, `--background`, etc.) for **in-app** surfaces so dark mode and theme switches work.
- Do not edit `src/components/ui/*` by hand. Regenerate with `pnpm dlx shadcn@latest add <component>`.

### Default look: wireframe components

When the user asks for a new page or section and hasn't given visual direction ("agregame una página de pricing", "armá una vista para listar X"), reach for the wireframe components first. They are the Souped default look — navy + cyan + orange, framed boxes with `tag/desc` labels — and they ship with the boilerplate in `src/components/wireframe/`:

| Component | What it is |
|---|---|
| `WfSection` | Labeled outer box. Every page chunk goes inside one. Takes `tag` + `desc`. |
| `WfCard` | Title + body + action button. Use for feature grids, step lists, etc. |
| `WfButton` | `primary` (cyan fill) or default (cyan outline). |
| `WfPhoto` | Image placeholder with diagonal lines and an optional label. |
| `WfNav` | Top nav with the Souped logo and an `Auth: off` pill. |
| `WfLabelBar` | The `tag` + `desc` bar; used internally by `WfSection`, exposed for custom containers. |

```tsx
import { WfSection, WfCard, WfButton } from "@/components/wireframe";

<WfSection tag="pricing" desc="3-tier card grid.">
  <div className="grid grid-cols-3 gap-4">
    <WfCard title="Starter" body="..." action="Choose" />
    <WfCard title="Pro" body="..." action="Choose" />
    <WfCard title="Team" body="..." action="Contact us" />
  </div>
</WfSection>
```

Reuse the `wf-*` utility classes (`wf-card`, `wf-grid`, `wf-tag`, etc.) and the `bg-wf-cyan` / `text-wf-orange` / `border-wf-cyan/30` Tailwind colors for one-off elements that don't fit a component.

**When NOT to use them:** if the user has shared a design system, brand guidelines, mocks, or even just a clear visual direction ("hacelo minimalista en blanco y negro", "matchear con nuestra brand orange/black"), drop the wireframe look and build with shadcn/ui primitives + Tailwind. The wireframe is the *default*, not a mandate.

#### Preview chrome

`<WireframePreview>` wraps wireframe content in a sticky "Structure Preview" banner with a desktop/tablet/mobile switcher and a centered 1100-px-wide device frame. The boilerplate's `src/app/page.tsx` uses it by default so the landing arrives with that chrome out of the box.

```tsx
import { WireframePreview, WfSection, WfPhoto } from "@/components/wireframe";

export default function Page() {
  return (
    <WireframePreview>
      {(device) => (
        <WfSection tag="hero" desc="..." compact={device === "mobile"}>
          <WfPhoto height={device === "mobile" ? 200 : 340} />
        </WfSection>
      )}
    </WireframePreview>
  );
}
```

When **not** to use `<WireframePreview>`: any page that the user actually ships to end users (dashboards, app screens, post-launch landings). The banner labels the page as a preview and is not appropriate in production. For those cases, render `Wf*` blocks directly and constrain the width yourself — `<div className="wf-grid min-h-screen pb-16"><div className="mx-auto max-w-275">…</div></div>` is a reasonable default so the content doesn't stretch edge-to-edge on wide screens.

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
- **Forms** use `react-hook-form` + zod for anything non-trivial. For trivial forms, `useTransition` + a server action is enough — `src/actions/ping.ts` is the canonical example of the server action shape.
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
