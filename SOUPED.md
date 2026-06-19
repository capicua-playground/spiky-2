# SOUPED.md

This file tracks every decision made on this project regarding the Souped suite (auth, design, Chalk, Carte, Spark, deploy).

## USE IT AS A GUIDE, NOT AS GROUND TRUTH

It speeds up agents by pointing at what was done previously and where to look. But it can drift: someone may have changed signup restrictions, added a Chalk table, or rotated a Vercel domain outside of the orchestrator's flow.

**Rules for ANY agent or skill in the `souped` plugin:**

1. **Read this file at the start of every session** for orientation about prior decisions.
2. **Before acting on a specific value from this file, verify it against the real source** — the Souped MCP, the codebase, or the database — using the appropriate tool. Example: if this file says signup restriction is `open` and you need that value to do something, call the Glaze MCP and confirm. **Do not assume.**
3. **If verification reveals a mismatch:** first corroborate the new value with a second source (a different MCP call, a code read) so you're confident it's real, then update the relevant section of this file **in the same change as your action**, and append a one-line Decisions-log entry noting what was stale.
4. **Update the relevant section of this file whenever you perform a Souped operation**, in the same change as the operation itself.

---

## Project meta

- **Name:** {{PROJECT_NAME}}
- **SOUPED.md created on:** {{CREATED_DATE}}
- **Repo URL:** {{REPO_URL}}
- **Souped project ID:** _pending — fill when the Souped project is created_
- **Workspace slug:** _pending_
- **Vercel project / URL:** _pending — fill on first deploy_
- **Primary domain:** _pending_

---

## Auth

_pending — will be filled on the first auth-related action (orchestrator step that captures `auth_scope`, `souped-auth-scaffolder` run, or Glaze MCP configuration call)._

When filled, this section should describe:

- `auth_scope`: `global` / `specific` / `none`
- `protected_routes`: list of route patterns enforced by `src/proxy.ts`
- DB-backed `User` model: yes/no (cross-link to `prisma/schema.prisma`)
- Roles defined (if any) and where they're enforced
- Allowlists: allowed emails / allowed domains (names only — no secrets)

---

## Design

_pending — will be filled when `souped-design` runs or when `docs/design/design-contract.md` is produced._

When filled, this section should include:

- One-paragraph summary (direction, palette name, type system, motion vibe)
- Link to `docs/design/design-contract.md` (do not duplicate the contract here)

---

## Chalk

_pending — will be filled when the first table is registered via `chalk_register_table`._

When filled, list each registered table with:

- Table name
- Purpose (e.g., "homepage hero copy", "FAQ items", "product catalog")
- Which app surfaces consume it

---

## Carte

_pending — will be filled when the first page is registered via `carte_upsert_page`._

When filled, list:

- Each registered page (path + title)
- Sections intentionally marked `noindex` and why

---

## Spark

_pending — will be filled when Vercel / DB / domain resources are provisioned via Spark._

When filled, list:

- Vercel project name + environments configured
- Database (provider + size)
- Domain status (purchased, assigned, DNS state)
- Critical env-var **names** (never values)
- Most recent deploy timestamp + URL

---

## Decisions log

Append one line per change. Format: `YYYY-MM-DD — short title — 1–3 sentence rationale`.

- {{CREATED_DATE}} — SOUPED.md initialized from boilerplate — will track Souped-suite decisions from this point forward.
