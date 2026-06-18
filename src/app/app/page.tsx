import { WfNav, WfSection, WfButton } from "@/components/wireframe";
import { getCurrentSession } from "@/lib/auth";

export default async function AppHome() {
  const session = await getCurrentSession();

  return (
    // Same frame the public landing gets from <WireframePreview>: page
    // background + a centred 1100px container so the wireframe blocks have
    // the same gutters they were designed with. The proxy already guarantees
    // a session by the time this renders.
    <div className="wf-grid min-h-dvh">
      <div className="mx-auto flex max-w-275 flex-col gap-2 py-4">
        <WfNav signedInAs={session?.email ?? undefined} />

        <WfSection
          tag="app-home"
          desc="Authenticated landing inside /app. Replace this block with your real product UI."
        >
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest text-white/35">App</p>
            <h1 className="text-2xl font-bold text-white leading-tight">
              {session ? `Signed in as ${session.email}` : "Not signed in"}
            </h1>
            <p className="text-sm text-white/55 leading-relaxed max-w-xl">
              This is the authenticated app shell. Everything under{" "}
              <code className="font-mono text-wf-cyan">/app</code> is gated by{" "}
              <code className="font-mono text-wf-cyan">src/proxy.ts</code>. Build
              your product UI here — the wireframe styling is a starting point
              that the design step replaces.
            </p>
            {session && (
              <div className="mt-2 flex gap-2.5">
                <WfButton label="Sign out" href="/api/auth/logout" />
              </div>
            )}
          </div>
        </WfSection>
      </div>
    </div>
  );
}
