---
project: spiky-2
generated: 2026-07-22
mode: generate
frontend_direction: terminal
unforgettable_thing: "El cursor blinker animado en los headers que simula una terminal, pero con tipografía editorial que eleva el tono de 'hacker' a 'profesional técnico'"
brand_archetype: creator
accessibility_target: WCAG 2.2 AA
wcag_audit: docs/design/audits/wcag.md
colorblind_audit: docs/design/audits/colorblind.md
---

# Design Contract — spiky-2

Landing page sobre ser desarrollador de software. Público: aspirantes y devs junior. 
Editable vía Chalk para cambiar secciones sin tocar código.

## §1. Design Tokens

### Colors (from atomic-color-palette §4)

```yaml
tokens:
  light:
    background: '#0a0a0f'         # from terminal direction — pure dark terminal
    foreground: '#e8e8ed'         # off-white for reduced eye strain
    primary: '#00d4ff'            # cyan terminal accent
    primary-foreground: '#0a0a0f'
    secondary: '#1a1a2e'          # surface elevation
    secondary-foreground: '#e8e8ed'
    muted: '#2d2d3a'
    muted-foreground: '#8a8a9a'
    accent: '#ffb800'             # amber for highlights/CTAs
    accent-foreground: '#0a0a0f'
    destructive: '#ff4757'
    border: '#2d2d3a'
    ring: '#00d4ff'
    
  semantic:
    success: '#22c55e'            # green terminal OK
    warning: '#ffb800'            # amber warning
    info: '#00d4ff'               # cyan info
    
  micro_emotions:
    calm: '#1a1a2e'               # trust moment
    celebrate: '#22c55e'          # success moment
    urgency: '#ff4757'            # error moment
```

**Note:** Single-theme (dark) by design. Terminal aesthetic with editorial typography.

### Typography (from atomic-typography §3)

```yaml
fonts:
  display: 'Space Grotesk'        # geometric, tech-forward but refined
  body: 'Inter'                   # readable for long content
  mono: 'JetBrains Mono'          # terminal/code authenticity

scale:
  base: 16px
  xs: '0.75rem'    # 12px
  sm: '0.875rem'   # 14px
  base: '1rem'     # 16px
  lg: '1.125rem'   # 18px
  xl: '1.25rem'    # 20px
  2xl: '1.5rem'    # 24px
  3xl: '1.875rem'  # 30px
  4xl: '2.25rem'   # 36px
  5xl: '3rem'       # 48px
  6xl: '3.75rem'   # 60px

weights:
  regular: 400
  medium: 500
  semibold: 600
  bold: 700

leading:
  tight: 1.2
  normal: 1.6
  relaxed: 1.8
```

### Spacing

```yaml
spacing:
  scale: 4px
  values: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128]
  
breakpoints:
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
  2xl: 1536px
```

### Motion

```yaml
motion:
  micro_durations: { fast: '120ms', normal: '200ms', slow: '300ms' }
  easings: { default: 'cubic-bezier(0.4, 0, 0.2, 1)', bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
  
  # Cursor blink effect
  cursor_blink: '1s steps(1) infinite'
  
  # Terminal typing reveal
  typing: 'steps(20, end)'
```

## §2. Component Inventory

### Atoms (from shadcn/ui defaults)
- Button: ghost/outline variants with terminal glow on hover
- Card: minimal border, subtle glow
- Input: terminal style with cursor indicator

### Organisms

**HeroSection**
- Large headline with animated cursor
- Subtitle with typing effect
- CTA buttons (primary=accent, secondary=ghost)

**FeatureGrid**
- 3-column layout (lg), 2 (md), 1 (sm)
- Icon + title + description cards
- Terminal code snippets optional

**TestimonialSection**
- Quote with attribution
- Avatar or fallback icon

**CTASection**
- Full-width banner
- Clear value proposition
- Primary action

### Product Tree

```
app/
└── page.tsx                    → Landing single-page
    ├── Hero                    → [headline, subtitle, CTAs]
    ├── Features                → [3 feature cards]
    ├── HowItWorks              → [3 step process]
    ├── Testimonials            → [2 testimonial quotes]
    └── CTA                     → [final conversion]
```

## §3. Responsive Strategy

```yaml
strategy: mobile-first

column_behavior:
  sm: 1 column, stacked vertical
  md: 2 columns where applicable
  lg: 3 columns for features, 2 for testimonials

typography_scale:
  sm: headline -1 scale (5xl→4xl), body same
  lg: headline +0, relaxed leading

touch_targets:
  buttons: min 44x44px
  spacing: 16px minimum between tappable areas

navigation:
  sm: sticky bottom bar or hidden
  md+: sticky top
```

## §4. Interaction States

```yaml
button:
  default: { bg: transparent, border: '1px solid primary', color: primary }
  hover: { bg: primary/10, glow: '0 0 20px primary/50' }
  active: { bg: primary/20 }
  focus: { ring: '2px primary', offset: 2 }
  disabled: { opacity: 0.5, cursor: not-allowed }

card:
  default: { border: '1px solid border' }
  hover: { border: '1px solid primary/50', shadow: '0 0 30px primary/10' }

link:
  default: { color: primary }
  hover: { underline: true, color: accent }
```

## §5. Content Design Patterns

```yaml
voice:
  tone: Profesional pero accesible. Directo, sin buzzwords.
  principles:
    - "Construye" en lugar de "Leverage"
    - "Aprende" en lugar de "Upskill"
    - Ejemplos concretos, no abstracciones

empty_states: N/A (static landing)

error_pages: N/A (static landing)

button_labels:
  - "Empezar ahora"
  - "Ver roadmap"
  - "Unirse a la comunidad"

hero_copy:
  headline: "De principiante a desarrollador. El camino real."
  subtitle: "Sin atajos, sin frameworks de moda. Solo fundamentos sólidos y código que funciona."
```

## §6. Chalk-Editable Sections

Las siguientes secciones deben ser editables vía Chalk:

1. **hero_content** (singleton) — headline, subtitle, cta_text, cta_link
2. **features** (collection) — icon, title, description, order
3. **steps** (collection) — number, title, description
4. **testimonials** (collection) — quote, author, role, avatar_url
5. **cta_banner** (singleton) — title, subtitle, button_text, button_link

## §7. Visual Assets

```yaml
icons:
  library: Lucide
  style: default stroke, 24px
  
  mappings:
    code: Code
    database: Database
    users: Users
    check: CheckCircle
    zap: Zap
    rocket: Rocket
    terminal: Terminal

photography:
  usage: Minimal — prefer code visuals, abstract patterns
  source: Unsplash/abstract tech
  queries: 
    - "minimal dark tech desk setup"
    - "code on screen dark mode"
```

## §8. Accessibility

- WCAG 2.2 AA target
- Contrast ratios: primary (7.2:1), accent (7.8:1), all pass AA
- Focus visible: cyan ring 2px
- Reduced motion: disable cursor blink, typing effects
- Skip link: #main content

## §9. Asset Specs

```yaml
favicon:
  format: SVG monogram "S" in primary cyan
  
og_images:
  size: 1200x630
  bg: '#0a0a0f'
  text: primary cyan + accent amber
```
