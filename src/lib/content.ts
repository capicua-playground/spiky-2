/**
 * Content fetching functions for Chalk-registered tables
 * These return hardcoded defaults when DB is unavailable (build time)
 * and real data at runtime
 */

// Types based on Prisma schema
export interface HeroContent {
  id: string;
  headline: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
  isActive: boolean;
}

export interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
  order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatarUrl: string | null;
  order: number;
  isActive: boolean;
}

export interface CTABanner {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

// Default content (used when DB unavailable)
const defaultHero: HeroContent = {
  id: "default",
  headline: "De principiante a desarrollador. El camino real.",
  subtitle: "Sin atajos, sin frameworks de moda. Solo fundamentos sólidos y código que funciona.",
  ctaText: "Empezar ahora",
  ctaLink: "#features"
};

const defaultFeatures: Feature[] = [
  {
    id: "1",
    icon: "Code",
    title: "Fundamentos sólidos",
    description: "Aprende los conceptos que no cambian, independientemente del framework de turno.",
    order: 0,
    isActive: true
  },
  {
    id: "2",
    icon: "Database",
    title: "Pensamiento estructurado",
    description: "Desarrolla la capacidad de descomponer problemas complejos en soluciones elegantes.",
    order: 1,
    isActive: true
  },
  {
    id: "3",
    icon: "Users",
    title: "Comunidad real",
    description: "Conecta con otros desarrolladores que valoran el aprendizaje profundo sobre los atajos.",
    order: 2,
    isActive: true
  }
];

const defaultSteps: Step[] = [
  {
    id: "1",
    number: 1,
    title: "Domina los conceptos",
    description: "Algoritmos, estructuras de datos, y patrones de diseño que son universales.",
    order: 0
  },
  {
    id: "2",
    number: 2,
    title: "Construye proyectos",
    description: "Aplica lo aprendido en proyectos reales que demuestren tu comprensión.",
    order: 1
  },
  {
    id: "3",
    number: 3,
    title: "Comparte tu conocimiento",
    description: "Enseña lo que sabes. La mejor forma de dominar algo es explicarlo a otros.",
    order: 2
  }
];

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Esta comunidad me ayudó a entender que ser desarrollador es sobre resolver problemas, no memorizar sintaxis.",
    author: "Alex Chen",
    role: "Backend Developer",
    avatarUrl: null,
    order: 0,
    isActive: true
  },
  {
    id: "2",
    quote: "Dejé de saltar de tutorial en tutorial. Finalmente entiendo por qué las cosas funcionan como funcionan.",
    author: "María García",
    role: "Full Stack Developer",
    avatarUrl: null,
    order: 1,
    isActive: true
  }
];

const defaultCTA: CTABanner = {
  id: "default",
  title: "¿Listo para empezar tu camino?",
  subtitle: "Únete a miles de desarrolladores que aprenden con nosotros.",
  buttonText: "Unirse ahora",
  buttonLink: "#"
};

// Fetch functions — try DB first, fall back to defaults
export async function getHeroContent(): Promise<HeroContent> {
  try {
    // Dynamic import to avoid issues if Prisma client isn't generated
    const { db } = await import("./db");
    const hero = await db.heroContent.findFirst();
    return hero || defaultHero;
  } catch {
    return defaultHero;
  }
}

export async function getFeatures(): Promise<Feature[]> {
  try {
    const { db } = await import("./db");
    const features = await db.feature.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" }
    });
    return features.length > 0 ? features : defaultFeatures;
  } catch {
    return defaultFeatures;
  }
}

export async function getSteps(): Promise<Step[]> {
  try {
    const { db } = await import("./db");
    const steps = await db.step.findMany({
      orderBy: { order: "asc" }
    });
    return steps.length > 0 ? steps : defaultSteps;
  } catch {
    return defaultSteps;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { db } = await import("./db");
    const testimonials = await db.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" }
    });
    return testimonials.length > 0 ? testimonials : defaultTestimonials;
  } catch {
    return defaultTestimonials;
  }
}

export async function getCTABanner(): Promise<CTABanner> {
  try {
    const { db } = await import("./db");
    const cta = await db.cTABanner.findFirst();
    return cta || defaultCTA;
  } catch {
    return defaultCTA;
  }
}
