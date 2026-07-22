import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Users, LucideIcon } from "lucide-react";
import { getFeatures } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Database,
  Users,
  Zap,
  Rocket,
  Terminal
};

// Fallback for dynamic icons
import { Zap, Rocket, Terminal } from "lucide-react";

export async function FeaturesSection() {
  const features = await getFeatures();

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Por qué <span className="text-primary">funciona</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No seguimos tendencias. Seguimos principios que han funcionado por décadas.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const IconComponent = iconMap[feature.icon] || Code;
            
            return (
              <Card 
                key={feature.id}
                className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
