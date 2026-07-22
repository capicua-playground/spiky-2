import { HeroSection } from "./sections/hero";
import { FeaturesSection } from "./sections/features";
import { HowItWorksSection } from "./sections/how-it-works";
import { TestimonialsSection } from "./sections/testimonials";
import { CTASection } from "./sections/cta";
import { FooterSection } from "./sections/footer";

export const metadata = {
  title: "spiky-2 — De principiante a desarrollador",
  description: "Sin atajos, sin frameworks de moda. Solo fundamentos sólidos y código que funciona.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
