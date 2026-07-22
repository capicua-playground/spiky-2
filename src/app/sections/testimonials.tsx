import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { getTestimonials } from "@/lib/content";

export async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Lo que dicen <span className="text-primary">nuestros devs</span>
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id}
              className="bg-card border-border"
            >
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary/40 mb-4" />
                <p className="text-foreground text-lg leading-relaxed mb-6">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  {testimonial.avatarUrl ? (
                    <img 
                      src={testimonial.avatarUrl} 
                      alt={testimonial.author}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
