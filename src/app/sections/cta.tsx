import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getCTABanner } from "@/lib/content";

export async function CTASection() {
  const cta = await getCTABanner();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-card border border-border rounded-2xl p-8 sm:p-12 text-center overflow-hidden">
          {/* Glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {cta.title}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              {cta.subtitle}
            </p>
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8"
              asChild
            >
              <a href={cta.buttonLink}>
                {cta.buttonText}
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
