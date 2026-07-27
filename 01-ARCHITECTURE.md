# 01 — Architecture

Technical specification: stack, structure, routing, data models, performance, SEO, deployment.

---

## 1. Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Astro 5** | Zero JS by default. The site is ~95% static content |
| Islands | **React 19** | Only where interaction is real. Five islands total |
| Styling | **Tailwind v4** + CSS custom properties | Tokens as CSS variables so they work outside the framework too |
| Motion | **Motion One** (~4kB) + native CSS | Not Framer Motion — 10× the weight for no gain here |
| Content | **Astro Content Collections** (MDX + JSON) | Type-safe, validated at build time |
| Forms | **Astro Actions** + Resend | Server-side. No third-party form widget |
| Hosting | **Cloudflare Pages** | Static at the edge, no cold starts |
| Analytics | **Plausible** | ~1kB, cookie-free |

**The five React islands.** Nothing else hydrates.

1. `TelemetryRail` — `client:load` (must observe the load it reports on)
2. `MobileMenu` — `client:idle`
3. `SystemMap` — `client:visible`
4. `ContactForm` — `client:visible`
5. `InsightFilter` — `client:visible`

Tabs, accordions, and the testimonial slider are CSS-only or use minimal inline scripts. Do not reach for React for them.

---

## 2. Project structure

```
src/
├── components/
│   ├── chrome/        Header, Nav, MegaMenu, MobileMenu, Footer, Cursor,
│   │                  ScrollProgress, TelemetryRail, CTABand, BackToTop
│   ├── ui/            Button, Link, Tag, Input, Textarea, Select, Checkbox,
│   │                  Toast, Modal, Tooltip, Skeleton, CodeBlock, Table
│   ├── sections/      Hero, SectionHeader, SystemMap, ProcessTimeline,
│   │                  MetricGrid, LogoMarquee, TestimonialSlider, TabPanel,
│   │                  Accordion, TeamGrid, ContactBlock
│   └── cards/         ServiceCard, InsightCard, CaseCard, TeamCard,
│                      TestimonialCard, TechCard
├── content/
│   ├── config.ts      Collection schemas — see §4
│   ├── insights/      MDX posts
│   ├── work/          MDX case studies
│   ├── team/          JSON team members
│   ├── testimonials/  JSON testimonials
│   └── technologies/  MDX technology pages
├── layouts/           Base, Page, Article, Case
├── pages/             File-based routes — see §3
├── styles/
│   ├── tokens.css     All design tokens
│   ├── motion.css     Easings, durations, keyframes, reduced-motion
│   └── global.css
├── lib/
│   ├── telemetry.ts   Performance Observer wiring
│   ├── motion.ts      Reveal observer, stagger, counter
│   └── seo.ts         Meta and structured data builders
└── assets/fonts/      Self-hosted woff2 subsets
```

---

## 3. Routes

```
/                                  Home
/ai                                AI practice hub
/ai/agentic-systems
/ai/generative-ai
/ai/llm-integration
/ai/data-and-ml
/services                          Index
/services/custom-development
/services/cloud-platform
/services/mobile-app-development
/services/quality-engineering
/services/emerging-tech
/work                              Case study index
/work/[slug]
/team                              Team
/technologies                      Index
/technologies/[slug]
/insights                          Article index
/insights/[cluster]                Six cluster archives
/insights/[slug]
/about
/careers
/contact
/privacy-policy
/terms
/404
```

**Navigation order:** AI · Services · Work · Technologies · Insights · About · [Start a project]

`/team` is reachable from `/about` and the footer, not the primary nav. `/careers` lives in the footer.

---

## 4. Content schemas

`src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const CLUSTERS = [
  'ai-agentic-systems',
  'mobile-app-development',
  'cloud-devops',
  'quality-automation',
  'iot-emerging-tech',
  'buying-hiring',
] as const;

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(160),
    cluster: z.enum(CLUSTERS),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    author: z.string(),               // references team.id
    readingTime: z.number(),          // minutes
    featured: z.boolean().default(false),
    relatedService: z.string().optional(),  // route to CTA toward
  }),
});

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),               // may be anonymised descriptor
    anonymised: z.boolean().default(false),
    industry: z.enum(['healthcare','finance','retail','logistics','manufacturing','other']),
    practice: z.array(z.enum(['ai','custom','cloud','mobile','quality'])),
    summary: z.string().max(180),
    stack: z.array(z.string()),
    results: z.array(z.object({
      metric: z.string(),
      value: z.string(),
      caption: z.string().optional(),
    })),
    testimonial: z.string().optional(),  // references testimonials.id
    order: z.number(),
  }),
});

const team = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    bio: z.string().max(320),
    photo: z.string().optional(),
    linkedin: z.string().url().optional(),
    specialisms: z.array(z.string()).max(4),
    order: z.number(),
    leadership: z.boolean().default(false),
    placeholder: z.boolean().default(false),  // hides from prod if true
  }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    quote: z.string().min(120).max(340),   // enforced — see §4.1
    authorName: z.string(),
    authorRole: z.string(),
    company: z.string(),
    companyLogo: z.string().optional(),
    industry: z.string().optional(),
    relatedWork: z.string().optional(),    // references work slug
    featured: z.boolean().default(false),
    placeholder: z.boolean().default(false),
  }),
});

const technologies = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.enum(['ai-ml','frontend','backend','mobile','cloud-data','quality']),
    tagline: z.string().max(90),
    order: z.number(),
  }),
});

export const collections = { insights, work, team, testimonials, technologies };
```

### 4.1 Why the quote length is enforced

`z.string().min(120).max(340)` is deliberate. The testimonial card is designed around a two-to-three sentence quote. A 60-character quote leaves a hole in the layout; a 600-character one overflows the card and breaks the slider's height calculation.

Enforcing it at the schema level means the build fails loudly when someone pastes a quote of the wrong size, rather than shipping a broken card. Same reasoning applies to `bio.max(320)` and `summary.max(180)`.

### 4.2 The `placeholder` flag

Both `team` and `testimonials` carry `placeholder: boolean`.

- `true` → the entry renders in development, and is **excluded from production builds**
- `false` → renders everywhere

This lets the components be built and styled against realistic data now, while guaranteeing no placeholder text can reach production by accident.

```ts
const visible = (await getCollection('testimonials'))
  .filter(t => import.meta.env.DEV || !t.data.placeholder);
```

If filtering leaves a section empty in production, render the section's empty state (design system §2.32), not a blank gap.

---

## 5. Page composition

### 5.1 Home

```
TelemetryRail (persistent)
Header
Hero                        [Tier 0]
ThesisPanels (×3)           [Tier 1]
SystemMap                   [Tier 0]
ProofBand                   MetricGrid + LogoMarquee   [Tier 1]
TestimonialSlider           [Tier 1]
ProcessTimeline (×4)        [Tier 1]
CapabilityTabs (×5)         [Tier 2]
InsightsTeaser (×3)         [Tier 2]
CTABand                     [Tier 0]
Footer
```

Three Tier 0 moments, roughly 300vh apart.

### 5.2 Service and AI pages

```
PageHero → Overview → CapabilityList → ProcessTimeline
→ TechStack → TestimonialSlider (filtered) → RelatedInsights → CTABand
```

### 5.3 Team

```
PageHero → LeadershipRow (leadership: true, larger cards)
→ TeamGrid (remainder) → CultureBlock → CareersCTA → CTABand
```

### 5.4 Contact

```
PageHero → [ContactForm | ContactBlock] two-column
→ WhatHappensNext → CTABand (variant: quiet)
```

Two columns on desktop, stacked on mobile with the form first.

---

## 6. Performance

### 6.1 Budget

| Metric | Target | Ceiling |
|---|---|---|
| LCP | < 0.8s | 1.2s |
| INP | < 100ms | 200ms |
| CLS | < 0.02 | 0.05 |
| TTFB | < 150ms | 300ms |
| JS, homepage | < 40kB gzip | 60kB |
| CSS | < 18kB gzip | 25kB |
| Fonts | < 90kB | 110kB |
| Total, homepage | < 250kB | 350kB |
| Lighthouse | 100 across the board | 95 minimum |

Three of these are displayed to visitors in the rail. Regression is publicly visible.

### 6.2 Rules

**Fonts** — self-hosted `woff2`, Latin subset, variable where available, preloaded, `font-display: swap`, `size-adjust` tuned so fallback metrics match and swapping causes zero shift.

**Images** — AVIF with WebP fallback, explicit `width`/`height` on every image, `loading="lazy"` by default, `fetchpriority="high"` only on the LCP candidate. The design uses very few images by intent.

**Video** — never embed a YouTube iframe directly; each costs ~500kB before playback. Use a static poster with a click-to-load façade.

**Caching** — hashed assets get `Cache-Control: public, max-age=31536000, immutable`. HTML gets `stale-while-revalidate`.

**Third parties** — one analytics script. No tag manager, no chat widget, no heatmap tool, no A/B framework.

**Rendering** — `content-visibility: auto` on below-fold sections. All scroll listeners `{passive: true}` and rAF-throttled. Native `animation-timeline: scroll()` and `view()` wherever supported.

### 6.3 Telemetry implementation

`src/lib/telemetry.ts`. Values must be measured, never hardcoded.

```ts
export function initTelemetry(render: (k: string, v: string) => void) {
  new PerformanceObserver(list => {
    const lcp = list.getEntries().at(-1)!.startTime;
    render('LCP', `${(lcp / 1000).toFixed(2)}s`);
  }).observe({ type: 'largest-contentful-paint', buffered: true });

  new PerformanceObserver(list => {
    const cls = list.getEntries()
      .filter((e: any) => !e.hadRecentInput)
      .reduce((sum, e: any) => sum + e.value, 0);
    render('CLS', cls.toFixed(3));
  }).observe({ type: 'layout-shift', buffered: true });

  addEventListener('load', () => {
    const js = performance.getEntriesByType('resource')
      .filter(r => r.name.endsWith('.js'))
      .reduce((sum, r: any) => sum + (r.encodedBodySize || 0), 0);
    render('JS', `${Math.round(js / 1024)}kB`);
  }, { once: true });
}
```

---

## 7. SEO

### 7.1 Per page

Unique `<title>` under 60 characters and `<meta name="description">` under 160. Canonical on every page. Open Graph and Twitter card tags. `sitemap.xml` generated at build. `robots.txt` allowing everything except `/api/`.

### 7.2 Structured data

| Schema | Where |
|---|---|
| `Organization` | Sitewide, in the base layout |
| `WebSite` | Sitewide |
| `Service` | Each service and AI page |
| `Article` | Each insight, with `author` and `datePublished` |
| `Person` | Each team member on `/team` |
| `Review` / `AggregateRating` | Testimonials — **only once real, attributable testimonials exist** |
| `BreadcrumbList` | All nested pages |
| `FAQPage` | Where genuine Q&A exists |

> `Review` schema on placeholder testimonials would publish fabricated reviews in machine-readable form. Gate it on `placeholder === false`.

`Organization` requires `address`, `telephone`, and `founder`. These are tokens — see `03-CONTENT.md` §11. Omit the property entirely rather than emitting an empty or invented string.

### 7.3 Content clusters

Six insight clusters, each with an archive page at `/insights/[cluster]`. Each cluster links to its related service page and vice versa. `ai-agentic-systems` is the largest and links to `/ai`.

---

## 8. Forms

Single endpoint, `POST /api/contact` via Astro Actions.

```ts
export const contact = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2).max(80),
    email: z.string().email(),
    company: z.string().max(120).optional(),
    message: z.string().min(20).max(4000),
    budget: z.enum(['<25k','25-75k','75-200k','200k+','unsure']).optional(),
    timeline: z.enum(['asap','1-3mo','3-6mo','exploring']).optional(),
    website: z.string().max(0),   // honeypot — must be empty
  }),
  handler: async (input) => { /* Resend → {{CONTACT_EMAIL}} */ },
});
```

Honeypot plus a timestamp check rather than a CAPTCHA — no third-party script, no accessibility cost. Rate limit at the edge: 5 requests per IP per hour.

Validation is server-side and mirrored client-side for immediate feedback. Errors are described in text, never signalled by colour alone.

---

## 9. Accessibility

WCAG 2.2 AA as the floor.

- Contrast rules in `02-DESIGN-SYSTEM.md` §1.4 are hard constraints
- `:focus-visible` ring on every interactive element, 2px `#FF4A17`, 3px offset, never removed
- Semantic landmarks, one `h1` per page, no skipped heading levels
- `SystemMap` fully keyboard-navigable with an ARIA-described list fallback
- Telemetry values use `aria-live="polite"` so they announce once when settled
- Modals trap focus, close on `Esc`, return focus to the trigger
- Skip-to-content link, first in tab order
- All motion respects `prefers-reduced-motion`
- Every form control has a real `<label>`

---

## 10. Deployment

Cloudflare Pages. Preview deploys on every PR. Production on merge to `main`.

**Headers:**
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Content-Security-Policy: default-src 'self'; img-src 'self' data:;
    style-src 'self' 'unsafe-inline'; script-src 'self' https://plausible.io;
    connect-src 'self' https://plausible.io; font-src 'self'
```

CI runs on every PR: typecheck, build, Lighthouse CI against the §6.1 budget, axe accessibility scan. **A PR that regresses the budget does not merge.**

---

## Appendix A — Legacy URL redirects

Implement as `public/_redirects` (Cloudflare Pages). These preserve inbound links and search ranking from previously published URLs. 301 permanent, all of them.

```
/blog/                                 /insights/                              301
/blog/page/:n                          /insights/                              301
/category/blog/                        /insights/                              301
/blog/*                                /insights/:splat                        301
/about-us/                             /about/                                 301
/site-map/                             /sitemap.xml                            301
/services/software-testing-services/   /services/quality-engineering/          301
/services/analytics-testing/           /services/quality-engineering/          301
/services/digital-innovation/          /ai/                                    301
/services/app-development/             /services/mobile-app-development/       301
/services/cloud-solutions/             /services/cloud-platform/               301
/technologies/asp-dotnet-development/  /technologies/aspnet/                   301
/technologies/angular-js-development/  /technologies/angular/                  301
/technologies/vuejs-development/       /technologies/vue/                      301
/technologies/react-js-development/    /technologies/react/                    301
/technologies/python-development/      /technologies/python/                   301
/technologies/blazor-development/      /technologies/blazor/                   301
/technologies/microsoft-azure/         /technologies/azure/                    301
/technologies/web-design/              /services/custom-development/           301
```

Two published articles are retired rather than migrated; point them at the nearest relevant destination:

```
/blog/best-discord-alternatives/       /insights/                              301
/blog/best-apps-to-make-money/         /insights/                              301
```

Verify every rule with an automated check in CI before launch.

---

## Appendix B — Article migration

46 articles migrate into `src/content/insights/`, each assigned one of the six clusters:

| Cluster | Approx. count |
|---|---|
| `ai-agentic-systems` | 22 |
| `mobile-app-development` | 7 |
| `buying-hiring` | 6 |
| `cloud-devops` | 5 |
| `iot-emerging-tech` | 5 |
| `quality-automation` | 3 |

Slugs are preserved exactly. Every article needs `author` populated — this is `{{BLOG_AUTHORS}}` until supplied, at which point it references a `team` entry `id`.
