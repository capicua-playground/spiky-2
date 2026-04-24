import Link from "next/link";
import { SoupedLogo } from "@/components/landing/souped-logo";
import { PingForm } from "@/components/landing/ping-form";

export default function Home() {
  const authEnabled = process.env.SOUPED_AUTH_ENABLED === "true";

  return (
    <div
      className="relative flex flex-1 flex-col overflow-hidden"
      style={{ backgroundColor: "var(--souped-bg)", color: "var(--souped-ink)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-20 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: "var(--souped-accent-alt)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: "var(--souped-accent-blue)" }}
      />

      <header className="relative z-10 flex items-center justify-between px-8 py-6 md:px-16">
        <SoupedLogo className="h-6 w-auto" />
        <nav className="flex items-center gap-4 text-sm">
          <span
            className="rounded-full border px-3 py-1 text-xs tracking-wide uppercase"
            style={{
              borderColor: authEnabled ? "var(--souped-accent)" : "rgba(255, 248, 240, 0.25)",
              color: authEnabled ? "var(--souped-accent)" : "rgba(255, 248, 240, 0.7)",
            }}
          >
            Auth: {authEnabled ? "enabled" : "off"}
          </span>
        </nav>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-8 py-16 md:px-16">
        <section className="flex flex-col gap-6">
          <span
            className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold tracking-widest uppercase"
            style={{
              borderColor: "rgba(255, 248, 240, 0.2)",
              color: "var(--souped-accent-warm)",
            }}
          >
            Souped Boilerplate
          </span>
          <h1 className="max-w-3xl text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
            A Next.js starter, pre-seasoned with the Souped stack.
          </h1>
          <p className="max-w-2xl text-lg text-[color:rgba(255,248,240,0.75)]">
            TypeScript, Tailwind v4, shadcn/ui, Prisma, and Souped auth — wired and ready. Set an
            env var to turn on login; leave it off to build freely.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/api/auth/login"
              className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition hover:opacity-90"
              style={{
                backgroundColor: "var(--souped-accent)",
                color: "var(--souped-bg)",
              }}
            >
              Try /api/auth/login
            </Link>
            <a
              href="https://souped.tools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm font-semibold transition hover:bg-white/5"
              style={{ borderColor: "rgba(255, 248, 240, 0.2)" }}
            >
              Souped dashboard
            </a>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article
            className="rounded-2xl border p-6"
            style={{
              borderColor: "rgba(255, 248, 240, 0.08)",
              backgroundColor: "var(--souped-bg-elevated)",
            }}
          >
            <h2 className="text-lg font-semibold">Sample server action</h2>
            <p className="mt-1 mb-4 text-sm text-[color:rgba(255,248,240,0.65)]">
              Type a name, submit, and a zod-validated server action replies. Copy the pattern from{" "}
              <code>src/actions/ping.ts</code>.
            </p>
            <PingForm />
          </article>

          <article
            className="rounded-2xl border p-6"
            style={{
              borderColor: "rgba(255, 248, 240, 0.08)",
              backgroundColor: "var(--souped-bg-elevated)",
            }}
          >
            <h2 className="text-lg font-semibold">Sample API route</h2>
            <p className="mt-1 mb-4 text-sm text-[color:rgba(255,248,240,0.65)]">
              A tiny GET handler at <code>/api/health</code> returns JSON. The source lives at{" "}
              <code>src/app/api/health/route.ts</code>.
            </p>
            <a
              href="/api/health"
              className="inline-flex h-10 items-center justify-center rounded-full border px-4 text-xs font-semibold transition hover:bg-white/5"
              style={{ borderColor: "rgba(255, 248, 240, 0.2)" }}
            >
              Open /api/health
            </a>
          </article>
        </section>

        <section
          className="rounded-2xl border p-6 font-mono text-sm leading-relaxed"
          style={{
            borderColor: "rgba(255, 248, 240, 0.08)",
            backgroundColor: "var(--souped-bg-subtle)",
            color: "rgba(255, 248, 240, 0.8)",
          }}
        >
          <div className="mb-3 text-xs tracking-widest uppercase opacity-70">Quickstart</div>
          <pre className="whitespace-pre-wrap">
            {`pnpm install
cp .env.example .env.local   # fill DATABASE_URL
pnpm prisma migrate dev      # once your DB is up
pnpm dev                     # visit http://localhost:3000`}
          </pre>
        </section>
      </main>

      <footer
        className="relative z-10 px-8 py-6 text-xs md:px-16"
        style={{ color: "rgba(255, 248, 240, 0.45)" }}
      >
        Built with the Souped stack. Read <code>AGENTS.md</code> before you start editing.
      </footer>
    </div>
  );
}
