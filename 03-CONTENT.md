# 03 — Content

Every page's copy, ready to place. Text here is final — do not paraphrase, expand, or improve it. If a section needs copy that isn't here, flag it rather than writing it.

**Conventions**
`{{TOKEN}}` — a value the client must supply. Render literally. Full registry in §11.
`[PLACEHOLDER]` — deliberate placeholder content. Use verbatim. Never substitute plausible-looking alternatives.

---

# 1. Brand

## 1.1 Positioning

> PrivoLabs builds AI systems that survive contact with production — designed by engineers who have been shipping enterprise software for two decades.

The wedge is the **prototype-to-production gap**. Most AI pilots die between the demo and the deployment, and the reason is almost never the model. It's architecture, data plumbing, evaluation, cost control, latency, and security review. A twenty-year engineering practice knows how to do that work; an AI-native startup has never had to learn it.

## 1.2 Messaging hierarchy

**One line:** AI that makes it to production.

**Proof structure:**
1. We have shipped enterprise software for {{YEARS_EXPERIENCE}} years
2. We treat AI as a systems problem, not a model problem
3. We own the full stack it runs on — cloud, data, application, quality

**Capabilities:** AI & Agentic Systems · Custom Development · Cloud & Platform · Mobile & App · Quality Engineering

## 1.3 Voice

Write like a senior engineer explaining something to a peer who is paying for it.

**Do:** short declaratives · concrete nouns · real numbers where they exist · name the trade-off · plain verbs · sentence case

**Never:** "cutting-edge" · "leverage" · "seamlessly" · "revolutionize" · "in today's fast-paced digital landscape" · "unlock" · "empower" · exclamation marks · stacked adjectives

Every sentence should fail to survive deletion. If you can cut it and lose nothing, cut it.

---

# 2. Global

## 2.1 Navigation

```
AI            /ai
Services      /services      ▾ Custom Development · Cloud & Platform ·
                               Mobile & App Development · Quality Engineering ·
                               Emerging Tech
Work          /work
Technologies  /technologies
Insights      /insights
About         /about
[Start a project]  →  /contact
```

## 2.2 Footer

**Identity column**
Wordmark
*AI systems and enterprise software, built to production standards.*
LinkedIn · YouTube · Instagram

**Capabilities**
AI & Agentic Systems · Custom Development · Cloud & Platform · Mobile & App · Quality Engineering

**Company**
About · Team · Work · Insights · Careers · Contact

**Contact**
contact@privolabs.com
{{PHONE}}
{{ADDRESS_CITY_STATE_POST}}
*We reply to every enquiry within one business day.*

**Bottom bar**
`© 2026 PrivoLabs Technologies. All rights reserved.` · Privacy Policy · Terms of Service

## 2.3 Standing CTAs

| Placement | Label | Destination |
|---|---|---|
| Header | Start a project | /contact |
| End of service and AI pages | Book a technical call | /contact |
| End of every insight | Talk to an engineer about this | /contact |
| Homepage close | Tell us what you're building | /contact |
| Team page close | See open roles | /careers |

One verb per action, identical from button to confirmation.

---

# 3. Home

## 3.1 Hero

**Eyebrow:** AI & software engineering · since {{FOUNDING_YEAR}}

**Headline** (three lines, for the width-axis animation):
```
Most AI pilots
never reach
production.
```

**Subhead:**
> That's rarely a model problem. It's architecture, data plumbing, evaluation, latency, and cost — the unglamorous engineering that decides whether a demo becomes a system. We've been doing that work for {{YEARS_EXPERIENCE}} years.

**Primary CTA:** Start a project → `/contact`
**Secondary CTA:** See how we build → `/ai`

**Telemetry caption:** Measured on your device, this page load.

## 3.2 The gap

**Eyebrow:** The problem
**Heading:** The distance between a working demo and a working system

**Panel 01 — Demos are cheap now.**
A convincing prototype takes an afternoon. That's precisely why a prototype no longer proves anything about whether you can ship.

**Panel 02 — Production is where the cost lives.**
Evaluation harnesses. Token budgets that don't blow up at scale. Latency under real concurrency. Fallback behaviour when the model is wrong. Audit trails. Access control. None of it appears in a demo.

**Panel 03 — This is ordinary engineering.**
Hard, but not mysterious. The same discipline as any other production system, applied to a component that happens to be probabilistic. We shipped production systems before the models existed.

## 3.3 Capabilities

**Eyebrow:** What we build
**Heading:** Five practices, one engineering team

| Node | Copy | Link |
|---|---|---|
| AI & Agentic Systems | LLM integration, retrieval, agent workflows, evaluation, and the cost and latency work that keeps them viable. | /ai |
| Custom Development | Business systems built to your actual processes, from concept through deployment and the years after it. | /services/custom-development |
| Cloud & Platform | AWS, Azure, and GCP. Migration, cloud-native builds, Kubernetes, and infrastructure that scales without surprises on the invoice. | /services/cloud-platform |
| Mobile & App | Native iOS and Android, or React Native and Flutter when cross-platform is the right call. Offline, push, store deployment, maintenance. | /services/mobile-app-development |
| Quality Engineering | Automated suites, performance testing, security validation, and CI/CD. The reason the other four hold together. | /services/quality-engineering |

**Map dependencies:** AI → Cloud · AI → Quality · Custom → Cloud · Custom → Quality · Mobile → Custom · Mobile → Quality · Cloud → Quality

## 3.4 Proof

**Eyebrow:** Track record
**Heading:** Systems in production

**Metrics** — render only where a real value exists. Omit any tile whose token is unfilled rather than showing a zero.

| Value | Label |
|---|---|
| {{YEARS_EXPERIENCE}}+ | Years shipping software |
| {{PROJECTS_DELIVERED}}+ | Projects delivered |
| {{TEAM_SIZE}} | Engineers on staff |
| {{COUNTRIES_SERVED}} | Countries served |

**Logo marquee** — renders only when non-placeholder logos exist. Otherwise omit the strip entirely.

## 3.5 Testimonials

**Eyebrow:** In their words
**Heading:** What clients say about working with us

Slider per design system §3.24. Content in §8.

## 3.6 How we work

**Eyebrow:** Engagement
**Heading:** Four phases, no mystery

**01 · Discovery**
Requirements and constraints, technical feasibility, architecture, timeline and resourcing. You get a written technical assessment whether or not you proceed.

**02 · Design**
Architecture blueprints, security parameters, scaling strategy, monitoring. Decisions get documented with their trade-offs, so the reasoning survives staff changes.

**03 · Build**
Agile sprints with working software at the end of each. Continuous integration and deployment from day one. You see progress weekly, not at the end.

**04 · Run**
Deployment, migration, performance monitoring, ongoing maintenance. Most of a system's life happens after launch, and most agencies stop caring at exactly that point.

## 3.7 Technical depth

**Eyebrow:** Under the hood
**Heading:** The stack, stated plainly

**Solution Architecture** — Microservices and cloud-native systems designed to scale predictably. We size for the load you'll have in two years, not the one you have today.

**Web Development** — React, Angular, and Vue on the front end. Node.js, Python, and Java behind it. Payment gateways, third-party integration, database performance tuning, SSL and API authentication, and PWAs where a native app isn't warranted.

**Mobile Development** — Native iOS in Swift with SwiftUI and UIKit. Android in Kotlin with Jetpack Compose. React Native and Flutter for cross-platform. Offline functionality, push notifications, location services, store deployment, and the maintenance that follows.

**Technology Stack** — React with Next.js where SEO matters, Angular for enterprise applications, Vue for dynamic interfaces. Node.js for scalable APIs, Python for AI and ML workloads, Java for enterprise systems. AWS, Azure, and GCP with serverless, containers, and microservices. MongoDB for flexibility, PostgreSQL for complex transactions, Redis for caching.

**Quality Engineering** — Jest, Selenium, and Cypress for automated coverage. Performance testing that finds bottlenecks before users do. Penetration testing, vulnerability scanning, and compliance verification. CI/CD that makes deployment boring.

## 3.8 Insights teaser

**Heading:** What we're writing about
Three most recent, weighted toward AI. Link: All insights → `/insights`

## 3.9 Closing CTA

**Heading:** Tell us what you're building.
**Body:** Send the problem, not a spec. First conversation is with an engineer, not a salesperson, and you'll get a straight answer about whether we're the right fit.
**CTA:** Start a project

---

# 4. AI practice

## 4.1 Hub — `/ai`

**Eyebrow:** AI practice
**Heading:** AI systems, built to production standards
**Subhead:** We integrate language models, retrieval, and agent workflows into systems that already have users, compliance requirements, and uptime expectations. The interesting problems are never the model.

**What we actually do**

**Integrate models into existing products.** Most clients don't need a new AI product. They need AI inside the system they already run, without destabilising it.

**Build retrieval that returns the right thing.** Chunking, embedding strategy, hybrid search, reranking, and evaluation. Retrieval quality determines output quality far more than model choice does.

**Ship agent workflows that fail safely.** Tool use, orchestration, human checkpoints, and explicit behaviour when the model is confidently wrong.

**Control cost and latency.** Token budgets, caching, model routing, batching. The difference between a viable feature and one that gets switched off at the end of the quarter.

**Evaluate continuously.** Test suites for probabilistic systems. Regression detection when a provider silently changes a model under you.

**Tell you what not to build.** A meaningful share of AI proposals should be a database query, a rules engine, or nothing. We'd rather say so in week one.

## 4.2 Sub-pages

Each follows: what it is · when it's the right answer · when it isn't · how we build it · what you get · related insights.

**`/ai/agentic-systems`** — Autonomous workflows, tool use, orchestration, safe failure
*Heading:* Agents that know when to stop
*Subhead:* An agent that can act is an agent that can act wrongly. We build the checkpoints, the audit trail, and the boundaries first.

**`/ai/generative-ai`** — Content and document generation, multimodal, product features
*Heading:* Generation with a quality bar
*Subhead:* Output you can put in front of customers, which means evaluation, guardrails, and a human path for the cases that need one.

**`/ai/llm-integration`** — Adding AI to systems already in production
*Heading:* AI inside the system you already run
*Subhead:* The hard part isn't the model call. It's the data access, the permissions model, the latency budget, and not destabilising what already works.

**`/ai/data-and-ml`** — Predictive analytics, data intelligence, classical ML
*Heading:* The model that fits the problem
*Subhead:* Gradient boosting still beats a language model at most tabular prediction, at a fraction of the cost. We pick on merit.

---

# 5. Services

## 5.1 Index — `/services`

**Heading:** Engineering practices, not packages
**Subhead:** Four disciplines that compose into whole systems. Most engagements use more than one.

## 5.2 Custom Development

**Heading:** Software shaped to how you actually work
**Subhead:** Off-the-shelf software forces your process to match its assumptions. Custom development inverts that — at a higher cost that is worth paying only when your process is genuinely a differentiator.

**When custom is right** — Your workflow is a competitive advantage · Existing tools require workarounds that cost more than they save · You need to own the roadmap · Integration requirements exceed what packaged software exposes

**When it isn't** — Standard back-office functions where a proven SaaS product exists. We'll say so.

**What we build** — Business logic that mirrors your operations · Architecture that scales with load · Security designed in, not bolted on · Systems built for the engineers who inherit them

**Also covers** — Modernising legacy systems, replatforming, and rescuing stalled projects.

## 5.3 Cloud & Platform

**Heading:** Infrastructure that scales without surprising you
**Subhead:** AWS, Azure, and GCP. Migration, cloud-native builds, and the cost discipline that keeps a cloud bill from becoming a board-level topic.

**Capabilities** — Multi-cloud and hybrid strategy · Kubernetes and Docker · Microservices architecture · Auto-scaling and load balancing · Real-time monitoring and alerting · Cost optimisation

**What you get** — Systems that handle growth without re-architecture, infrastructure as code so environments are reproducible, and monitoring that catches problems before your users report them.

## 5.4 Mobile & App Development

**Heading:** Apps people keep on the first screen
**Subhead:** Native where performance matters, cross-platform where it doesn't. The decision should follow from your requirements, not from what your agency prefers building.

**Native** — iOS in Swift with SwiftUI and UIKit, Core Data and CloudKit. Android in Kotlin with Jetpack Compose and Material Design.
**Cross-platform** — React Native and Flutter, when a shared codebase costs less than it gives up.
**Behind the app** — Node.js, Python, and Java. AWS and Firebase. MongoDB and PostgreSQL. REST and GraphQL.

**What we handle** — Offline functionality · Push notifications · Location services · Enterprise system integration · Store submission and review · Post-launch updates

## 5.5 Quality Engineering

**Heading:** The work that makes the other work hold
**Subhead:** Testing isn't a phase at the end. It's the thing that lets you deploy on a Friday.

**Capabilities** — Automated suites in Jest, Selenium, and Cypress · Performance and load testing · Security validation, penetration testing, and vulnerability scanning · CI/CD pipeline design · Compliance verification · Continuous monitoring · User behaviour analytics

**AI-specific QA** — Evaluation harnesses for non-deterministic systems, regression detection when providers change models, and adversarial testing for prompt injection. Almost nobody offers this, and every AI buyer eventually needs it.

## 5.6 Emerging Tech

**Heading:** IoT, blockchain, and the rest of the frontier
**Subhead:** Technologies worth using when they solve your problem and worth skipping when they don't.

**IoT** — Device integration, telemetry pipelines, edge processing, fleet management.
**Blockchain** — Where an immutable distributed ledger genuinely beats a database. Often it doesn't.
**Process automation & RPA** — Removing the manual steps between systems that were never designed to talk.

---

# 6. Contact — `/contact`

## 6.1 Page copy

**Eyebrow:** Contact
**Heading:** Tell us what you're building
**Subhead:** Send the problem rather than a specification. The first reply comes from an engineer, not a salesperson.

## 6.2 Form

| Field | Label | Type | Required |
|---|---|---|---|
| name | Your name | text | ✓ |
| email | Work email | email | ✓ |
| company | Company | text | — |
| message | What are you building? | textarea, 6 rows | ✓ |
| budget | Rough budget | select | — |
| timeline | Timeline | select | — |

**Budget options:** Under $25k · $25k–$75k · $75k–$200k · $200k+ · Not sure yet
**Timeline options:** As soon as possible · 1–3 months · 3–6 months · Just exploring

**Placeholder for message:** *The problem, the constraint, and what you've tried. Detail helps.*

**Submit label:** Send message
**Loading label:** Sending
**Success heading:** Message sent.
**Success body:** We'll reply within one business day. If it's urgent, email contact@privolabs.com directly.

**Validation messages**
- Name: Enter your name.
- Email: Enter a valid email address.
- Message: Tell us a bit more — at least a couple of sentences.
- Server error: That didn't send. Try again, or email contact@privolabs.com.

## 6.3 Contact block

```
EMAIL     contact@privolabs.com
PHONE     {{PHONE}}
OFFICE    {{ADDRESS_LINE_1}}
          {{ADDRESS_LINE_2}}
          {{ADDRESS_CITY_STATE_POST}}
          {{ADDRESS_COUNTRY}}
HOURS     Mon–Sat   08:00 – 18:00
          Sunday    Closed
```

Social: LinkedIn · YouTube · Instagram

## 6.4 What happens next

**Heading:** What happens next

**01** — We reply within one business day.
**02** — First call is technical, thirty minutes, no charge.
**03** — If we're not the right fit, we'll say so and suggest who is.

---

# 7. Team — `/team`

## 7.1 Page copy

**Eyebrow:** The team
**Heading:** The people who'll actually build it
**Subhead:** No account managers between you and the engineers. The people on the first call are the people writing the code.

**Leadership section heading:** Leadership
**Team section heading:** Engineering

## 7.2 Culture block

**Heading:** How we work together

**Boring is a compliment.** Systems should be unremarkable to operate. Excitement in production is a failure mode.

**The trade-off is the answer.** Every technical decision costs something. We name it before committing.

**We inherit our own work.** We design for the engineer who takes over in three years, because it's often us.

**Say no early.** Declining a project we're wrong for is cheaper for everyone than discovering it in month four.

## 7.3 Careers CTA

**Heading:** We're hiring engineers who care about production.
**Body:** If the four things above sound like how you already work, we'd like to hear from you.
**CTA:** See open roles → `/careers`

## 7.4 Placeholder team data

`src/content/team/*.json`. Every entry carries `placeholder: true` and is **excluded from production builds** until replaced.

Replace `name`, `role`, `bio`, `photo`, and `linkedin`, then set `placeholder: false`. No code changes required.

> **Bio limit is 320 characters.** Enforced at the schema level. Longer bios fail the build rather than breaking the card.

```json
[
  {
    "id": "founder",
    "name": "[PLACEHOLDER] Founder Name",
    "role": "Founder & Chief Executive",
    "bio": "[PLACEHOLDER] Two to three sentences covering the career before PrivoLabs, the technical specialism, and what they own here. Replace entirely. Keep under 320 characters so the card layout holds.",
    "photo": null,
    "linkedin": null,
    "specialisms": ["Systems architecture", "Delivery leadership"],
    "order": 1,
    "leadership": true,
    "placeholder": true
  },
  {
    "id": "head-of-ai",
    "name": "[PLACEHOLDER] AI Lead Name",
    "role": "Head of AI",
    "bio": "[PLACEHOLDER] Two to three sentences on their background in machine learning or applied AI, and the kind of systems they've taken to production. Replace entirely. Under 320 characters.",
    "photo": null,
    "linkedin": null,
    "specialisms": ["LLM systems", "Retrieval", "Evaluation"],
    "order": 2,
    "leadership": true,
    "placeholder": true
  },
  {
    "id": "head-of-engineering",
    "name": "[PLACEHOLDER] Engineering Lead Name",
    "role": "Head of Engineering",
    "bio": "[PLACEHOLDER] Two to three sentences on their engineering background and what they're responsible for across delivery. Replace entirely. Under 320 characters.",
    "photo": null,
    "linkedin": null,
    "specialisms": ["Distributed systems", "Team leadership"],
    "order": 3,
    "leadership": true,
    "placeholder": true
  },
  {
    "id": "cloud-architect",
    "name": "[PLACEHOLDER] Cloud Architect Name",
    "role": "Principal Cloud Architect",
    "bio": "[PLACEHOLDER] Two to three sentences on cloud platform experience and the scale of infrastructure they've designed. Replace entirely. Under 320 characters.",
    "photo": null,
    "linkedin": null,
    "specialisms": ["AWS", "Kubernetes", "Cost engineering"],
    "order": 4,
    "leadership": false,
    "placeholder": true
  },
  {
    "id": "mobile-lead",
    "name": "[PLACEHOLDER] Mobile Lead Name",
    "role": "Lead Mobile Engineer",
    "bio": "[PLACEHOLDER] Two to three sentences on native and cross-platform mobile experience, and notable apps shipped. Replace entirely. Under 320 characters.",
    "photo": null,
    "linkedin": null,
    "specialisms": ["Swift", "Kotlin", "React Native"],
    "order": 5,
    "leadership": false,
    "placeholder": true
  },
  {
    "id": "quality-lead",
    "name": "[PLACEHOLDER] Quality Lead Name",
    "role": "Head of Quality Engineering",
    "bio": "[PLACEHOLDER] Two to three sentences on test automation, performance, and security validation experience. Replace entirely. Under 320 characters.",
    "photo": null,
    "linkedin": null,
    "specialisms": ["Test automation", "Performance", "Security"],
    "order": 6,
    "leadership": false,
    "placeholder": true
  },
  {
    "id": "fullstack-engineer",
    "name": "[PLACEHOLDER] Senior Engineer Name",
    "role": "Senior Full-Stack Engineer",
    "bio": "[PLACEHOLDER] Two to three sentences on full-stack experience and the products they've built. Replace entirely. Under 320 characters.",
    "photo": null,
    "linkedin": null,
    "specialisms": ["TypeScript", "Python", "PostgreSQL"],
    "order": 7,
    "leadership": false,
    "placeholder": true
  },
  {
    "id": "design-lead",
    "name": "[PLACEHOLDER] Design Lead Name",
    "role": "Design Lead",
    "bio": "[PLACEHOLDER] Two to three sentences on product design and interface work, and how design fits into delivery here. Replace entirely. Under 320 characters.",
    "photo": null,
    "linkedin": null,
    "specialisms": ["Product design", "Design systems"],
    "order": 8,
    "leadership": false,
    "placeholder": true
  }
]
```

**Photo spec** — 4:5 portrait, minimum 800×1000, AVIF with WebP fallback, consistent lighting and background across the set. Where `photo` is null, the card renders initials on `--ink-800` per design system §3.25.

---

# 8. Testimonials

## 8.1 Where they appear

| Location | Selection |
|---|---|
| Home §3.5 | `featured: true`, up to 6 |
| Service and AI pages | Filtered by `industry` or `relatedWork` |
| `/work/[slug]` | The single testimonial referenced by that case study |
| `/about` | One, `featured: true` |

If filtering leaves nothing non-placeholder, **the section does not render.** Never show an empty carousel.

## 8.2 Placeholder data

`src/content/testimonials/*.json`. All carry `placeholder: true` and are excluded from production builds.

> **Quote must be 120–340 characters.** Enforced at the schema level. The slider locks its height to the tallest quote at build time, so an oversized quote breaks the layout rather than degrading gracefully. The build fails instead — that's intended.

```json
[
  {
    "id": "t1",
    "quote": "[PLACEHOLDER] Two to three sentences describing the problem PrivoLabs solved, how the team worked, and the outcome that mattered. Replace this text entirely. Keep the replacement between 120 and 340 characters.",
    "authorName": "[PLACEHOLDER] Client Name",
    "authorRole": "[PLACEHOLDER] Job Title",
    "company": "[PLACEHOLDER] Company",
    "companyLogo": null,
    "industry": "healthcare",
    "relatedWork": null,
    "featured": true,
    "placeholder": true
  },
  {
    "id": "t2",
    "quote": "[PLACEHOLDER] A quote that names a specific constraint the team worked under and what they did about it. Specifics beat praise. Replace this text entirely, keeping it between 120 and 340 characters.",
    "authorName": "[PLACEHOLDER] Client Name",
    "authorRole": "[PLACEHOLDER] Job Title",
    "company": "[PLACEHOLDER] Company",
    "companyLogo": null,
    "industry": "finance",
    "relatedWork": null,
    "featured": true,
    "placeholder": true
  },
  {
    "id": "t3",
    "quote": "[PLACEHOLDER] A quote about the AI engagement — what was moved from prototype to production and what changed as a result. Replace entirely, between 120 and 340 characters.",
    "authorName": "[PLACEHOLDER] Client Name",
    "authorRole": "[PLACEHOLDER] Job Title",
    "company": "[PLACEHOLDER] Company",
    "companyLogo": null,
    "industry": "retail",
    "relatedWork": null,
    "featured": true,
    "placeholder": true
  },
  {
    "id": "t4",
    "quote": "[PLACEHOLDER] A quote about how the team communicated during delivery, and whether the estimate held. Process quotes convert as well as outcome quotes. Replace entirely, 120 to 340 characters.",
    "authorName": "[PLACEHOLDER] Client Name",
    "authorRole": "[PLACEHOLDER] Job Title",
    "company": "[PLACEHOLDER] Company",
    "companyLogo": null,
    "industry": "logistics",
    "relatedWork": null,
    "featured": true,
    "placeholder": true
  },
  {
    "id": "t5",
    "quote": "[PLACEHOLDER] A quote about the system after launch — reliability, maintenance, or how it handled growth. Post-launch quotes are the most persuasive. Replace entirely, 120 to 340 characters.",
    "authorName": "[PLACEHOLDER] Client Name",
    "authorRole": "[PLACEHOLDER] Job Title",
    "company": "[PLACEHOLDER] Company",
    "companyLogo": null,
    "industry": "manufacturing",
    "relatedWork": null,
    "featured": true,
    "placeholder": true
  },
  {
    "id": "t6",
    "quote": "[PLACEHOLDER] A quote from a longer-running relationship, mentioning how long the engagement has lasted and why it continued. Replace entirely, keeping it between 120 and 340 characters.",
    "authorName": "[PLACEHOLDER] Client Name",
    "authorRole": "[PLACEHOLDER] Job Title",
    "company": "[PLACEHOLDER] Company",
    "companyLogo": null,
    "industry": "other",
    "relatedWork": null,
    "featured": false,
    "placeholder": true
  }
]
```

## 8.3 Collection guidance

For whoever gathers the real quotes:

- **Specific beats warm.** "They told us to cut two of the four features" persuades more than "great to work with."
- **Ask three questions:** What was the constraint? What did we do that another team wouldn't have? What changed after launch?
- **Attribution matters more than the quote.** A named person with a role and company is worth several anonymous superlatives.
- **Anonymised is acceptable** where NDAs apply — "VP Engineering, a US healthcare payments platform" carries most of the weight.
- Confirm in writing that the person is happy to be quoted publicly with their name and company.

`Review` structured data is gated on `placeholder === false` — see `01-ARCHITECTURE.md` §7.2.

---

# 9. About, Work, Technologies, Insights

## 9.1 About — `/about`

**Heading:** {{YEARS_EXPERIENCE}} years of shipping, now pointed at AI
**Subhead:** PrivoLabs Technologies was founded by an engineer who spent two decades building and leading enterprise software delivery. That history is why we're careful about AI rather than breathless about it.

**Founder block** — {{FOUNDER_NAME}}, {{FOUNDER_ROLE}}, photo {{FOUNDER_PHOTO}}, {{FOUNDER_LINKEDIN}}. Beliefs section reuses the four statements from §7.2. Links to `/team`.

## 9.2 Work — `/work`

**Heading:** What we've shipped
**Subhead:** Systems in production, with the constraints they were built under.

Filterable by practice and industry.

**Case study structure** — six sections, every time:
1. **Context** — the client, the industry, the system that already existed
2. **The constraint** — what made this hard. Regulatory, technical, timeline, budget, legacy
3. **Approach** — what was built and, more importantly, what was rejected and why
4. **Stack** — named technologies
5. **Result** — measurable. Latency, cost, conversion, deployment frequency, incident rate
6. **What we'd do differently** — the section nobody writes, and the reason technical buyers trust the other five

Case studies are supplied by the client. Do not draft placeholder case studies — the index renders its empty state until real ones exist.

## 9.3 Technologies — `/technologies`

**Heading:** What we build with
**Subhead:** Chosen for the problem, not for our comfort.

**AI & ML** — OpenAI · Anthropic · open-weight models · LangChain / LlamaIndex · vector databases · Python ML stack
**Frontend** — React · Next.js · Angular · Vue · TypeScript
**Backend** — Node.js · Python · Java · .NET / ASP.NET Core · Blazor
**Mobile** — Swift · Kotlin · React Native · Flutter
**Cloud & Data** — AWS · Azure · GCP · Kubernetes · PostgreSQL · MongoDB · Redis
**Quality** — Jest · Cypress · Selenium · Playwright · CI/CD

Detail pages follow: positioning line → three pillars → three service offerings with specifics → stack detail → the four-phase process → CTA.

## 9.4 Insights — `/insights`

**Heading:** Insights
**Subhead:** Notes on AI systems, engineering practice, and the decisions in between.

**Clusters**

| Slug | Label | Feeds |
|---|---|---|
| `ai-agentic-systems` | AI & Agentic Systems | /ai |
| `mobile-app-development` | Mobile & Apps | /services/mobile-app-development |
| `cloud-devops` | Cloud & DevOps | /services/cloud-platform |
| `quality-automation` | Quality & Automation | /services/quality-engineering |
| `iot-emerging-tech` | IoT & Emerging Tech | /services/emerging-tech |
| `buying-hiring` | Buying & Hiring | /contact |

**Post template** — title · author with photo and role · published and updated dates · reading time · cluster tag · table of contents for long posts · body · related posts from the same cluster · contextual CTA to the matching service page.

---

# 10. Legal

**Privacy Policy** — covers collection, use, security, sharing, rights, cookies, children's privacy, and international transfers. Contact address: `privacy@privolabs.com`.

**Terms of Service** — standard B2B services terms. Content supplied by the client.

**Cookie consent** — analytics is cookie-free, so no banner is required for the default configuration. If any cookie-setting third party is added later, a consent gate becomes mandatory.

---

# 11. Token registry

## 11.1 Known values — use directly

| Token | Value |
|---|---|
| Primary email | `contact@privolabs.com` |
| Privacy email | `privacy@privolabs.com` |
| LinkedIn | `https://www.linkedin.com/company/privolabs` |
| YouTube | `https://www.youtube.com/@privolabs` |
| Instagram | `https://www.instagram.com/privolabs` |
| Hours | Mon–Sat 08:00–18:00 · Sunday closed |
| Legal entity | PrivoLabs Technologies |
| Brand primary | `#FF4A17` |

## 11.2 Required — render literally until supplied

| Token | Used in | Blocks |
|---|---|---|
| `{{PHONE}}` | Footer, contact, `Organization` schema | Contact page, structured data |
| `{{ADDRESS_LINE_1}}` | Contact, footer, schema | Contact page |
| `{{ADDRESS_LINE_2}}` | Contact, schema | Contact page |
| `{{ADDRESS_CITY_STATE_POST}}` | Contact, footer, schema | Contact page |
| `{{ADDRESS_COUNTRY}}` | Contact, schema | Contact page |
| `{{FOUNDER_NAME}}` | About, team, schema | About page credibility |
| `{{FOUNDER_ROLE}}` | About, team | About |
| `{{FOUNDER_PHOTO}}` | About, team | About |
| `{{FOUNDER_LINKEDIN}}` | About, team | About |
| `{{FOUNDING_YEAR}}` | Hero eyebrow, about | Hero |
| `{{YEARS_EXPERIENCE}}` | Hero, about, metrics | Hero, positioning |
| `{{TEAM_SIZE}}` | Home metrics, about | Metric tile |
| `{{PROJECTS_DELIVERED}}` | Home metrics | Metric tile |
| `{{COUNTRIES_SERVED}}` | Home metrics | Metric tile |
| `{{BLOG_AUTHORS}}` | Every insight byline | Article schema |

**Metric tiles omit themselves when their token is unfilled.** Never render a zero, a dash, or an invented figure.

## 11.3 Content the client supplies

| Item | Blocks |
|---|---|
| Real testimonials (min. 3) | Testimonial slider in production |
| Case studies (min. 3) | `/work` |
| Client logos, or anonymised descriptors | Logo marquee, `/work` |
| Team names, roles, bios, photos | `/team` in production |
| Terms of Service copy | `/terms` |
| Open roles | `/careers` |

Everything else can be built and deployed without these. These are what make it persuasive rather than merely finished.
