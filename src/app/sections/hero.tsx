import { TerminalCursor } from "@/components/ui/terminal-cursor";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";
import { getHeroContent } from "@/lib/content";

export async function HeroSection() {
  const hero = await getHeroContent();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Terminal indicator */}
        <div className="flex items-center justify-center gap-2 mb-8 text-muted-foreground">
          <Terminal className="w-4 h-4" />
          <span className="font-mono text-sm">~/spiky-2</span>
          <span className="text-primary">$</span>
          <span className="font-mono text-sm animate-pulse">_</span>
        </div>

        {/* Headline with terminal cursor */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="text-foreground">{hero.headline}</span>
          <TerminalCursor size="lg" className="ml-1 align-middle" />
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
            asChild
          >
            <a href={hero.ctaLink}>
              {hero.ctaText}
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-border hover:border-primary hover:text-primary"
            asChild
          >
            <a href="#how-it-works">Ver roadmap</a>
          </Button>
        </div>

        {/* Code snippet decoration */}
        <div className="mt-16 mx-auto max-w-lg">
          <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm text-left overflow-hidden">
            <div className="flex items-center gap-2 mb-3 text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-accent/60" />
              <div className="w-3 h-3 rounded-full bg-chart-3/60" />
              <span className="ml-2 text-xs">developer.js</span>
            </div>
            <pre className="text-muted-foreground">
              <span className="text-primary">const</span>{" "}
              <span className="text-foreground">developer</span> = {"{"}
              {"\n"}  <span className="text-foreground">mindset</span>:{" "}
              <span className="text-accent">&quot;problem-solver&quot;</span>,
              {"\n"}  <span className="text-foreground">focus</span>:{" "}
              <span className="text-accent">&quot;fundamentals&quot;</span>,
              {"\n"}  <span className="text-foreground">shortcut</span>:{" "}
              <span className="text-destructive">null</span>
              {"\n"}{"}"};
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
