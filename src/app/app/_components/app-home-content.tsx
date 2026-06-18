"use client";

import {
  WfButton,
  WfNav,
  WfSection,
  WireframePreview,
} from "@/components/wireframe";

type Device = "desktop" | "tablet" | "mobile";

function AppContent({ device, email }: { device: Device; email: string | null }) {
  const isMobile = device === "mobile";

  return (
    <div className="flex flex-col gap-2">
      <WfNav signedInAs={email ?? undefined} />

      <WfSection
        tag="app-home"
        desc="Authenticated landing inside /app. Replace this block with your real product UI."
        compact={isMobile}
      >
        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest text-white/35">App</p>
          <h1
            className="font-bold text-white leading-tight"
            style={{ fontSize: isMobile ? 24 : 32 }}
          >
            {email ? `Signed in as ${email}` : "Not signed in"}
          </h1>
          <p className="text-sm text-white/55 leading-relaxed max-w-xl">
            This is the authenticated app shell. Everything under{" "}
            <code className="font-mono text-wf-cyan">/app</code> is gated by{" "}
            <code className="font-mono text-wf-cyan">src/proxy.ts</code>. Build
            your product UI here — the wireframe styling is a starting point
            that the design step replaces.
          </p>
          {email && (
            <div className="mt-2 flex gap-2.5">
              <WfButton label="Sign out" href="/api/auth/logout" />
            </div>
          )}
        </div>
      </WfSection>
    </div>
  );
}

export function AppHomeContent({ email }: { email: string | null }) {
  return (
    <WireframePreview>
      {(device) => <AppContent device={device} email={email} />}
    </WireframePreview>
  );
}
