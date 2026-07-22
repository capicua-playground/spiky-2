import { getSteps } from "@/lib/content";

export async function HowItWorksSection() {
  const steps = await getSteps();

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            El <span className="text-primary">camino</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Tres pasos. Nada más.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className="flex gap-6 items-start"
            >
              {/* Step number */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-mono text-xl font-bold text-primary">
                  {step.number}
                </div>
              </div>

              {/* Step content */}
              <div className="flex-1 pb-8 border-l border-border pl-6 -ml-6">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal-style summary */}
        <div className="mt-12 bg-card border border-border rounded-lg p-6 font-mono text-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <span className="text-primary">$</span>
            <span>spiky-2 roadmap</span>
          </div>
          <div className="space-y-1 text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-chart-3">✓</span>
              <span>Fundamentos dominados</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-chart-3">✓</span>
              <span>Proyectos construidos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-chart-3">✓</span>
              <span>Conocimiento compartido</span>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-accent">developer_ready=true</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
