import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/auth";

export default async function AppHome() {
  const session = await getCurrentSession();

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-8 px-6 py-16">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            App
          </p>
          <h1 className="mt-1 text-2xl font-semibold">
            {session ? `Signed in as ${session.email}` : "Not signed in"}
          </h1>
        </div>
        {session && (
          <Button asChild variant="outline" size="sm">
            <Link href="/api/auth/logout">Sign out</Link>
          </Button>
        )}
      </header>

      <section className="rounded-lg border border-dashed border-border bg-card p-8">
        <h2 className="text-lg font-medium">Build your app here</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This is the authenticated home. Anything under{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">/app</code>{" "}
          requires a Souped session — the proxy in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            src/proxy.ts
          </code>{" "}
          enforces it. Replace this page with your real product UI.
        </p>
      </section>

      <Button asChild variant="ghost" size="sm" className="self-start">
        <Link href="/">← Back to landing</Link>
      </Button>
    </main>
  );
}
