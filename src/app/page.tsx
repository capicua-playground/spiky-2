"use client";
import { useState } from "react";
import { SoupedLogo } from "@/components/landing/souped-logo";

// ─── Color tokens (from wireframe-style.md) ───────────────────────────────
const C = {
  pageBg:    "#00214d",
  navy:      "#0d2060",
  navyMid:   "#142878",
  navBar:    "#002b63",
  statusBar: "#002255",
  cyan:      "#7ec8e3",
  cyanDim:   "rgba(126,200,227,0.30)",
  cyanFaint: "rgba(126,200,227,0.10)",
  white:     "#ffffff",
  dim:       "rgba(255,255,255,0.55)",
  muted:     "rgba(255,255,255,0.35)",
  orange:    "#FF6B35",
};

// Two-layer grid: 100px major + 20px minor
const GRID_IMAGE = `
  linear-gradient(rgba(100,160,255,0.14) 1px, transparent 1px),
  linear-gradient(90deg, rgba(100,160,255,0.14) 1px, transparent 1px),
  linear-gradient(rgba(100,160,255,0.05) 1px, transparent 1px),
  linear-gradient(90deg, rgba(100,160,255,0.05) 1px, transparent 1px)
`;
const GRID_SIZE = "100px 100px, 100px 100px, 20px 20px, 20px 20px";

type Device = "desktop" | "tablet" | "mobile";

// ─── Photo placeholder ────────────────────────────────────────────────────
function Photo({ height, label }: { height: number; label?: string }) {
  return (
    <div
      style={{
        height,
        background: C.cyanFaint,
        border: `1px solid ${C.cyanDim}`,
        borderRadius: 4,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="100%"
        height={height}
        style={{ position: "absolute", inset: 0 }}
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="100%" y2="100%" stroke={C.cyanDim} strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke={C.cyanDim} strokeWidth="1" />
      </svg>
      {label && (
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 9,
            letterSpacing: "0.12em",
            color: C.cyanDim,
            position: "relative",
            zIndex: 1,
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

// ─── Label bar ────────────────────────────────────────────────────────────
function LabelBar({ tag, desc }: { tag: string; desc: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "7px 14px",
        borderBottom: `1px solid ${C.cyanDim}`,
        background: "rgba(126,200,227,0.06)",
      }}
    >
      <span
        style={{
          fontFamily: '"JetBrains Mono", "Courier New", monospace',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.12em",
          color: C.cyan,
          textTransform: "uppercase",
          background: "rgba(126,200,227,0.12)",
          border: `1px solid ${C.cyanDim}`,
          borderRadius: 3,
          padding: "2px 7px",
          flexShrink: 0,
        }}
      >
        {tag}
      </span>
      <span
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 11,
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.4,
        }}
      >
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
  pad = "40px 40px",
}: {
  tag: string;
  desc: string;
  children: React.ReactNode;
  pad?: string;
}) {
  return (
    <div
      style={{
        background: "transparent",
        margin: "3px 8px",
        border: `1px solid ${C.cyanDim}`,
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      <LabelBar tag={tag} desc={desc} />
      <div style={{ padding: pad }}>{children}</div>
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────
function Btn({ label, primary }: { label: string; primary?: boolean }) {
  return (
    <div
      style={
        primary
          ? {
              display: "inline-block",
              background: C.cyan,
              color: C.navy,
              padding: "11px 28px",
              borderRadius: 4,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.03em",
              cursor: "default",
            }
          : {
              display: "inline-block",
              background: "transparent",
              border: `1.5px solid ${C.cyanDim}`,
              color: C.cyan,
              padding: "10px 24px",
              borderRadius: 4,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 13,
              fontWeight: 400,
              cursor: "default",
            }
      }
    >
      {label}
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────
function Card({ title, body, action }: { title: string; body: string; action: string }) {
  return (
    <div
      style={{
        background: C.cyanFaint,
        border: `1px solid ${C.cyanDim}`,
        borderRadius: 6,
        padding: "22px 20px",
      }}
    >
      <p
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 16,
          fontWeight: 600,
          color: C.white,
          margin: 0,
          marginBottom: 8,
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 14,
          color: C.dim,
          margin: 0,
          marginBottom: 20,
          lineHeight: 1.6,
        }}
      >
        {body}
      </p>
      <Btn label={action} />
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────
function NavSection() {
  return (
    <div
      style={{
        margin: "3px 8px",
        border: `1px solid ${C.cyanDim}`,
        borderRadius: 5,
        overflow: "hidden",
        background: C.navBar,
      }}
    >
      <div
        style={{
          padding: "14px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ color: C.white }}>
          <SoupedLogo className="h-6 w-auto" />
        </div>
        <div
          style={{
            padding: "4px 14px",
            border: `1px solid ${C.cyanDim}`,
            borderRadius: 99,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 11,
              color: C.muted,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Auth: off
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Page content ─────────────────────────────────────────────────────────
function PageContent({ device }: { device: Device }) {
  const isMobile = device === "mobile";
  const innerPad = isMobile ? "24px 20px" : "40px 40px";

  return (
    <div>
      <NavSection />

      <Section tag="hero" desc="Badge pill. Headline, subheadline, 2 CTAs." pad={innerPad}>
        <div
          style={{
            display: "inline-flex",
            padding: "3px 14px",
            border: `1px solid ${C.cyanDim}`,
            borderRadius: 99,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 11,
              color: C.muted,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Souped Boilerplate
          </span>
        </div>
        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: isMobile ? 32 : 50,
            fontWeight: 700,
            color: C.white,
            lineHeight: 1.1,
            margin: 0,
            marginBottom: 14,
          }}
        >
          A Next.js starter, pre-seasoned with the Souped stack.
        </h1>
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 18,
            fontWeight: 400,
            color: C.dim,
            lineHeight: 1.5,
            margin: 0,
            marginBottom: 28,
            maxWidth: 560,
          }}
        >
          TypeScript, Tailwind v4, shadcn/ui, Prisma, and Souped auth — wired and ready.
          Set one env var to turn on login; leave it off to build freely.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <Btn label="Sign in with Souped" primary />
          <Btn label="Souped dashboard" />
        </div>
      </Section>

      <Section
        tag="features"
        desc="2-column card grid. Server action sample + API route sample."
        pad={innerPad}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 16,
          }}
        >
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

      <Section tag="quickstart" desc="4-step setup commands. Monospace code block." pad={innerPad}>
        <div
          style={{
            background: C.cyanFaint,
            border: `1px solid ${C.cyanDim}`,
            borderRadius: 6,
            padding: "20px 22px",
          }}
        >
          <div
            style={{
              fontFamily: '"JetBrains Mono", "Courier New", monospace',
              fontSize: 10,
              letterSpacing: "0.15em",
              color: C.muted,
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Quickstart
          </div>
          {["pnpm install", "cp .env.example .env.local", "pnpm prisma migrate dev", "pnpm dev"].map(
            (line) => (
              <div
                key={line}
                style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}
              >
                <span
                  style={{
                    fontFamily: '"JetBrains Mono", "Courier New", monospace',
                    fontSize: 11,
                    color: C.cyan,
                    opacity: 0.5,
                  }}
                >
                  $
                </span>
                <span
                  style={{
                    fontFamily: '"JetBrains Mono", "Courier New", monospace',
                    fontSize: 11,
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  {line}
                </span>
              </div>
            )
          )}
        </div>
      </Section>

      <div
        style={{
          margin: "3px 8px",
          border: `1px solid ${C.cyanDim}`,
          borderRadius: 5,
          padding: "16px 28px",
        }}
      >
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 12,
            color: C.muted,
          }}
        >
          Built with the Souped stack. Read AGENTS.md before you start editing.
        </span>
      </div>
    </div>
  );
}

// ─── Top banner ───────────────────────────────────────────────────────────
function TopBanner({ device, setDevice }: { device: Device; setDevice: (d: Device) => void }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "linear-gradient(to right, #080025 30%, #FF6B35 100%)",
        borderBottom: "1px solid rgba(255,107,53,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "9px 20px",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, overflow: "hidden" }}>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: C.orange,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: '"JetBrains Mono", "Fira Mono", monospace',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: C.orange,
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          Structure Preview
        </span>
      </div>
      <div
        style={{
          display: "flex",
          gap: 2,
          flexShrink: 0,
          background: "rgba(0,0,0,0.25)",
          borderRadius: 4,
          padding: 2,
        }}
      >
        {(["desktop", "tablet", "mobile"] as Device[]).map((d) => (
          <button
            key={d}
            onClick={() => setDevice(d)}
            style={{
              fontFamily: '"JetBrains Mono", "Fira Mono", monospace',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "4px 12px",
              borderRadius: 3,
              border: "none",
              cursor: "pointer",
              background: device === d ? C.orange : "transparent",
              color: device === d ? "#ffffff" : "rgba(255,255,255,0.4)",
              transition: "all 0.15s",
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
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: C.pageBg,
        backgroundImage: GRID_IMAGE,
        backgroundSize: GRID_SIZE,
      }}
    >
      <TopBanner device={device} setDevice={setDevice} />

      {/* Centering wrapper */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: isDesktop ? "16px 0 60px" : "40px 24px 60px",
          transition: "padding 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Animated device frame */}
        <div
          style={{
            width: frameWidth,
            flexShrink: 0,
            borderRadius: frameRadius,
            overflow: "hidden",
            border: isDesktop ? "2px solid transparent" : "2px solid rgba(140,190,255,0.4)",
            boxShadow: isDesktop
              ? "none"
              : "0 32px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1)",
            backgroundColor: C.pageBg,
            transition: [
              "width 0.4s cubic-bezier(0.4,0,0.2,1)",
              "border-radius 0.4s cubic-bezier(0.4,0,0.2,1)",
              "border-color 0.4s cubic-bezier(0.4,0,0.2,1)",
              "box-shadow 0.4s cubic-bezier(0.4,0,0.2,1)",
            ].join(", "),
          }}
        >
          {/* Status bar — animates height */}
          <div
            style={{
              background: C.statusBar,
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
