# Handoff: Usama Danish — Senior Frontend Engineer Portfolio

## Overview
A polished, responsive single-page portfolio site. The strategy (from the design brief): position Usama as a **senior frontend engineer who builds high-performance, complex product UIs** — industry-neutral — using his trading/fintech work as *evidence*, never as a category label. The site itself is the portfolio piece: it must feel as good as the work it describes.

The centerpiece is a **live, interactive "Latency Lab"** demo (synthetic real-time data grid) — chosen over screenshots because Usama's best work is behind bank logins / under NDA and can't be shown. A recruiter should think, within ten seconds, *"this person can really build."*

## About the Design Files
The files in this bundle are **design references created in HTML** — a streaming "Design Component" (`.dc.html`) prototype showing the intended look, copy, layout, and behavior. **They are not production code to copy directly.**

The task is to **recreate this design in the target production stack** (see *Target Stack* below) using that stack's established patterns and libraries. The `.dc.html` format is a proprietary prototyping runtime — do **not** try to ship it; read it as a spec for markup structure, exact styles, copy, and interaction logic.

`Portfolio.dc.html` contains three parts you can read directly:
- The **template** (markup between `<x-dc>` … `</x-dc>`) — structure + inline styles.
- A **logic class** (`class Component extends DCLogic`) in the `<script data-dc-script>` block — all the JS: the live price random-walk, FPS meter, IO-gating, theme toggle, role-switcher, and the honest `performance.now()` readout.
- Inline styles throughout — there is **no external stylesheet**; every value is inline (this is a constraint of the prototype format, not a requirement for production — use your stack's styling system).

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy, and interactions are all specified. Recreate the UI pixel-accurately using the target codebase's libraries and patterns. Exact tokens are in *Design Tokens* below.

One deliberate caveat, called out per the brief: in this prototype the Latency Lab's performance toggles are **visually mocked** (the FPS number is driven toward a target based on which toggles are on). In production these must be made **genuinely functional** — see *Phase D / Latency Lab: build for real*.

## Target Stack
Per the brief, build in:
- **Next.js (App Router)** · **TypeScript** · **Tailwind CSS**
- **Lenis** (smooth scroll) · **GSAP + ScrollTrigger** (scroll-driven motion) · **Framer Motion** (component state/transitions)
- **next-intl** (or similar) for i18n
- Deploy to **Vercel**

Using the Lenis + GSAP + ScrollTrigger stack is itself part of the signal — it's the recognizable "engineer who follows the craft" toolset.

## Build phases (do in order — do NOT boil the ocean)
The full surface (3 languages + 2 themes + responsive + motion + a real live demo) is large. Phase it:

- **Phase A — the site, English, both themes, responsive.** ✅ *This is what the prototype represents.* Full structure, light + dark themes, responsive, all five sections. Latency Lab + role-switcher as visually complete mocked states. i18n *architecture* established (dictionaries + logical properties) with English strings only.
- **Phase B — motion craft.** Lenis smooth-scroll feel, GSAP/ScrollTrigger reveals, the timeline "draw" animation, hover states. This is where the "buttery" comes from.
- **Phase C — DE + AR + RTL.** German and Arabic dictionaries; full RTL mirror for Arabic (QA every section in `dir="rtl"`).
- **Phase D — make the Latency Lab real + ship.** Real SSE/seeded-PRNG feed, genuinely-toggleable batching/virtualization/memo, final motion tuning, performance pass (LCP/CLS/Lighthouse), deploy.

The prototype is the Phase A milestone. Start there in the real codebase, then layer B → C → D.

---

## Screens / Views
Single page, vertical scroll, five sections in this order: **Hero → Latency Lab → Case Study → The Craft → About/Contact**, with a sticky top nav and a footer.

### Sticky Nav
- **Layout:** `position: sticky; top: 0`, 64px tall, flex space-between, translucent background with `backdrop-filter: saturate(1.4) blur(14px)`, 1px bottom hairline.
- **Left:** brand — a 9px accent-colored dot + "Usama Danish" (weight 600, letter-spacing -0.01em), links to `#top`.
- **Right:** nav links (`Latency Lab` `#lab`, `Case study` `#case`, `About` `#about`) at 14.5px, muted color; a **language switcher** (EN active / DE / AR — DE & AR disabled placeholders in Phase A, wired in Phase C); a **theme toggle** button (34px square, shows ☾ in light mode, ☀ in dark).
- **Responsive:** nav links hide below 560px; language switcher + theme toggle remain.

### 1. Hero (full-bleed cinematic)
- **Purpose:** Immediate confident positioning + a subtle live-motion flex.
- **Layout:** A rounded (22px) full-bleed dark panel, `min-height: clamp(500px, 82vh, 760px)`, content bottom-aligned (`flex-direction: column; justify-content: flex-end`). Padding `clamp(30px, 6vw, 64px)`.
- **Background (layered, z-index order):**
  - z0: an **image slot** filling the panel — optional user photo (16:9, `object-fit: cover`). Looks intentional empty; a real photo can be dropped behind the text later.
  - z1: a **designed animated data composition** (shown when no photo): a radial blue glow top-right (`rgba(11,92,255,.28)`), a subtle green glow bottom-left (`rgba(0,230,138,.12)`), over a dark diagonal gradient (`#0A0B0D → #0E1117 → #0A0B0D`). On top, an **animated `<canvas>` particle-network**: ~46 slow-drifting points, lines drawn between points closer than 150px (opacity fades with distance, color `rgba(120,160,255, …)`), 1.6px point dots (`rgba(180,205,255,.55)`). Runs on `requestAnimationFrame`, IO-gated (pauses when off-screen), DPR-capped at 2.
  - z2: bottom scrim gradient (transparent → `rgba(8,9,11,.82)`) for text legibility.
  - z3: headline content. z4: live FPS chip.
- **Live FPS chip (top-right):** pill, `rgba(10,11,13,.5)` + blur, 1px `rgba(255,255,255,.16)` border. Green 6px pulsing dot + `live · <b>60</b> fps` (tabular-nums; number eases around 57–61 with slight jitter for a "live" feel).
- **Content:**
  - Kicker: green/blue 6px pulsing dot + "Senior Frontend Engineer · Berlin · 8+ years" (13px, `rgba(185,189,196,.95)`, letter-spacing .03em).
  - **H1:** "I build product interfaces that stay fast when the data doesn't slow down." — `font-size: clamp(34px, 6vw, 72px)`, line-height 1.03, letter-spacing -0.03em, weight 600, white, `text-wrap: balance`, max-width 18ch, soft text-shadow.
  - Sub-paragraph: "Eight years of demanding, real-time product UIs where being wrong is expensive. The hardest thing I've built is behind a bank login — so instead of a screenshot, here's a live one running in your browser." — `clamp(16px,1.9vw,20px)`, `rgba(232,233,235,.78)`, max-width 54ch, line-height 1.6.
  - Chips: `Wealth & trading` · `Health` · `Marketplaces` · `Esports data` — pill chips, `rgba(255,255,255,.08)` bg, 1px `rgba(255,255,255,.14)` border, 12.5px.
- **Below the panel:** a "scroll ↓ the live demo" affordance (faint, mono-feel label, tabular).

### 2. Latency Lab (ALWAYS dark, regardless of site theme) — the centerpiece
- **Purpose:** The one thing a recruiter can't get elsewhere — a live real-time grid that proves performance skill. Its *meaning* is industry-neutral: "any interface where data moves fast and being wrong is expensive," **not** "trading floor."
- **Critical:** this section uses its **own fixed dark palette** even when the site is in light mode. The scroll from the calm bright site into this dark high-density grid is a deliberate contrast moment.
- **Layout:** full-width dark band, `padding-block: clamp(70px,11vh,120px)`, 1px top/bottom hairlines. Inner content max-width 1160px.
  - **Header row:** left — an uppercase green kicker "The centerpiece" + H2 "Latency Lab" (`clamp(30px,5vw,52px)`); right — a `⟨ synthetic data ⟩` pill (permanent, load-bearing) with a green pulsing dot.
  - **Intro paragraph:** "11,000 instruments, prices arriving continuously. The naïve version drops to ~12fps on a mid-range laptop — the kind of lag where, in any interface where data moves fast, the thing you act on is already out of date. Flip the switches. It genuinely stutters."
  - **Two-column body** (`data-lab-side`, stacks on mobile ≤820px):
    - **Left column (240–300px):** three toggle switches + two meter cards + a naïve-mode warning strip.
    - **Right column (flex:1):** the instrument grid.
- **Toggles (three):** custom switch controls. Label + sub-label showing the good/bad state:
  - `Naïve rendering` — off: "batched RAF" / on: "re-render / tick"
  - `No virtualization` — off: "windowed rows" / on: "all 11k rows"
  - `No memoization` — off: "memoized cells" / on: "recompute all"
  - Switch turns red (`--lab-down`) when ON (i.e., the harmful state is engaged).
- **Meters (two cards):** `FPS` and `Dropped` — 34px tabular-nums numbers. FPS number is color-coded: red < 30, amber (`#FFB020`) < 52, else default light. "Dropped" increments while FPS < 55.
- **Naïve mode:** flipping it on shows a warning strip "naïve mode · auto-disarms in {N}s" and **auto-disarms after 15 seconds** (countdown). This is a real requirement — nobody's laptop fan should be the memory of the site.
- **Grid:** header row (`Sym` · `Instrument` · `Last` · `Chg`) then ~50 rows. Columns: `64px 1fr 96px 92px`, `max-height: 440px`, scrolls. Each row: symbol (weight 600), instrument name (muted, ellipsized), last price (tabular), change % (tabular).
  - **Live behavior:** seeded PRNG generates the initial instrument list (fictional symbols — AXTR, BNDL, CRVX, DLTA, EQNX, FLUX, GRVT, HLIX, …); prices then random-walk continuously via RAF (throttled ~55ms, ~90ms in naïve mode). Change % colors: **green (`--lab-up`) for positive, red (`--lab-down`) for negative, muted for flat.**
  - **The color rule (important):** green and red appear **only** on live data / value deltas — never on a button, heading, or decoration. In a trading UI color is semantic; that restraint is the visual argument.
- **Symbols must be obviously fictional.** No real instruments, no client data.
- **IO-gated:** the whole animation costs nothing until scrolled into view (pauses when out of view).
- **Footnote:** "Symbols are fictional · green & red mark live deltas only · real toggles ship in the code build".
- **Responsive (≤820px):** toggles stack above grid; grid drops the `Instrument` name column (→ 3 columns: symbol · last · change).

### 3. Case Study — ENBD Wealth Pro
- **Purpose:** One story told well, narrative-forward (no screenshots). Framed as "a hard problem I solved," not "my trading credentials." Structure: problem → constraint → decision → outcome.
- **Layout:** max-width 1160px, generous vertical padding.
  - **Intro:** uppercase accent kicker "Case study · a hard problem I solved"; H2 "One platform, three user types who must never see the same screen, four jurisdictions that disagree." (`clamp(28px,4.6vw,48px)`); paragraph: "A high-net-worth wealth & trading SaaS at Emirates NBD — live in Dubai, KSA and Singapore, with London in progress. I owned it from ideation and POCs through architecture to production."
  - **Four step cards** (`repeat(auto-fit, minmax(230px, 1fr))`): each has a mono-feel numbered accent label + title + body:
    1. **Problem** — "Three user types, one platform" — "Advisor, compliance and client must never see the same screen — and the rules differ by jurisdiction."
    2. **Constraint** — "Four jurisdictions that disagree" — "Dubai, KSA, Singapore, and London in progress — each with its own regulatory shape."
    3. **Decision** — "Capability-based rendering" — "Components declare capabilities they need; roles resolve to capability sets, decoupled from identity."
    4. **Outcome** — "New market, zero rewrites" — "A new jurisdiction is a new capability map — no component changes. Owned end to end."
  - **Timeline strip (important graphic):** a horizontal timeline 2023 → 2026 inside a surface card. Two bars:
    - "ENBD X · Angular" — starts ~2% from left, width ~40% (starts 2023, **stops mid-2024**), muted surface style.
    - "Wealth Pro · React · TypeScript · Next.js" — starts ~44%, width ~60%, **runs off the right edge**, accent-colored + brighter, with an edge-fade gradient on the right. Year labels: 2023 / 2024 / 2025 / 2026 →. Caption: "Two years React, current and ongoing. One year Angular before it."
    - **Phase B:** animate the bars "drawing" in on scroll (GSAP ScrollTrigger, width 0 → target).
  - **Role-switcher (second interactive beat):** a surface card titled "Capability-based rendering" with body copy and an "illustrative · not client UI" pill. Three buttons — **Advisor / Compliance / Client** — re-render a synthetic panel grid. Panels appear/disappear per role (list below). Buttons stack full-width on mobile.
    - Panel → roles mapping (synthetic, illustrative):
      - Positions overview (advisor, client) · Order ticket (advisor) · Suitability checks (advisor, compliance) · Compliance flags "12 open · 3 escalated" (compliance) · Audit trail (compliance) · Statements & reports (client, advisor) · Advisory notes (advisor) · Document vault (client).
  - **Outcome stat:** large accent "$500K+" + "generated within two weeks of a bond-trading launch I led — cleared to publish."

### 4. The Craft
- **Purpose:** Show attention to detail rather than claim it — via an honest measurement.
- **Layout:** two-column (`repeat(auto-fit, minmax(280px, 1fr))`), 1px top hairline.
  - Left: uppercase kicker "The craft"; H2 "Attention to detail isn't a bullet point. It's a measurement."; paragraph explaining the number is a real `performance.now()` reading taken on the visitor's device when the section mounted.
  - Right: a surface card with a big tabular number + "ms", label "synthetic layout pass · this device", and "<N> ops · measured, not claimed".
  - **Behavior:** on mount, run a fixed-count arithmetic loop (350,000 ops), time it with `performance.now()`, display the elapsed ms and op count. Honest, device-specific, no vanity number.

### 5. About + Contact
- **Layout:** two-column (`1.5fr / 1fr`), 1px top hairline.
  - Left: uppercase kicker "About"; lead line "Eight years building demanding product interfaces." (weight 500, `clamp(19px,2.6vw,27px)`); paragraph: "Trading and wealth platforms most recently at Emirates NBD — but also health (a fertility & mental-health app), consumer marketplaces, and esports data infrastructure for Swedish clients. The common thread is complex state, real-time data, and interfaces where being wrong is expensive."
  - **Thesis blockquote** (accent left border): "Two years React. One year Angular before it. Eight years of demanding frontend underneath. The framework was never the hard part."
  - Right: a **portrait image slot** (4:5, striped placeholder labeled "portrait — drop a 4:5 image"; hidden below 820px).
  - **Three-column info row** (`repeat(auto-fit, minmax(240px,1fr))`, each with a top strong-hairline):
    - **Languages:** "English — professional" / "German — A1, actively studying, targeting B1 in 2026".
    - **Work status:** "EU Blue Card eligible on offer (Chancenkarte). No sponsorship cost, no relocation delay — available immediately."
    - **Get in touch:** links — `usamadanish22@gmail.com` (mailto), `linkedin.com/in/usama-danish`, `Download CV (PDF)`.
- **Footer:** "© 2026 Usama Danish · Berlin" + "built as the portfolio piece itself".
  - Optional honest performance line — `LCP < 1.2s · CLS 0 · Lighthouse 100 — measured, not claimed` — **add only if genuinely measured** (deferred; not in the prototype).

---

## Interactions & Behavior
- **Theme toggle:** switches a `data-theme` attribute on `<html>` between `light`/`dark`; persists to `localStorage` (`ud-theme`); respects `prefers-color-scheme` on first load (inline script sets it before paint to avoid a flash). The Latency Lab ignores theme — always dark.
- **Scroll reveals:** elements marked `data-reveal` start at `opacity:0; translateY(22px)` and animate to visible via IntersectionObserver (threshold 0.12, rootMargin bottom -8%). Respect `prefers-reduced-motion` (skip transforms). **Phase B:** upgrade to GSAP ScrollTrigger + Lenis for the buttery feel.
- **Latency Lab RAF loop:** price random-walk + FPS meter + dropped-frame counter; IO-gated; naïve mode auto-disarms after 15s.
  - *Prototype mock:* FPS eases toward a target derived from which toggles are on (naïve ≈ 11–15fps; no-virtualization −22; no-memo −9). **Phase D replaces this with genuinely-toggleable rendering (see below).**
- **Role-switcher:** clicking Advisor/Compliance/Client filters the synthetic panel set; panels transition opacity/transform.
- **Hover states (Phase B):** add physics-based / eased hovers on cards, buttons, nav links per the "obsessive craft" reference feel.

## Phase D / Latency Lab: build for real (non-negotiable — this is the credibility)
In production the three toggles must **genuinely** change rendering, so the stutter is real and survives an interview question:
- **Naïve rendering** — off: batched RAF state updates; on: force a synchronous re-render every tick.
- **Virtualization** — off: windowed/virtualized rows (e.g. react-virtual); on: actually render all ~11,000 rows.
- **Memoization** — off: memoized cells (`React.memo`/`useMemo`); on: no memo, recompute every cell.
- Feed: real SSE stream or a seeded PRNG random-walk driven by RAF, so it looks like a market, not noise.
- FPS/dropped counters must reflect **real** measured frame timing, not a mock target.
- Keep: fictional symbols, the permanent `⟨ synthetic data ⟩` chip, the 15s auto-disarm, IO-gating.

## State Management
- `theme`: 'light' | 'dark' (persisted).
- `locale`: 'en' | 'de' | 'ar' (Phase C) + document `dir` ('ltr' | 'rtl').
- Latency Lab: `naive`, `noVirtual`, `noMemo` booleans; `naiveLeft` countdown; live per-row price/open/change state; `fps`, `dropped`.
- Case study: `role`: 'advisor' | 'compliance' | 'client'.
- Data fetching: none in Phase A (synthetic). Phase D: SSE endpoint for the lab feed.

## Internationalization (Phase C — architect from day one)
- All copy in per-language dictionaries (`en`, `de`, `ar`) — never hardcoded in components. German must be professionally phrased, not machine-dumped.
- Use **logical properties** (`margin-inline`, `padding-inline`, `inset-inline-start/end`, `start`/`end`) not physical `left`/`right`, so RTL is a `dir` flip, not a rewrite. *The prototype already uses logical properties throughout* — preserve this.
- **Arabic = full RTL:** the entire layout mirrors — reading direction, margins/padding, the case-study timeline direction, scroll/animation origins, and the lab grid column order. Usama built exactly this at ENBD, so it's a real credibility signal — QA every section in `dir="rtl"`.
- Language switcher + theme toggle must coexist cleanly.

## Responsive
Mobile-first quality, not a desktop shrink.
- **Hero:** display size scales via `clamp()`; chips wrap.
- **Latency Lab (≤820px):** toggles stack above grid; grid → 3 columns (symbol · last · change), fewer visible rows.
- **Case study:** role buttons stack full-width; panels stack; timeline scrolls horizontally with an edge-fade on mobile.
- **About:** portrait hides below 820px; info columns wrap.
- **Motion:** heavy scroll effects lighten on mobile for performance.

---

## Design Tokens

### Colors — site (themeable)
| Token | Light | Dark |
|---|---|---|
| bg/base | `#FBFBF9` | `#0A0B0D` |
| bg/surface | `#FFFFFF` | `#141619` |
| bg/surface-2 | `#F4F4F1` | `#1C1F24` |
| text/primary | `#16171A` | `#E8E9EB` |
| text/muted | `#6B7078` | `#7A7F87` |
| text/faint | `#A0A4AB` | `#4A4F57` |
| line/hairline | `rgba(0,0,0,.08)` | `rgba(255,255,255,.06)` |
| line/strong | `rgba(0,0,0,.14)` | `rgba(255,255,255,.12)` |
| accent | `#0B5CFF` | `#4D8DFF` |
| accent-soft | `rgba(11,92,255,.08)` | `rgba(77,141,255,.12)` |

Accent is a calm blue — used for links, focus, one accent. **Never green** for site chrome.

### Colors — Latency Lab (fixed, theme-independent)
| Token | Value |
|---|---|
| lab/bg | `#0A0B0D` |
| lab/surface | `#141619` |
| lab/surface-2 | `#1C1F24` |
| lab/text | `#E8E9EB` |
| lab/muted | `#7A7F87` |
| lab/faint | `#4A4F57` |
| lab/line | `rgba(255,255,255,.08)` |
| lab/up (positive delta ONLY) | `#00E68A` |
| lab/down (negative delta ONLY) | `#FF4D4D` |
| fps amber threshold | `#FFB020` |

### Typography
- **Single typeface: Inter Tight** (Google Fonts, weights 400/500/600/700), everywhere — display, body, labels, and data. (The design deliberately uses one font.)
- Headings: tight tracking (letter-spacing -0.02 to -0.03em), weight 600.
- Body: 17px base, line-height ~1.65.
- **Data / numbers:** always `font-variant-numeric: tabular-nums` so digits don't jitter as they update (FPS, prices, dropped count, the ms readout, the $500K+ stat).
- Kicker/eyebrow labels: ~11–13px, uppercase, letter-spacing .06–.08em, muted or accent color.

### Spacing / radius / other
- Section vertical padding: `clamp(70px, 11vh, 150px)`.
- Content max-width: 1160px; inline padding `clamp(20px, 5vw, 48px)`.
- Border radius: chips/pills 999px; cards 12–16px; hero panel 22px; small dots 2px.
- Reveal transition: `.8s cubic-bezier(.2,.7,.2,1)`, translateY(22px) + opacity.
- Backdrop blur: nav 14px; hero chip 10px.

## Assets
- **Fonts:** Inter Tight via Google Fonts.
- **Images:** none shipped. Two user-fillable image slots exist as labeled placeholders:
  - Hero background — optional 16:9 photo (`hero-photo`).
  - About portrait — 4:5 photo.
  Replace with real assets in production (Next.js `<Image>`). The hero is intentionally strong with **no** photo (the animated canvas composition carries it).
- **Canvas particle-network:** generated at runtime (no asset).
- **CV:** `usamadanish22@gmail.com` CV PDF — wire the "Download CV (PDF)" link to the hosted file. (Usama's source CV is included in this bundle for content reference.)
- **No SVG illustrations / no emoji.**

## Content note
All copy has been reconciled against Usama's CV (included). Key verified facts: 8+ years; React/Next.js/TypeScript primary; 11,000+ real-time items with SSE at ENBD; micro-frontends (Module Federation); bank-wide design system with multilingual Arabic/English RTL components; a launch generating $500K+ within two weeks; breadth across wealth/health (Tilly), marketplaces (BrightBee), esports data (Pluck GG), wellness (Miracle Morning); GDPR-compliant delivery for Swedish clients; English professional, German A1→B1 2026; EU Blue Card / Chancenkarte, available immediately. Trading/fintech is **evidence**, positioned industry-neutrally — preserve this framing in all copy.

## Screenshots
Visual references in `screenshots/` (light theme unless noted; the Latency Lab is always dark):
- `01-hero-light.png` — Hero (full-bleed cinematic, animated data-network + live FPS chip)
- `02-latency-lab-light.png` — Latency Lab (toggles, meters, live grid; green/red on deltas only)
- `03-case-study-light.png` — Case study (step cards, timeline strip, role-switcher)
- `04-about-light.png` — About + contact
- `05-footer-light.png` — Footer
- `06-hero-dark.png` — Hero in dark theme
- `07-case-study-dark.png` — Case study in dark theme

## Files
- `Portfolio.dc.html` — the full design prototype (template + logic + inline styles). Primary reference.
- `image-slot.js` — the prototype's image-placeholder web component (reference only; use Next.js `<Image>` in production).
- `Usama-Danish-CV.pdf` — source CV for content/fact reference.
- `screenshots/` — rendered section references (see above).
