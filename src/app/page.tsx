import {
  WfButton,
  WfCard,
  WfNav,
  WfPhoto,
  WfSection,
} from "@/components/wireframe";

export default function Home() {
  return (
    <div className="wf-grid min-h-screen pb-16">
      <WfNav />

      <WfSection
        tag="hero"
        desc="Badge pill. Headline, subheadline, 2 CTAs. Side-by-side image."
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-center">
          <div className="flex-1 min-w-0">
            <div className="inline-flex px-3.5 py-0.5 border border-wf-cyan/30 rounded-full mb-5">
              <span className="text-[11px] text-white/35 uppercase tracking-widest">
                Souped Boilerplate
              </span>
            </div>
            <h1 className="font-bold text-white leading-[1.1] mb-3.5 text-[32px] md:text-[50px]">
              Skip the setup.
              <br />
              Start building.
            </h1>
            <p className="text-lg text-white/55 leading-relaxed mb-7">
              Full stack, zero config. Auth is one env var away.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <WfButton label="Sign in with Souped" primary />
              <WfButton label="Souped dashboard" />
            </div>
          </div>
          <div className="w-full md:w-[45%] md:shrink-0">
            <WfPhoto height={340} label="hero image" />
          </div>
        </div>
      </WfSection>

      <WfSection
        tag="features"
        desc="2-column card grid. Server action sample + API route sample."
      >
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <WfCard
            title="Server actions, ready to go"
            body="Zod-validated, typed end-to-end. Drop your logic into src/actions/ and ship."
            action="Try it"
          />
          <WfCard
            title="API routes, zero setup"
            body="A /api/health endpoint ships out of the box. Add yours in src/app/api/."
            action="Open /api/health"
          />
        </div>
      </WfSection>

      <WfSection tag="quickstart" desc="4-step setup. Each step is a card.">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
          {[
            { step: "01", cmd: "pnpm install", desc: "Install dependencies and generate the Prisma client" },
            { step: "02", cmd: "cp .env.example .env.local", desc: "Copy the env template and fill in your DATABASE_URL" },
            { step: "03", cmd: "pnpm prisma migrate dev", desc: "Run migrations once your database is up" },
            { step: "04", cmd: "pnpm dev", desc: "Start the dev server at localhost:3000" },
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
