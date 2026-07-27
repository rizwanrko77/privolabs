# 02 — Design System

Tokens, components, and motion. Every component in the site is specified here.

---

# PART 1 — Tokens

## 1.1 The colour

`#FF4A17` — HSL 13°, 100%, 55%. International orange: the range engineering uses when something must be seen against any background and found when things go wrong. Bridge steel, flight suits, aerospace test articles, flight recorders.

Fully saturated at mid lightness, it is exhausting in large fills and invisible when overused. It works as **signal, not surface**.

> **The 5% rule.** Orange occupies no more than 5% of any viewport at rest. It marks the single most important thing on screen; everything else is neutral. Motion may briefly push past 5% — that is why the motion registers.

The one exception is the CTA band, which appears once per page, at the end.

## 1.2 Brand ramp

Fixed 13° hue, contrast-verified at every step.

```css
--brand-50:  #FEECE7;
--brand-100: #FDD0C3;
--brand-200: #FFA78F;
--brand-300: #FF805C;
--brand-400: #FF683D;
--brand-500: #FF4A17;  /* ◀ BRAND */
--brand-600: #EA3806;
--brand-700: #B8300A;
--brand-800: #84250B;
--brand-900: #571B0A;
--brand-950: #311007;
```

| Step | On `#0A0D10` | On `#F5F3F0` | Use |
|---|---|---|---|
| 200 | 10.37 | 1.70 | Dark-mode orange body text, long passages |
| 300 | 7.88 | 2.23 | Dark-mode links, hover |
| 400 | 6.77 | 2.60 | Hover fill on dark |
| **500** | **5.79** | **3.04** | **Brand. UI text on dark, fills, rules, icons** |
| 600 | 4.70 | 3.74 | Pressed |
| 700 | 3.21 | **5.47** | **Light-mode text** |
| 800–950 | — | 8.4–15.7 | Light-mode headings, dark tints |

## 1.3 Neutrals

Cool-shifted. A blue-leaning black makes a warm orange read hotter — temperature contrast doing work saturation can't.

```css
--ink-950: #06080A;   /* overlays, scrim */
--ink-900: #0A0D10;   /* ◀ PRIMARY DARK SURFACE */
--ink-800: #0E1216;   /* raised — cards, scrolled header */
--ink-700: #141920;   /* raised 2 — hover, code blocks */
--ink-600: #1C232C;   /* rules, borders */
--ink-500: #2A3340;   /* strong borders, inputs */
--ink-400: #4A5462;   /* disabled, placeholder */
--ink-300: #6E7885;   /* faint metadata — 4.35:1 */
--ink-200: #A8B0BA;   /* ◀ SECONDARY TEXT — 8.89:1 */
--ink-100: #D6DAE0;
--bone:    #F5F3F0;   /* ◀ PRIMARY TEXT — 17.59:1 */
```

## 1.4 Semantic tokens and the two hard rules

```css
:root {
  --surface: var(--ink-900);
  --surface-raised: var(--ink-800);
  --surface-hover: var(--ink-700);
  --rule: var(--ink-600);
  --rule-strong: var(--ink-500);

  --text: var(--bone);
  --text-muted: var(--ink-200);
  --text-faint: var(--ink-300);
  --text-brand: var(--brand-500);

  --accent: var(--brand-500);
  --accent-hover: var(--brand-400);
  --accent-press: var(--brand-600);
  --on-accent: var(--ink-900);      /* ◀ NEVER white */

  --data-steady: #4C8FA8;
  --success: #3FA680;
  --danger: #E5484D;

  --focus-ring: var(--brand-500);
}

[data-theme="light"] {
  --surface: var(--bone);
  --surface-raised: #FFFFFF;
  --surface-hover: #EFECE8;
  --rule: #DDD8D2;
  --rule-strong: #C4BDB5;
  --text: var(--ink-900);
  --text-muted: #56606C;
  --text-faint: #7C8590;
  --text-brand: var(--brand-700);   /* ◀ darkened */
  --accent: var(--brand-500);        /* fills stay hot */
  --accent-hover: var(--brand-600);
  --on-accent: var(--ink-900);
}
```

> **Rule 1 — Filled orange takes near-black text, never white.**
> White on `#FF4A17` = 3.36:1, **fails AA**. Ink = 5.79:1, **passes**. Also the hazard-signage convention: the accessible answer and the premium answer coincide.

> **Rule 2 — Light-mode orange text darkens to `--brand-700`.**
> `#FF4A17` on `#F5F3F0` = 3.04:1, **fails AA** below 24px. `#B8300A` = 5.47:1, **passes**. Fills and rules keep `--brand-500`; only text shifts.

## 1.5 Typography

| Role | Face | Axes | Use |
|---|---|---|---|
| Display | **Bricolage Grotesque** | `wght` 200–800 · `wdth` 75–100 · `opsz` 12–96 | Headlines 40px+ |
| Body | **Public Sans** | `wght` 100–900 | Prose 16–20px |
| Utility | **Commit Mono** | — | Eyebrows, nav, buttons, labels, metrics, code |

**The width axis is the signature.** Bricolage Grotesque carries a real `wdth` axis. Animating it makes headlines *expand into place* rather than fade in — the single most memorable thing on the site. Spec in §2.12.

**Mono carries the personality.** Navigation, buttons, eyebrows, metrics, and labels are all monospaced. That lets the display face stay rare and the body face stay invisible.

```css
--font-display: 'Bricolage Grotesque', system-ui, sans-serif;
--font-body:    'Public Sans', system-ui, sans-serif;
--font-mono:    'Commit Mono', ui-monospace, 'SF Mono', monospace;

--display-xl: clamp(3rem, 7vw, 5.5rem);       /* 600, wdth 100, -0.03em, 0.95 */
--display-lg: clamp(2.25rem, 4.5vw, 3.5rem);  /* 600, -0.02em, 1.02 */
--display-md: clamp(1.75rem, 3vw, 2.5rem);    /* 500, -0.015em, 1.1 */
--heading:    clamp(1.375rem, 2.2vw, 1.75rem);
--body-lg: 1.25rem;   /* 1.6 */
--body: 1rem;         /* 1.65 */
--small: 0.875rem;
--label: 0.8125rem;   /* mono 500, 0.08em, uppercase */
--metric: clamp(2rem, 4vw, 3.25rem);  /* mono 400, tabular-nums */
```

Self-hosted `woff2`, Latin subset, variable where available, preloaded, `size-adjust` tuned to the fallback. **Under 90kB total.**

## 1.6 Space, grid, radius, elevation

```css
--s-1:4px; --s-2:8px; --s-3:12px; --s-4:16px; --s-5:24px;
--s-6:32px; --s-7:48px; --s-8:64px; --s-9:96px; --s-10:128px; --s-11:192px;

--rail: 96px;
--container: 1280px;
--gutter: clamp(20px, 4vw, 48px);

--r-sm: 2px;    /* inputs, tags */
--r-md: 4px;    /* buttons, cards */
--r-lg: 8px;    /* modals */
--r-full: 999px; /* avatars, status dots only */

--e-1: 0 1px 0 var(--ink-600);
--e-2: 0 1px 2px rgb(0 0 0/.4), 0 0 0 1px var(--ink-600);
--e-3: 0 8px 24px rgb(0 0 0/.5), 0 0 0 1px var(--ink-600);
--e-4: 0 24px 64px rgb(0 0 0/.6), 0 0 0 1px var(--ink-500);
--e-brand: 0 0 0 1px var(--brand-500), 0 0 24px rgb(255 74 23/.25);
```

Radii stay tight. Soft 16px corners read consumer-friendly; 2–4px reads engineered. The colour is loud enough — geometry stays disciplined. Orange glow is reserved for focus and active states, where it means something.

## 1.7 Motion tokens

```css
--ease-out:    cubic-bezier(.16, 1, .3, 1);      /* entrances */
--ease-in:     cubic-bezier(.7, 0, .84, 0);      /* exits */
--ease-both:   cubic-bezier(.65, 0, .35, 1);     /* state changes */
--ease-snap:   cubic-bezier(.34, 1.56, .64, 1);  /* overshoot — buttons, chips only */
--ease-mech:   cubic-bezier(.83, 0, .17, 1);     /* heavy — panels, wipes */

--t-instant: 80ms;  --t-fast: 140ms;  --t-quick: 200ms;
--t-base: 320ms;    --t-slow: 480ms;  --t-slower: 700ms;
--t-overture: 1200ms;

--stagger-tight: 40ms;  --stagger-base: 70ms;  --stagger-loose: 110ms;
```

**Duration by distance.** 8px of travel gets `--t-fast`. 40px gets `--t-base`. Crossing the viewport gets `--t-slower`. Uniform durations are what make animation feel synthetic.

---

# PART 2 — Motion philosophy

Every component animates. A small number animate loudly. Sustained delight comes from contrast, not from uniform maximum motion — when everything moves equally, nothing reads as special.

| Tier | What | Duration | Count | Feel |
|---|---|---|---|---|
| **0** | Boot, hero, menu, page transition, system map, CTA band | 600–1400ms | 3–5 per page | Cinematic |
| **1** | Section reveals, staggered lists, counters, sliders | 300–700ms | Every section | Confident arrival |
| **2** | Hover, focus, press | 80–240ms | Every interactive element | Instant, physical |
| **3** | Rail pulse, marquee, cursor, grain | Continuous | Background | Barely conscious |

**Never two Tier 0 moments in the same viewport.** If the hero is playing, nothing else moves.

**Principles**

- **Orange leads, content follows.** In most entrances a thin orange element moves first — a rule, an underline, a scan line — and content arrives in its wake. The brand colour is the thing that *causes* the interface to appear.
- **`transform` and `opacity` only.** Never `width`, `height`, `top`, `left`, `margin`, or `box-shadow`.
- **Motion has direction and mass.** Things enter from where they logically come from.
- **Exit at 60% of entrance duration.** Waiting for something to leave feels broken.

---

# PART 3 — Components

## GROUP A — Entry & chrome

### 3.1 Boot sequence `[Tier 0]`

First visit per session. Never blocks interaction — content is present and functional underneath. Total 1400ms.

```
0ms     Ink field
80ms    1px orange line ignites at centre, scaleX 0→1        [320ms, ease-mech]
400ms   Line splits, halves travel to top and bottom edges   [420ms, ease-mech]
520ms   Rule grid draws in behind, opacity 0→.5              [400ms, ease-out]
620ms   Wordmark strokes draw via stroke-dashoffset          [520ms, ease-out]
900ms   Wordmark fills solid, orange dot punches in          [200ms, ease-snap]
1000ms  Everything lifts and fades                           [400ms, ease-in]
1200ms  Hero overture begins
```

```js
const KEY = 'pl-booted';
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.dataset.boot =
  (sessionStorage.getItem(KEY) || reduce) ? 'skip' : (sessionStorage.setItem(KEY,'1'), 'play');
```

### 3.2 Cursor `[Tier 3]`

Fine-pointer only. Never on touch.

| State | Form |
|---|---|
| Default | 6px orange dot + 28px `--ink-400` ring, ring lerps at 0.15 |
| Over link | Ring expands to 44px, border orange, dot fades out |
| Over button | Ring snaps to the element's box, radius matches |
| Over media | 72px orange fill, mono "VIEW" inside |
| Pressed | Ring contracts 12%, `--t-instant` |
| Over text | 2px × 24px orange I-beam |

```js
let mx=0,my=0,rx=0,ry=0;
addEventListener('pointermove', e => { mx=e.clientX; my=e.clientY;
  dot.style.transform=`translate3d(${mx}px,${my}px,0)`; }, {passive:true});
(function loop(){ rx+=(mx-rx)*.15; ry+=(my-ry)*.15;
  ring.style.transform=`translate3d(${rx}px,${ry}px,0)`; requestAnimationFrame(loop); })();
```

The dot tracks instantly, the ring lags. That difference is what makes it feel physical.

### 3.3 Scroll progress `[Tier 3]`

2px orange bar, top edge, above the header. Native scroll timeline — zero JS, runs on the compositor.

```css
@supports (animation-timeline: scroll()) {
  .progress { height:2px; background:var(--brand-500); transform-origin:0 50%;
    animation: grow linear both; animation-timeline: scroll(root block); }
  @keyframes grow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
}
```

### 3.4 Page transition — the ignition wipe `[Tier 0]`

The site's signature transition. Reused wherever content replaces content.

```
OUT  0ms    Page scales to .98, opacity → 0                  [240ms, ease-in]
     120ms  Orange panel sweeps in from right, skewX(-3deg)  [380ms, ease-mech]
IN   400ms  Panel sweeps out to the left                     [420ms, ease-mech]
     520ms  New page scales .98→1, opacity → 1               [400ms, ease-out]
     560ms  Section 01 staggers up                           [--stagger-base]
```

The 3° skew is what sells it — a flat rectangle reads like a loading screen; a skewed one reads like a physical shutter.

```css
@view-transition { navigation: auto }
::view-transition-old(root) { animation: pg-out 240ms var(--ease-in) both }
::view-transition-new(root) { animation: pg-in 400ms var(--ease-out) 120ms both }
@keyframes pg-out { to { opacity:0; transform:scale(.98) } }
@keyframes pg-in { from { opacity:0; transform:scale(.98) } }
```

## GROUP B — Navigation

### 3.5 Header `[Tier 2]`

| State | Height | Surface | Rule |
|---|---|---|---|
| Top | 96px | transparent | none |
| Scrolled (>80px) | 64px | `--ink-900` @72% + `blur(16px)` | 1px `--rule` |
| Hidden (down, >400px) | — | `translateY(-100%)` | — |

Returns instantly on any upward scroll — `--t-quick`, `--ease-out`. Hiding a header is only acceptable if returning it is immediate.

```js
let last=0, ticking=false;
addEventListener('scroll', () => {
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => {
    const y = scrollY;
    header.dataset.state = y<80 ? 'top' : (y>last && y>400 ? 'hidden' : 'scrolled');
    last = y; ticking = false;
  });
}, {passive:true});
```

### 3.6 Wordmark `[Tier 2]`

Hover: letterforms compress on `wdth` 100 → 88 while the orange dot scales 1.4 and rotates 90°. `--t-base`, `--ease-snap`.

### 3.7 Nav links `[Tier 2]`

```css
.nav-link { position:relative; color:var(--text-muted);
  transition: color var(--t-fast) var(--ease-out) }
.nav-link::after {
  content:''; position:absolute; left:0; bottom:-4px; height:1px; width:100%;
  background:var(--brand-500); transform:scaleX(0); transform-origin:100% 50%;
  transition: transform var(--t-quick) var(--ease-out) }
.nav-link:hover { color:var(--text) }
.nav-link:hover::after { transform:scaleX(1); transform-origin:0 50% }
```

The underline wipes **out right, in from left** — the origin flips between states. It reads as directional travel rather than a symmetrical grow. Active page holds `scaleX(1)`.

### 3.8 Mega menu `[Tier 0]`

Hover intent: 120ms in, 300ms grace out. Click for keyboard.

```
0ms    Panel clips open, inset 0 0 100% 0 → 0 0 0 0     [420ms, ease-mech]
60ms   Orange rule sweeps left→right along the top edge [320ms, ease-out]
140ms  Column headers fade + rise 12px                  [320ms, stagger 40ms]
200ms  Links fade + rise 8px                            [280ms, stagger 30ms]
260ms  Featured card scales .96→1                       [400ms, ease-out]
```

`clip-path`, not height — compositor-only. Close at 240ms. Item hover: `--ink-700` wipes in from the left via `scaleX`, label shifts 4px right.

### 3.9 Mobile menu `[Tier 0]`

Full-viewport. On mobile the menu *is* a page — items are `--display-md`, not small nav text.

```
0ms    Hamburger morphs to X: top rotates 45°, bottom -45°, middle scaleX(0)  [280ms, ease-snap]
40ms   Orange panel sweeps up from bottom, skewY(2deg)→0                      [520ms, ease-mech]
280ms  Panel settles to --ink-900, orange stays as a 2px top edge             [320ms]
360ms  Items rise 32px + fade, wdth 84→100                                    [420ms, stagger 70ms]
620ms  Footer block (contact, socials) fades in                               [320ms]
```

Body locks via `overflow:hidden` with `scrollbar-gutter: stable`. Focus trapped, `Esc` closes, close at 320ms.

### 3.10 Sticky TOC · Back to top · Pagination · Breadcrumbs `[Tier 2]`

**TOC** — insight pages, left column, desktop. The active marker is one absolutely-positioned orange 2px element that *slides* between items, animating `translateY` and `height`. `--t-base`, `--ease-both`.

**Back to top** — appears after 800px, scaling `.8→1` with rotation `-90deg→0`, `--ease-snap`. Hover: arrow travels 4px up with a ghost arrow rising behind at 40%. Click: spins 360° during the scroll.

**Pagination** — "Load more" preferred. New cards stagger at `--stagger-base`. Label crossfades to a mono spinner mid-press.

**Breadcrumbs** — mono, `--text-faint`, orange `/` separators.

## GROUP C — Hero & rail

### 3.11 Hero overture `[Tier 0]`

The most important 1200ms on the site.

```
0ms     Rule grid ignites, vertical lines scaleY 0→1 from top, 40ms stagger  [520ms, ease-mech]
120ms   Eyebrow types in char by char, orange caret blinking                 [400ms, linear]
280ms   Headline line 1: wdth 78→100, opacity 0→1, translateY 24px→0         [640ms, ease-out]
390ms   Line 2, same
500ms   Line 3, same
760ms   Orange rule sweeps beneath the headline, scaleX 0→1                  [420ms, ease-out]
840ms   Subhead fades + rises 16px                                           [420ms]
960ms   CTAs scale .94→1, stagger 70ms                                       [320ms, ease-snap]
1080ms  Rail telemetry begins populating with measured values                [live]
```

```css
@keyframes set-type {
  from { opacity:0; transform:translateY(24px);
         font-variation-settings:'wdth' 78,'wght' 600,'opsz' 96 }
  to   { opacity:1; transform:translateY(0);
         font-variation-settings:'wdth' 100,'wght' 600,'opsz' 96 }
}
.hero-line { animation: set-type 640ms var(--ease-out) both;
  animation-delay: calc(280ms + var(--i) * 110ms) }
```

Type doesn't fade in — it *widens* into position, as though being set under pressure. `font-variation-settings` runs on the main thread; acceptable here because it's three lines, once, on an otherwise idle frame. **Never use it in a scroll handler.**

### 3.12 Instrument rail `[Tier 3 ambient / Tier 1 on section change]`

96px fixed left column, persistent sitewide. Contains, top to bottom: section number in mono, vertical scroll hairline, live telemetry, section-position tick.

**Values are measured, never hardcoded.** Wiring in `01-ARCHITECTURE.md` §6.3.

Values count up over 900ms in `tabular-nums`. The section number flips like a split-flap board on change — old digit rotates `-90deg` out, new rotates in from `90deg`, 240ms, `--ease-both`. A 1px orange tick pulses 0.4 → 1 opacity on a 3s cycle so the rail never looks dead.

Caption, mono, small: *Measured on your device, this page load.*

Below 900px the rail collapses to the top progress bar; telemetry relocates to a collapsible footer strip.

## GROUP D — Actions

### 3.13 Primary button `[Tier 2]`

```css
.btn-primary {
  background:var(--accent); color:var(--on-accent);
  font:500 var(--label)/1 var(--font-mono);
  letter-spacing:.08em; text-transform:uppercase;
  padding:var(--s-4) var(--s-6); border-radius:var(--r-md);
  position:relative; overflow:hidden; isolation:isolate;
  transition: transform var(--t-fast) var(--ease-snap),
              background var(--t-fast) var(--ease-out) }
.btn-primary::before {
  content:''; position:absolute; inset:0; z-index:-1;
  background:linear-gradient(100deg,transparent 20%,rgb(255 255 255/.28) 50%,transparent 80%);
  transform:translateX(-100%);
  transition: transform var(--t-slow) var(--ease-out) }
.btn-primary:hover { background:var(--accent-hover); transform:translateY(-2px) }
.btn-primary:hover::before { transform:translateX(100%) }
.btn-primary:active { transform:translateY(0) scale(.98); background:var(--accent-press);
  transition-duration:var(--t-instant) }
.btn-primary:focus-visible { outline:2px solid var(--brand-500); outline-offset:3px }
```

**Magnetic attraction** — within 80px the button drifts toward the cursor at 0.25 strength, capped at 8px.

```js
btn.addEventListener('pointermove', e => {
  const r = btn.getBoundingClientRect();
  const x = (e.clientX - r.left - r.width/2) * .25;
  const y = (e.clientY - r.top - r.height/2) * .25;
  btn.style.transform = `translate(${Math.max(-8,Math.min(8,x))}px,${Math.max(-8,Math.min(8,y))}px)`;
});
btn.addEventListener('pointerleave', () => btn.style.transform = '');
```

Three effects stack — magnetic pull, lift, sheen — each small. The layering is what reads as expensive.

### 3.14 Secondary, ghost, icon, tag `[Tier 2]`

**Secondary** — 1px `--rule-strong`, `--text` label. Hover: orange fill wipes up via `scaleY` with `transform-origin: bottom`, label crossfades to `--on-accent` at the midpoint. `--t-quick`.

**Ghost** — label only. Hover: orange `→` slides in from `-8px` while the label shifts 16px right.

**Icon button** — 40px square, `--r-sm`. Hover: `--surface-hover` scales from 0.8, icon rotates 8°. Press: `scale(.92)`, `--t-instant`.

**Tag / filter chip** — mono, `--r-sm`, 1px `--rule`. Hover: border orange. Active: solid orange, near-black label, `--ease-snap` overshoot. Deselect at 60% duration, no overshoot.

### 3.15 Inline links `[Tier 2]`

`--text-brand`, with a 1px underline at 40% opacity going solid and thickening to 2px on hover. Uses `background-size: 100% 1px → 100% 2px` so it animates without reflow.

## GROUP E — Sections & content

### 3.16 Section reveal `[Tier 1]` — the universal pattern

Every section enters identically. Consistency here is what makes Tier 0 moments feel special.

```
Trigger: IntersectionObserver, threshold .15, rootMargin '0px 0px -10% 0px'
0ms    Orange eyebrow rule scaleX 0→1, origin left  [420ms, ease-out]
80ms   Eyebrow label fades + rises 8px              [320ms]
160ms  Heading fades + rises 20px, wdth 92→100      [520ms, ease-out]
280ms  Body fades + rises 16px                      [420ms]
380ms  Children stagger, 70ms apart                 [420ms each]
```

**Fires once.** Re-animating on every scroll-past is the fastest way to make a premium site feel cheap.

```js
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.dataset.inview = 'true';
  io.unobserve(e.target);
}), { threshold:.15, rootMargin:'0px 0px -10% 0px' });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
```

### 3.17 Service card `[Tier 2]`

Mono index `01` · title · one-line description · orange arrow bottom-right.

Hover, all `--t-base` `--ease-out`: surface `--ink-800` → `--ink-700` · lifts 4px · border `--rule` → `--brand-500` · 2px orange rule wipes across the top edge · arrow travels 6px right and 6px up · index shifts `--text-faint` → `--brand-500`.

Six coordinated micro-changes. The composite is what lands.

### 3.18 System map `[Tier 0]`

Inline SVG. Five nodes connected by real dependencies — AI needs cloud, cloud needs quality engineering, mobile consumes the custom backend.

**Entrance:** nodes scale `0→1` with `--ease-snap`, 90ms stagger. Paths then draw via `stroke-dashoffset`, 520ms each, 60ms stagger, in `--data-steady`.

**Hover a node:** its paths go `--brand-500` and `stroke-width` 1→2. Connected nodes lift to `--ink-700`. Unconnected drop to 35% opacity. `--t-quick`.

**Ambient:** a 3px orange dot travels each path on a 4s loop.

```css
.map-pulse { offset-path: path('M40,60 L180,120');
  animation: travel 4s linear infinite }
@keyframes travel { from { offset-distance:0% } to { offset-distance:100% } }
```

Keyboard-navigable. Reduced-motion and mobile fall back to a stacked list.

### 3.19 Tabs `[Tier 2]`

The active indicator is **one** orange 2px element sliding between tabs — never one per tab fading in and out.

```js
function moveIndicator(tab) {
  const r = tab.getBoundingClientRect(), p = list.getBoundingClientRect();
  ind.style.transform = `translateX(${r.left - p.left}px) scaleX(${r.width/100})`;
}
```

`--t-base`, `--ease-both`. Panels crossfade: outgoing 140ms, incoming 280ms with a 12px rise, 60ms overlap.

### 3.20 Accordion `[Tier 2]`

`grid-template-rows: 0fr → 1fr` — animatable, unlike `height: auto`.

```css
.acc-body { display:grid; grid-template-rows:0fr;
  transition: grid-template-rows var(--t-base) var(--ease-both) }
.acc[open] .acc-body { grid-template-rows:1fr }
.acc-inner { overflow:hidden }
```

`+` rotates 135° to `×`, `--ease-snap`. Orange left border grows via `scaleY` from the top.

### 3.21 Process timeline `[Tier 1]`

Four phases. An orange line draws down the left, length tied to scroll. Each node ignites — `scale(0→1)`, `--ease-snap` — as the line reaches it; content fades in 80ms later.

`animation-timeline: view()` where supported, IntersectionObserver fallback. Never a scroll listener writing styles directly.

### 3.22 Metric counters `[Tier 1]`

```js
function countTo(el, target, decimals = 0, suffix = '') {
  const dur = 900, t0 = performance.now();
  const ease = t => 1 - Math.pow(1 - t, 3);
  (function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    el.textContent = (target * ease(p)).toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}
```

`font-variant-numeric: tabular-nums` is **mandatory** — without it every digit change reflows and CLS collapses. Number in `--brand-500`, label in `--text-muted`.

### 3.23 Logo marquee `[Tier 3]`

40s linear, duplicated track for a seamless loop. Logos at 45% opacity, `grayscale(1)`. Hover the strip: slows to 25% speed. Hover a logo: full opacity, grayscale off. Edges masked with a gradient so items fade rather than clip.

Renders only when non-placeholder logos exist. Otherwise omit the section entirely.

### 3.24 Testimonial slider `[Tier 1]`

Used on home, service pages, `/work`, and `/about`. Filterable by `industry` or `relatedWork` so a cloud page shows a cloud testimonial.

**Card anatomy**
```
┌──────────────────────────────────────┐
│  "                        ← orange, 64px, --display
│                                       │
│  Quote text, --body-lg, --text        │
│  120–340 characters (schema-enforced) │
│                                       │
│  ──────  ← 1px orange rule, 40px      │
│  NAME              ← mono, --text     │
│  Role, Company     ← mono, --text-faint│
│                          [logo, 24px] │
└──────────────────────────────────────┘
```

**Entrance `[Tier 1]`**
```
0ms    Orange " scales .7→1                              [420ms, ease-snap]
120ms  Quote reveals line by line via clip-path wipe     [380ms, stagger 60ms]
       (inset(0 100% 0 0) → inset(0 0 0 0))
340ms  Orange rule scaleX 0→1, origin left               [320ms, ease-out]
420ms  Attribution fades + rises 8px                     [320ms]
```

Line-by-line clip wipe rather than a whole-block fade. It reads as *being written* rather than appearing.

**Transition between quotes**
```
OUT  Current translateY(-16px), opacity → 0, scale .98   [240ms, ease-in]
IN   Next translateY(20px)→0, opacity 0→1                [380ms, ease-out, 100ms delay]
     Orange rule redraws                                 [320ms]
```

**Controls** — mono `01 / 06` counter, prev/next ghost buttons with arrow travel on hover, and a row of 2px dashes as position indicators. The active dash widens from 12px to 32px via `scaleX` and turns orange, `--t-base`, `--ease-both`.

**Autoplay** — 7s per quote, pauses on hover, focus, or tab blur. A 1px orange progress rule drains along the card's bottom edge via `scaleX`, giving the wait a visible shape. Disabled entirely under reduced motion.

**Height** — the container is sized to the tallest quote in the set at build time and locked, so transitions never cause layout shift. This is why the 340-character cap exists.

**Swipe** — horizontal drag on touch, with the card following the finger at 0.6 resistance and snapping past a 25% threshold.

**Empty state** — if no non-placeholder testimonials exist, the section does not render. Do not show an empty carousel.

### 3.25 Team card & grid `[Tier 1 / Tier 2]`

**Grid** — leadership row first, larger cards, 2–3 across. Remainder in a 3–4 column grid. Reveals with the universal pattern, `--stagger-base`.

**Card anatomy**
```
┌─────────────────┐
│ ┌─────────────┐ │  Photo, 4:5, grayscale(1) at rest
│ │             │ │  --r-md, --ink-800 background
│ │   [photo]   │ │
│ └─────────────┘ │
│ NAME            │  --heading, --text
│ Role            │  mono, --text-brand
│ Specialism tags │  mono, --text-faint
└─────────────────┘
```

**Hover `[Tier 2]`**, all `--t-base` `--ease-out`:
- Photo `grayscale(1) → grayscale(0)` and scales `1 → 1.04` inside a fixed-overflow frame
- An orange rule wipes across the top edge of the photo via `scaleX`
- Card lifts 4px
- Name shifts 4px right
- A mono LinkedIn glyph fades in at the top-right of the photo, rising 8px

Grayscale-to-colour on hover is the one place the site uses photography as an effect, and it works because the team page is the only place with real faces.

**Placeholder state** — where `photo` is absent, render a `--ink-800` block with the member's initials in `--display-md`, `--text-faint`, centred, and a 1px `--rule` border. It should look deliberate, not broken. Hover still lifts and reveals the rule.

**Detail** — clicking opens a modal (§3.32) with the full bio, specialisms, and LinkedIn link. Not a separate route.

### 3.26 Case study card `[Tier 2]`

The largest card on the site. Hover: image scales `1 → 1.04` inside a fixed frame while an orange overlay wipes up from the bottom to 12% opacity · title shifts 8px right · a mono "VIEW CASE" label rises 12px into view · metadata fades `--text-faint` → `--text-muted`. `--t-base`.

Click: the card's bounding box becomes the origin of the ignition wipe.

### 3.27 Insight card, filters, code, tables, images `[Tier 2]`

**Insight card** — cluster tag, title, excerpt, reading time. Hover: orange left border grows via `scaleY` from the top, title → `--brand-500`, card lifts 3px.

**Filters** — on change, non-matching cards fade and scale to `.96` (180ms), grid reflows via FLIP, matching cards restagger at `--stagger-base`. Empty result renders the empty state with a reset action.

**Code block** — `--ink-700`, 1px `--rule`, 3px orange left border. Copy button slides down 8px on hover; on copy it morphs to a checkmark for 1.6s with `--ease-snap`.

**Table** — row hover: `--surface-hover` wipes in from the left via `scaleX`. Sortable headers show an orange arrow rotating 180° on direction change.

**Image reveal** — an orange panel covers the image then wipes away via `translateX` while the image scales `1.08 → 1`. 620ms, `--ease-mech`. The counter-motion is what gives it weight.

## GROUP F — Forms & contact

### 3.28 Text input & textarea `[Tier 2]`

```css
.field { background:var(--ink-800); border:1px solid var(--rule-strong);
  border-radius:var(--r-sm); padding:var(--s-4);
  transition: border-color var(--t-fast) var(--ease-out),
              background var(--t-fast) var(--ease-out) }
.field:hover { border-color:var(--ink-400) }
.field:focus { border-color:var(--brand-500); background:var(--ink-700); outline:none }
```

**Focus underline** — a 2px orange rule scales X from 0 to 1 along the bottom edge, `--t-quick`. The border change alone is too quiet to serve as the focus affordance.

**Floating label** — mono. On focus or fill it translates up 22px and scales to 0.82, `transform-origin: 0 0`, `--t-quick`, `--ease-both`, colour → `--brand-500`.

**Textarea** — plus a mono character counter bottom-right, `--brand-500` at 80% of limit, `--danger` at 100%.

**Validation** — error slides down 8px and fades in, `--t-quick`. Field border → `--danger` with a 3-cycle 4px horizontal shake at 60ms per cycle. Success: border pulses `--success` once, 400ms.

### 3.29 Select, checkbox, radio `[Tier 2]`

**Select** — custom. Panel clips open downward, 240ms `--ease-out`, options stagger 30ms. Hover: orange left border grows via `scaleX`.

**Checkbox** — 18px, `--r-sm`. On check the box fills orange from centre (`scale(0→1)` pseudo-element) and the tick draws via `stroke-dashoffset`, 200ms. Uncheck: 120ms, no draw.

**Radio** — orange dot scales `0→1` with `--ease-snap`.

### 3.30 Contact form `[Tier 1]`

Fields per `01-ARCHITECTURE.md` §8. Two-column on desktop for name/email and budget/timeline; message full width.

```
Press    Button scales .98                                      [80ms]
Loading  Label crossfades to three mono dots pulsing in sequence [loop, 1.2s]
Success  Button animates to a square, orange fill,
         checkmark draws via stroke-dashoffset                   [520ms, ease-snap]
         Fields fade + fall 12px                                 [320ms, stagger 40ms]
         Confirmation panel rises 24px + fades in                [480ms, ease-out]
Error    Shake 4px × 3, inline message slides down               [240ms]
```

The success state replaces the form rather than sitting above it. Confirmation copy in `03-CONTENT.md` §6.

### 3.31 Contact block `[Tier 1]`

Sits beside the form. Mono throughout — this is data, and mono is the site's voice for data.

```
┌────────────────────────────────┐
│ EMAIL                          │  --label, --text-faint
│ contact@privolabs.com          │  --body, --text-brand, link
│ ────────────────────────────   │  1px --rule
│ PHONE                          │
│ {{PHONE}}                      │  tel: link
│ ────────────────────────────   │
│ OFFICE                         │
│ {{ADDRESS_LINE_1}}             │  --body, --text
│ {{ADDRESS_LINE_2}}             │
│ {{ADDRESS_CITY_STATE_POST}}    │
│ {{ADDRESS_COUNTRY}}            │
│ ────────────────────────────   │
│ HOURS                          │
│ Mon–Sat  08:00 – 18:00         │  tabular-nums
│ Sunday   Closed                │
│ ────────────────────────────   │
│ [in] [yt] [ig]                 │  social, icon buttons
└────────────────────────────────┘
```

**Reveal** — each row's 1px rule draws left to right via `scaleX`, 320ms, staggered 80ms; the row's content fades in 60ms behind its rule. The block assembles itself line by line, like a readout.

**Email hover** — the address underlines with the standard link treatment and a mono `COPY` affordance fades in at the right. Clicking it copies and swaps to `COPIED` for 1.6s.

**Hours** — the current day's row highlights with a 2px orange left border and `--text` instead of `--text-muted`, computed client-side. A small detail that makes a static block feel live.

**No embedded map.** A Google Maps iframe costs 500kB+ and a consent obligation. Render the address as text with a "Get directions" ghost link opening a maps URL in a new tab.

## GROUP G — Feedback & global

### 3.32 Toast, modal, tooltip, skeleton, empty, 404

**Toast** — enters bottom-right, `translateY(24px)` + `scale(.94→1)`, `--t-base`, `--ease-snap`. A 2px orange rule drains along the bottom via `scaleX` over the display duration. Exit 200ms. Stacked toasts shift at 40ms stagger.

**Modal `[Tier 0]`** — scrim fades to `rgb(6 8 10/.8)` with `backdrop-filter: blur(8px)`, 240ms. Panel scales `.96→1` and rises 20px, 380ms `--ease-out`, 60ms after the scrim. Orange 2px rule sweeps across the top edge. Close 220ms. Focus trapped, `Esc` closes, focus returns to trigger.

**Tooltip** — 120ms delay in, 6px translate from the trigger, `--t-fast`. Out is instant.

**Skeleton** — `--ink-800` blocks with a shimmer sweeping left to right, 1.4s linear, using an orange-tinted highlight at 6% rather than white. Even loading carries the brand.

**Empty state** — a 1px orange rule, a mono line of copy, and a single action. Never an illustration.

**404 `[Tier 0]`** — a huge `--display-xl` "404" in Bricolage, `wdth` oscillating 75 ↔ 100 on a 6s loop, orange. A mono line beneath and a return link. Entirely typographic.

### 3.33 CTA band `[Tier 0]`

The one place orange takes full viewport width — earned because it appears once per page, at the end.

Entrance: the orange field wipes up from the bottom with `skewY(1.5deg)` settling to 0, 620ms `--ease-mech`. Headline sets in near-black with the `wdth` expansion. Button inverted — ink fill, orange label — scaling in with `--ease-snap`.

Ambient: a 40s linear gradient drift across the field, 4% amplitude. Almost subliminal; stops a large flat area looking dead.

### 3.34 Footer `[Tier 1]`

Reveals like any section. Column headers rise 12px, links stagger at 40ms.

Link hover: orange, shifting 4px right, with an orange `→` fading in from `-6px`. Social icons scale `1→1.12` and rotate `-6deg`, `--ease-snap`.

The wordmark sits oversized and clipped at the bottom edge, 6% opacity in `--bone`, dot in full orange — the only saturated element down there.

On mobile, the rail's telemetry relocates here as a collapsible strip.

### 3.35 Global details `[Tier 2/3]`

**Focus ring** — 2px `--brand-500`, 3px offset, `--r-sm`, via `:focus-visible`. Never removed, never subtle.

**Selection** — `::selection { background: var(--brand-500); color: var(--ink-900) }`

**Scrollbar** — 10px track `--ink-900`, thumb `--ink-600` → `--brand-500` on hover, `--r-full`.

**Grain** — SVG `feTurbulence` overlay at 2.5% opacity, `mix-blend-mode: overlay`, fixed. Kills banding on large dark fields. Under 1kB, no repaint cost.

---

# PART 4 — Scroll choreography

The homepage as a single score. Tier 0 moments never collide.

| Position | Section | Tier | Signature |
|---|---|---|---|
| 0vh | Hero | **0** | Width-axis type expansion |
| 100vh | Thesis panels | 1 | Three panels stagger, orange rules draw |
| 180vh | System map | **0** | Nodes ignite, paths draw, pulses travel |
| 280vh | Proof — metrics + logos | 1 | Counters run, marquee starts |
| 340vh | Testimonials | 1 | Line-by-line quote wipe |
| 420vh | Process timeline | 1 | Scroll-linked orange line draws down |
| 500vh | Capability tabs | 2 | Sliding indicator, panel crossfade |
| 570vh | Insights teaser | 2 | Cards stagger |
| 640vh | CTA band | **0** | Full-bleed orange skew wipe |
| 720vh | Footer | 1 | Column stagger, oversized wordmark |

Three Tier 0 moments, roughly 300vh apart. That spacing is the design.

---

# PART 5 — Guardrails

## 5.1 Reduced motion

A different designed experience, not a degraded one.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration:.01ms !important;
    animation-iteration-count:1 !important;
    transition-duration:.01ms !important;
    scroll-behavior:auto !important }
}
```

- Boot sequence skipped
- Reveals become instant opacity, no transform
- Counters render final values immediately
- Telemetry still shows **real numbers** — it just doesn't count to them
- System map renders static with all paths visible
- Marquee stops; logos in a static grid
- Testimonial autoplay off; manual controls remain
- Custom cursor disabled
- Page transitions become a 100ms crossfade
- Hover states remain — colour and border changes are not motion

## 5.2 Never animate

- Body copy — text that moves while being read is hostile
- Anything triggered more than once on the same scroll pass
- Layout properties: `width`, `height`, `top`, `left`, `margin`, `padding`
- Focus rings — instant, always
- Validation messages — the field may shake; the message may not be delayed
- Anything blocking interaction beyond 200ms
- The header on every scroll pixel — three discrete states only

## 5.3 QA checklist

- [ ] White text never on `--brand-500` (Rule 1, §1.4)
- [ ] Light mode uses `--brand-700` for orange text under 24px (Rule 2)
- [ ] Orange ≤ 5% of any viewport at rest, CTA band excepted
- [ ] No two Tier 0 moments visible at once
- [ ] Every reveal fires exactly once
- [ ] Full keyboard traversal, visible focus at every stop
- [ ] Reduced-motion pass reviewed as a designed state
- [ ] Every counter uses `tabular-nums`
- [ ] Testimonial slider height locked; no shift on transition
- [ ] Rail telemetry measured, never hardcoded
- [ ] Placeholder testimonials and team members excluded from the production build
- [ ] 60fps sustained on mid-tier Android through the full scroll
- [ ] Boot sequence fires once per session, never blocks interaction

---

## The five things this is remembered for

1. **Width-axis typography** — headlines expand into place rather than fading.
2. **The ignition wipe** — a skewed orange sweep carrying every transition.
3. **The live telemetry rail** — real performance numbers from the visitor's own browser. Claim and proof are the same object.
4. **Black on orange** — the accessible choice and the industrial-signage choice, identical.
5. **Restraint between the moments** — three Tier 0 beats, 300vh apart, everything between them quiet. That's the only reason the three land.
