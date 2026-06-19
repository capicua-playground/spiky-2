# SOUPED.md

This file tracks every decision made on this project regarding the Souped suite — any tool, skill, or agent under the `souped` plugin (auth, design, Chalk, Carte, Spark, Shelf, Fond, and anything added later).

## USE IT AS A GUIDE, NOT AS GROUND TRUTH

It speeds up agents by pointing at what was done previously and where to look. But it can drift: someone may have changed signup restrictions, added a Chalk table, or rotated a Vercel domain outside of the orchestrator's flow.

**Rules for ANY agent or skill in the `souped` plugin:**

1. **Read this file at the start of every session** for orientation about prior decisions.
2. **Before acting on a specific value, verify it against the real source** — the appropriate Souped MCP tool, the codebase, or the database. Example: if a recent entry says signup restriction is `open` and you need that value to do something, call the Glaze MCP and confirm. **Do not assume.**
3. **If verification reveals a mismatch:** corroborate the new value with a second source so you're confident it's real, then append a `drift detected` entry to the log (see format below) **in the same change as your action**.
4. **After ANY Souped operation, append one entry to the Decisions log below.** This is the only structured place you record what happened — there are no per-subsystem sections to fill in. The log itself is the project's memory.

---

## Project meta

- **Name:** {{PROJECT_NAME}}
- **SOUPED.md created on:** {{CREATED_DATE}}
- **Repo URL:** {{REPO_URL}}
- **Souped project ID:** _pending — fill when the Souped project is created_
- **Workspace slug:** _pending_

Anything else (Vercel project, primary domain, current auth scope, registered Chalk tables, Carte pages, Shelf buckets, design contract location, env-var names, etc.) lives in the Decisions log. Don't carve out subsystem sections here — let the log be the single timeline.

---

## Decisions log

Append-only. Newest entries at the bottom. One entry per Souped operation.

**Format:**

```
YYYY-MM-DD — <tool-or-subsystem> — <short title>
<1–3 sentences explaining what happened and why. Mention values an agent might
want to verify later (route patterns, table names, role names, domain, env
var names — never values).>
```

**Examples** (illustrative — replace with real entries as the project evolves):

```
2026-06-19 — scaffolder — initial scaffold
Cloned from souped-boilerplate. Stack: Next.js 16 + Prisma 7 + Souped auth.

2026-06-19 — souped-mcp — Souped project created
Project ID abc123 in workspace acme. Audience: webapp:abc123.

2026-06-19 — auth-scaffolder — DB-backed users wired
auth_scope=global (matcher unchanged). Added Prisma User model with roles
enum [admin, member]. requireRole helper in src/lib/auth.ts.

2026-06-19 — chalk — registered 'faqs' table
Collection of FAQ items. Consumed by /about page (FaqList component).
Editable from Souped → Chalk.

2026-06-19 — carte — registered '/' SEO entry
Public landing. Robots: index. OG image at /og/landing.png.

2026-06-19 — spark — first deploy
Vercel project: acme-app. URL: https://acme-app.vercel.app. Env vars set:
DATABASE_URL, SOUPED_CLIENT_ID, SOUPED_CLIENT_SECRET, SOUPED_SESSION_SECRET.

2026-06-19 — drift detected — signup restriction
SOUPED.md log implied 'open' (no prior entry stating otherwise). Glaze MCP
returned 'domain-allowlist' (acme.com). Confirmed via dashboard. Logging
correction so future sessions see the current state.
```

### Entries

- {{CREATED_DATE}} — meta — SOUPED.md initialized from boilerplate. Will track every Souped-suite decision on this project from now on.
