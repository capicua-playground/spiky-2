import Link from "next/link";
import { Button } from "@/components/ui/button";

// Placeholder landing shipped by the Souped boilerplate. Replace this
// page with your real marketing content as part of the design step (the
// `souped-design` → `vibedesign` flow generates one from your brand
// profile). Anything under `/app` is auth-gated by `src/proxy.ts`; this
// route stays public.
export default function Landing() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-4xl flex-col justify-center px-6 py-16">
      <div className="flex flex-col gap-6">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Souped boilerplate
        </p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          Replace this landing.
          <br />
          Then start building.
        </h1>
        <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
          This is a placeholder landing. Auth, database, and proxy are
          already wired — open <code className="font-mono">/app</code> to
          sign in and start the authenticated flow.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/app">Open the app</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a
              href="https://build.souped.app"
              target="_blank"
              rel="noreferrer"
            >
              Souped dashboard
            </a>
          </Button>
        </div>
      </div>

      <footer className="mt-24 text-xs text-muted-foreground">
        Built with the Souped stack. Read{" "}
        <code className="font-mono">AGENTS.md</code> before editing.
      </footer>
    </main>
  );
}
