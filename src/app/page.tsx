"use client";
import { useState } from "react";
import { SoupedLogo } from "@/components/landing/souped-logo";

type Device = "desktop" | "tablet" | "mobile";

// ─── Photo placeholder ────────────────────────────────────────────────────
function Photo({ height, label }: { height: number; label?: string }) {
  return (
    <div
      className="bp-card relative flex items-center justify-center overflow-hidden"
      style={{ height }}
    >
      <svg
        width="100%"
        height={height}
        className="absolute inset-0"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(126,200,227,0.30)" strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(126,200,227,0.30)" strokeWidth="1" />
      </svg>
      {label && (
        <span className="relative z-10 font-mono text-[9px] uppercase tracking-widest text-bp-cyan/30">
          {label}
        </span>
      )}
    </div>
  );
}

// ─── Label bar ────────────────────────────────────────────────────────────
function LabelBar({ tag, desc }: { tag: string; desc: string }) {
  return (
    <div className="bp-label-bar flex items-center gap-2.5 px-3.5 py-1.5">
      <span className="bp-tag font-mono text-[10px] font-bold uppercase tracking-wider text-bp-cyan px-1.5 py-0.5 shrink-0">
        {tag}
      </span>
      <span className="text-[11px] text-white/45 leading-snug">
        {desc}
      </span>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────
function Section({
  tag,
  desc,
  children,
  compact = false,
}: {
  tag: string;
  desc: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="bp-section">
      <LabelBar tag={tag} desc={desc} />
      <div className={compact ? "p-5" : "p-10"}>{children}</div>
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────
function Btn({ label, primary }: { label: string; primary?: boolean }) {
  return (
    <div className={`inline-block px-7 py-3 text-[13px] ${primary ? "bp-btn-primary" : "bp-btn-secondary"}`}>
      {label}
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────
function Card({ title, body, action }: { title: string; body: string; action: string }) {
  return (
    <div className="bp-card p-5">
      <p className="text-base font-semibold text-white mb-2">{title}</p>
      <p className="text-sm text-white/55 leading-relaxed mb-5">{body}</p>
      <Btn label={action} />
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────
function NavSection() {
  return (
    <div
      className="mx-2 mt-[3px] rounded-[5px] overflow-hidden border border-bp-cyan/30"
      style={{ background: "var(--bp-nav)" }}
    >
      <div className="flex items-center justify-between px-7 py-3.5">
        <div className="text-white">
          <SoupedLogo className="h-6 w-auto" />
        </div>
        <div className="px-3.5 py-1 border border-bp-cyan/30 rounded-full">
          <span className="text-[11px] text-white/35 uppercase tracking-wider">Auth: off</span>
        </div>
      </div>
    </div>
  );
}

// ─── Page content ─────────────────────────────────────────────────────────
function PageContent({ device }: { device: Device }) {
  const isMobile = device === "mobile";

  return (
    <div>
      <NavSection />

      <Section tag="hero" desc="Badge pill. Headline, subheadline, 2 CTAs." compact={isMobile}>
        <div className="inline-flex px-3.5 py-0.5 border border-bp-cyan/30 rounded-full mb-5">
          <span className="text-[11px] text-white/35 uppercase tracking-widest">Souped Boilerplate</span>
        </div>
        <h1
          className="font-bold text-white leading-[1.1] mb-3.5"
          style={{ fontSize: isMobile ? 32 : 50 }}
        >
          A Next.js starter, pre-seasoned with the Souped stack.
        </h1>
        <p className="text-lg text-white/55 leading-relaxed mb-7 max-w-[560px]">
          TypeScript, Tailwind v4, shadcn/ui, Prisma, and Souped auth — wired and ready.
          Set one env var to turn on login; leave it off to build freely.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <Btn label="Sign in with Souped" primary />
          <Btn label="Souped dashboard" />
        </div>
      </Section>

      <Section
        tag="features"
        desc="2-column card grid. Server action sample + API route sample."
        compact={isMobile}
      >
        <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
          <Card
            title="Sample server action"
            body="Type a name, submit, and a zod-validated server action replies. Copy the pattern from src/actions/ping.ts."
            action="Try it"
          />
          <Card
            title="Sample API route"
            body="A tiny GET handler at /api/health returns JSON. Source at src/app/api/health/route.ts."
            action="Open /api/health"
          />
        </div>
      </Section>

      <Section tag="quickstart" desc="4-step setup commands. Monospace code block." compact={isMobile}>
        <div className="bp-code-block p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/35 mb-3.5">
            Quickstart
          </div>
          {["pnpm install", "cp .env.example .env.local", "pnpm prisma migrate dev", "pnpm dev"].map(
            (line) => (
              <div key={line} className="flex items-center gap-2.5 mb-2">
                <span className="font-mono text-[11px] text-bp-cyan/50">$</span>
                <span className="font-mono text-[11px] text-white/65">{line}</span>
              </div>
            )
          )}
        </div>
      </Section>

      <div className="mx-2 mb-[3px] border border-bp-cyan/30 rounded-[5px] px-7 py-4">
        <span className="text-xs text-white/35">
          Built with the Souped stack. Read AGENTS.md before you start editing.
        </span>
      </div>
    </div>
  );
}

// ─── Top banner ───────────────────────────────────────────────────────────
function TopBanner({ device, setDevice }: { device: Device; setDevice: (d: Device) => void }) {
  return (
    <div className="bp-banner sticky top-0 z-50 flex items-center justify-between px-5 py-2.5 gap-2.5">
      <div className="flex items-center gap-3 overflow-hidden">
        <span className="w-1.5 h-1.5 rounded-full bg-bp-orange shrink-0" />
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-bp-orange shrink-0">
          Structure Preview
        </span>
      </div>
      <div className="flex gap-0.5 shrink-0 bg-black/25 rounded p-0.5">
        {(["desktop", "tablet", "mobile"] as Device[]).map((d) => (
          <button
            key={d}
            onClick={() => setDevice(d)}
            className="font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm border-none cursor-pointer transition-all duration-150"
            style={{
              background: device === d ? "var(--bp-orange)" : "transparent",
              color: device === d ? "#ffffff" : "rgba(255,255,255,0.4)",
            }}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Home page ────────────────────────────────────────────────────────────
export default function Home() {
  const [device, setDevice] = useState<Device>("desktop");

  const isDesktop = device === "desktop";
  const frameWidth = isDesktop ? 1100 : device === "tablet" ? 768 : 390;
  const frameRadius = isDesktop ? 0 : device === "mobile" ? 20 : 10;
  const statusBarH = device === "mobile" ? 44 : device === "tablet" ? 32 : 0;

  return (
    <div className="bp-grid min-h-screen">
      <TopBanner device={device} setDevice={setDevice} />

      <div
        className="flex justify-center"
        style={{
          padding: isDesktop ? "16px 0 60px" : "40px 24px 60px",
          transition: "padding 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          style={{
            width: frameWidth,
            flexShrink: 0,
            borderRadius: frameRadius,
            overflow: "hidden",
            border: isDesktop ? "2px solid transparent" : "2px solid rgba(140,190,255,0.4)",
            boxShadow: isDesktop ? "none" : "0 32px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1)",
            backgroundColor: "var(--bp-page)",
            transition: [
              "width 0.4s cubic-bezier(0.4,0,0.2,1)",
              "border-radius 0.4s cubic-bezier(0.4,0,0.2,1)",
              "border-color 0.4s cubic-bezier(0.4,0,0.2,1)",
              "box-shadow 0.4s cubic-bezier(0.4,0,0.2,1)",
            ].join(", "),
          }}
        >
          <div
            style={{
              background: "var(--bp-status)",
              height: statusBarH,
              overflow: "hidden",
              transition: "height 0.4s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
          <PageContent device={device} />
        </div>
      </div>
    </div>
  );
}
