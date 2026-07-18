import type { Dictionary } from "./types";

const en: Dictionary = {
  meta: {
    title: "Usama Danish — Senior Frontend Engineer",
    description:
      "Senior Frontend Engineer building high-performance, real-time product interfaces. Berlin · 8+ years. React, Next.js, TypeScript.",
  },

  nav: {
    brand: "Usama Danish",
    links: [
      { label: "Latency Lab", href: "#lab" },
      { label: "Case study", href: "#case" },
      { label: "Projects", href: "#projects" },
      { label: "About", href: "#about" },
    ],
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
    languageLabel: "Language",
    localeComingSoon: "Coming in a later phase",
  },

  hero: {
    kicker: "Senior Frontend Engineer · Berlin · 8+ years",
    headline:
      "I build product interfaces that stay fast when the data doesn't slow down.",
    subheadline:
      "Eight years of demanding, real-time product UIs where being wrong is expensive. The hardest thing I've built is behind a bank login — so instead of a screenshot, here's a live one running in your browser.",
    chips: ["Wealth & trading", "Health", "Marketplaces", "Esports data"],
    liveLabel: "live",
    fpsUnit: "fps",
    scrollPre: "scroll",
    scrollPost: "↓ the live demo",
    photoPlaceholder: "optional — drop a photo (16:9). Looks great empty too.",
  },

  lab: {
    kicker: "The centerpiece",
    title: "Latency Lab",
    syntheticChip: "⟨ synthetic data ⟩",
    intro:
      "11,000 instruments, prices arriving continuously. The naïve version drops to ~12fps on a mid-range laptop — the kind of lag where, in any interface where data moves fast, the thing you act on is already out of date. Flip the switches. It genuinely stutters.",
    toggles: [
      {
        id: "naive",
        label: "Naïve rendering",
        off: "batched RAF",
        on: "re-render / tick",
      },
      {
        id: "noVirtual",
        label: "No virtualization",
        off: "windowed rows",
        on: "all 11k rows",
      },
      {
        id: "noMemo",
        label: "No memoization",
        off: "memoized cells",
        on: "recompute all",
      },
    ],
    meterFps: "FPS",
    meterDropped: "Dropped",
    colSym: "Sym",
    colInstrument: "Instrument",
    colLast: "Last",
    colChg: "Chg",
    naiveWarning: "naïve mode · auto-disarms in {s}s",
    footnote:
      "Symbols are fictional · green & red mark live deltas only · real toggles ship in the code build",
  },

  caseStudies: [
    {
      id: "enbd-wealth-pro",
      kicker: "Case study · a hard problem I solved",
      title:
        "One platform, three user types who must never see the same screen, four jurisdictions that disagree.",
      intro:
        "A high-net-worth wealth & trading SaaS at Emirates NBD — live in Dubai, KSA and Singapore, with London in progress. I owned it from ideation and POCs through architecture to production.",
      steps: [
        {
          label: "Problem",
          title: "Three user types, one platform",
          body: "Advisor, compliance and client must never see the same screen — and the rules differ by jurisdiction.",
        },
        {
          label: "Constraint",
          title: "Four jurisdictions that disagree",
          body: "Dubai, KSA, Singapore, and London in progress — each with its own regulatory shape.",
        },
        {
          label: "Decision",
          title: "Capability-based rendering",
          body: "Components declare capabilities they need; roles resolve to capability sets, decoupled from identity.",
        },
        {
          label: "Outcome",
          title: "New market, zero rewrites",
          body: "A new jurisdiction is a new capability map — no component changes. Owned end to end.",
        },
      ],
      timeline: {
        heading: "Framework timeline",
        bars: [
          {
            label: "ENBD X · Angular",
            startPct: 2,
            widthPct: 40,
            variant: "muted",
          },
          {
            label: "Wealth Pro · React · TypeScript · Next.js",
            startPct: 44,
            widthPct: 60,
            variant: "accent",
            runsOff: true,
          },
        ],
        years: ["2023", "2024", "2025", "2026 →"],
        caption: "Two years React, current and ongoing. One year Angular before it.",
      },
      roleSwitcher: {
        title: "Capability-based rendering",
        body: "Components declare what they need, not who they're for. Roles resolve to capability sets — a new jurisdiction is a new capability map, zero component changes. Flip a role:",
        pill: "illustrative · not client UI",
        roles: [
          { id: "advisor", label: "Advisor" },
          { id: "compliance", label: "Compliance" },
          { id: "client", label: "Client" },
        ],
        panels: [
          {
            title: "Positions overview",
            meta: "live P&L · holdings",
            roles: ["advisor", "client"],
          },
          {
            title: "Order ticket",
            meta: "place · amend · cancel",
            roles: ["advisor"],
          },
          {
            title: "Suitability checks",
            meta: "per-jurisdiction rules",
            roles: ["advisor", "compliance"],
          },
          {
            title: "Compliance flags",
            meta: "12 open · 3 escalated",
            roles: ["compliance"],
          },
          {
            title: "Audit trail",
            meta: "immutable event log",
            roles: ["compliance"],
          },
          {
            title: "Statements & reports",
            meta: "PDF · quarterly",
            roles: ["client", "advisor"],
          },
          {
            title: "Advisory notes",
            meta: "client-linked memos",
            roles: ["advisor"],
          },
          {
            title: "Document vault",
            meta: "KYC · agreements",
            roles: ["client"],
          },
        ],
      },
      stat: {
        value: "$500K+",
        label:
          "generated within two weeks of a bond-trading launch I led — cleared to publish.",
      },
    },
  ],

  projects: {
    kicker: "Selected work",
    title: "The same thread, across very different products.",
    intro:
      "Complex state, real-time data, and interfaces where being wrong is expensive — in health, marketplaces, and esports data, not just finance.",
    items: [
      {
        id: "tilly",
        title: "Tilly",
        domain: "Health",
        description:
          "A fertility & mental-health app — sensitive, stateful flows where clarity and trust matter as much as speed. Real-time tracking with an interface that stays calm under complex personal data.",
        tags: ["React", "TypeScript", "Real-time", "Accessibility"],
        period: "Health · consumer",
      },
      {
        id: "brightbee",
        title: "BrightBee",
        domain: "Marketplace",
        description:
          "A consumer marketplace connecting two sides of a transaction — search, listings, and messaging with state that has to stay consistent across every view.",
        tags: ["React", "Next.js", "TypeScript", "Marketplace"],
        period: "Marketplace · consumer",
      },
      {
        id: "pluck-gg",
        title: "Pluck GG",
        domain: "Esports data",
        description:
          "Esports data infrastructure for Swedish clients — high-throughput live data surfaced in real time, delivered to GDPR-compliant standards.",
        tags: ["React", "Real-time", "Data-heavy", "GDPR"],
        period: "Esports · data infrastructure",
      },
      {
        id: "miracle-morning",
        title: "Miracle Morning",
        domain: "Wellness",
        description:
          "A wellness product built around daily habit and routine — engaging, stateful UI with a focus on smooth, responsive interaction.",
        tags: ["React", "TypeScript", "Mobile-first"],
        period: "Wellness · consumer",
      },
    ],
  },

  craft: {
    kicker: "The craft",
    title: "Attention to detail isn't a bullet point. It's a measurement.",
    bodyBefore: "No vanity number. The figure on the right is an honest ",
    codeSnippet: "performance.now()",
    bodyAfter:
      " reading taken on your device the moment this section mounted.",
    cardLabel: "synthetic layout pass · this device",
    unit: "ms",
    opsLabel: "{ops} ops · measured, not claimed",
  },

  about: {
    kicker: "About",
    lead: "Eight years building demanding product interfaces.",
    body: "Trading and wealth platforms most recently at Emirates NBD — but also health (a fertility & mental-health app), consumer marketplaces, and esports data infrastructure for Swedish clients. The common thread is complex state, real-time data, and interfaces where being wrong is expensive.",
    blockquote:
      "Two years React. One year Angular before it. Eight years of demanding frontend underneath. The framework was never the hard part.",
    portraitPlaceholder: "portrait — drop a 4:5 image",
    languagesHeading: "Languages",
    languages: [
      { label: "English", detail: "— professional" },
      {
        label: "German",
        detail: "— A1, actively studying, targeting B1 in 2026",
      },
    ],
    workStatusHeading: "Work status",
    workStatus:
      "EU Blue Card eligible on offer (Chancenkarte). No sponsorship cost, no relocation delay — available immediately.",
    contactHeading: "Get in touch",
    contactLinks: [
      { label: "usamadanish22@gmail.com", href: "mailto:usamadanish22@gmail.com" },
      {
        label: "linkedin.com/in/usama-danish",
        href: "https://linkedin.com/in/usama-danish",
        external: true,
      },
      { label: "Download CV (PDF)", href: "/Usama-Danish-CV.pdf", external: true },
    ],
  },

  footer: {
    copyright: "© 2026 Usama Danish · Berlin",
    tagline: "built as the portfolio piece itself",
  },
};

export default en;
