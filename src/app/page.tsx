"use client";

import {
  WfButton,
  WfNav,
  WfPhoto,
  WfPingForm,
  WfSection,
  WireframePreview,
} from "@/components/wireframe";

type Device = "desktop" | "tablet" | "mobile";

function LandingContent({ device }: { device: Device }) {
  const isMobile = device === "mobile";

  return (
    <div className="flex flex-col gap-2">
      <WfNav />

      <WfSection
        tag="hero"
        desc="Badge pill. Headline, subheadline, 2 CTAs. Side-by-side image."
        compact={isMobile}
      >
        <div className={`flex gap-10 ${isMobile ? "flex-col" : "flex-row items-center"}`}>
          <div className="flex-1 min-w-0">
            <div className="inline-flex px-3.5 py-0.5 border border-wf-cyan/30 rounded-full mb-5">
              <span className="text-[11px] text-white/35 uppercase tracking-widest">
                Souped Boilerplate
              </span>
            </div>
            <h1
              className="font-bold text-white leading-[1.1] mb-3.5"
              style={{ fontSize: isMobile ? 32 : 50 }}
            >
              Skip the setup.
              <br />
              Start building.
            </h1>
            <p className="text-lg text-white/55 leading-relaxed mb-7">
              Full stack, zero config. Auth wired in from day one.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <WfButton label="Open the app" primary href="/app" />
              <WfButton label="Souped dashboard" href="https://build.souped.app" />
            </div>
          </div>
          <div className={isMobile ? "w-full" : "w-[45%] shrink-0"}>
            <WfPhoto height={isMobile ? 200 : 340} label="hero image" />
          </div>
        </div>
      </WfSection>

      <WfSection
        tag="features"
        desc="2-column card grid. Server action sample + API route sample."
        compact={isMobile}
      >
        <div className={`grid gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
          <div className="wf-card p-5">
            <p className="text-lg font-bold text-white mb-2">Server actions, live demo</p>
            <p className="text-sm text-white/55 leading-relaxed mb-5">
              Zod-validated, typed end-to-end. The form below calls the
              <code className="font-mono text-wf-cyan mx-1">ping</code>
              action in <code className="font-mono text-wf-cyan">src/actions/ping.ts</code>.
            </p>
            <WfPingForm />
          </div>
          <div className="wf-card p-5 flex flex-col">
            <p className="text-lg font-bold text-white mb-2">API routes, zero setup</p>
            <p className="text-sm text-white/55 leading-relaxed mb-5">
              A <code className="font-mono text-wf-cyan">GET /api/health</code> ships
              out of the box. Add yours in <code className="font-mono text-wf-cyan">src/app/api/</code>.
            </p>
            <pre className="wf-card font-mono text-[11px] text-white/70 px-3 py-2 mb-5 overflow-x-auto leading-snug">
{`{
  "ok": true,
  "service": "souped-boilerplate",
  "timestamp": "..."
}`}
            </pre>
            <div className="mt-auto">
              <WfButton label="Open /api/health" href="/api/health" />
            </div>
          </div>
        </div>
      </WfSection>

      <WfSection tag="quickstart" desc="4-step setup. Each step is a card." compact={isMobile}>
        <div className={`grid gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-4"}`}>
          {[
            { step: "01", cmd: "pnpm install", desc: "Install dependencies and generate the Prisma client" },
            { step: "02", cmd: "cp .env.example .env.local", desc: "Copy the env template and fill DATABASE_URL plus the SOUPED_* values from glaze_get_project_auth_setup or the dashboard" },
            { step: "03", cmd: "pnpm prisma migrate dev", desc: "Run migrations once your database is up" },
            { step: "04", cmd: "pnpm dev", desc: "Start the dev server at localhost:3000 — open / for the landing, /app for the authenticated shell" },
          ].map(({ step, cmd, desc }) => (
            <div key={step} className="wf-card p-5 flex flex-col gap-3">
              <span className="font-mono text-[28px] font-bold text-wf-cyan/30 leading-none">
                {step}
              </span>
              <code className="font-mono text-[11px] text-wf-cyan bg-wf-cyan/10 border border-wf-cyan/20 rounded-[3px] px-2 py-1 w-fit">
                {cmd}
              </code>
              <p className="text-[12px] text-white/45 leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </WfSection>

      <div className="mx-2 mb-0.75 border border-wf-cyan/30 rounded-[5px] px-7 py-4">
        <span className="text-xs text-white/35">
          Built with the Souped stack. Read AGENTS.md before you start editing.
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <WireframePreview>{(device) => <LandingContent device={device} />}</WireframePreview>
  );
}
