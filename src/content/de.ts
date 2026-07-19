import type { Dictionary } from "./types";

// German dictionary — professionally phrased (not machine-translated).
// Company names, tech stacks and the fictional Latency Lab symbols stay as-is.
// experience.role/period are not rendered, so they are left in English.
const de: Dictionary = {
  meta: {
    title: "Usama Danish — Senior Full-Stack Engineer",
    description:
      "Senior Full-Stack Engineer, der hochperformante Echtzeit-Produkte entwickelt — React, Next.js & TypeScript im Frontend, Node.js & NestJS im Backend. Berlin · 8+ Jahre.",
  },

  nav: {
    brand: "Usama Danish",
    links: [
      { label: "Latency Lab", href: "#lab" },
      { label: "Fallstudie", href: "#case" },
      { label: "Erfahrung", href: "#experience" },
      { label: "Projekte", href: "#projects" },
      { label: "Über mich", href: "#about" },
    ],
    themeToLight: "Zum hellen Design wechseln",
    themeToDark: "Zum dunklen Design wechseln",
    languageLabel: "Sprache",
    localeComingSoon: "Bald verfügbar",
  },

  hero: {
    kicker: "Senior Full-Stack Engineer · Berlin · 8+ Jahre",
    headline: "Ich baue Produkte, die schnell bleiben, wenn die Daten es nicht tun.",
    subheadline:
      "Acht Jahre anspruchsvolle Echtzeit-Produkte — vom Frontend bis zum Backend —, bei denen Fehler teuer sind. Das Schwierigste, das ich gebaut habe, liegt hinter einem Bank-Login; statt eines Screenshots läuft hier also ein Live-Beispiel direkt in deinem Browser.",
    chips: ["Vermögen & Trading", "Gesundheit", "Marktplätze", "E-Sport-Daten"],
    liveLabel: "live",
    fpsUnit: "fps",
    scrollPre: "scrollen",
    scrollPost: "↓ die Live-Demo",
    photoPlaceholder: "optional — Foto (16:9) ablegen. Sieht auch leer gut aus.",
  },

  lab: {
    kicker: "Das Herzstück",
    title: "Latency Lab",
    syntheticChip: "⟨ synthetische Daten ⟩",
    intro:
      "11.000 Instrumente, Kurse treffen kontinuierlich ein. Die naive Variante fällt auf einem Mittelklasse-Laptop auf ~12 fps — die Art von Verzögerung, bei der das, worauf du reagierst, in jeder Oberfläche mit schnellen Daten bereits veraltet ist. Leg die Schalter um. Es ruckelt wirklich.",
    toggles: [
      {
        id: "naive",
        label: "Naives Rendering",
        off: "gebündeltes RAF",
        on: "Re-Render pro Tick",
      },
      {
        id: "noVirtual",
        label: "Keine Virtualisierung",
        off: "gefensterte Zeilen",
        on: "alle 11k Zeilen",
      },
      {
        id: "noMemo",
        label: "Keine Memoisierung",
        off: "memoisierte Zellen",
        on: "alles neu berechnen",
      },
    ],
    meterFps: "FPS",
    meterDropped: "Verworfen",
    colSym: "Sym",
    colInstrument: "Instrument",
    colLast: "Kurs",
    colChg: "Änd.",
    naiveWarning: "Naiver Modus · deaktiviert sich in {s}s",
    footnote:
      "Symbole sind fiktiv · Grün & Rot markieren nur Live-Deltas · echte Schalter kommen im Code-Build",
  },

  caseStudies: [
    {
      id: "enbd-wealth-pro",
      kicker: "Fallstudie · ein schwieriges Problem, das ich gelöst habe",
      title:
        "Eine Plattform, drei Nutzertypen, die nie denselben Bildschirm sehen dürfen, vier Jurisdiktionen, die sich widersprechen.",
      intro:
        "Eine Wealth- & Trading-SaaS für vermögende Kunden bei der Emirates NBD — live in Dubai, Saudi-Arabien und Singapur, London in Arbeit. Ich habe sie von der Idee über POCs und Architektur bis zur Produktion verantwortet.",
      steps: [
        {
          label: "Problem",
          title: "Drei Nutzertypen, eine Plattform",
          body: "Berater, Compliance und Kunde dürfen nie denselben Bildschirm sehen — und die Regeln unterscheiden sich je nach Jurisdiktion.",
        },
        {
          label: "Rahmenbedingung",
          title: "Vier Jurisdiktionen, die sich widersprechen",
          body: "Dubai, Saudi-Arabien, Singapur und London (in Arbeit) — jede mit ihrer eigenen regulatorischen Form.",
        },
        {
          label: "Entscheidung",
          title: "Capability-basiertes Rendering",
          body: "Komponenten deklarieren die Fähigkeiten, die sie brauchen; Rollen lösen sich in Capability-Sets auf, entkoppelt von der Identität.",
        },
        {
          label: "Ergebnis",
          title: "Neuer Markt, keine Rewrites",
          body: "Eine neue Jurisdiktion ist eine neue Capability-Map — keine Komponentenänderungen. End-to-end verantwortet.",
        },
      ],
      roleSwitcher: {
        title: "Capability-basiertes Rendering",
        body: "Komponenten deklarieren, was sie brauchen, nicht für wen sie sind. Rollen lösen sich in Capability-Sets auf — eine neue Jurisdiktion ist eine neue Capability-Map, ohne Komponentenänderungen. Wechsle eine Rolle:",
        pill: "illustrativ · keine echte Kunden-UI",
        roles: [
          { id: "advisor", label: "Berater" },
          { id: "compliance", label: "Compliance" },
          { id: "client", label: "Kunde" },
        ],
        panels: [
          {
            title: "Positionsübersicht",
            meta: "Live-P&L · Bestände",
            roles: ["advisor", "client"],
          },
          {
            title: "Order-Ticket",
            meta: "platzieren · ändern · stornieren",
            roles: ["advisor"],
          },
          {
            title: "Eignungsprüfungen",
            meta: "Regeln je Jurisdiktion",
            roles: ["advisor", "compliance"],
          },
          {
            title: "Compliance-Meldungen",
            meta: "12 offen · 3 eskaliert",
            roles: ["compliance"],
          },
          {
            title: "Audit-Trail",
            meta: "unveränderliches Ereignisprotokoll",
            roles: ["compliance"],
          },
          {
            title: "Auszüge & Berichte",
            meta: "PDF · quartalsweise",
            roles: ["client", "advisor"],
          },
          {
            title: "Beratungsnotizen",
            meta: "kundenbezogene Memos",
            roles: ["advisor"],
          },
          {
            title: "Dokumententresor",
            meta: "KYC · Vereinbarungen",
            roles: ["client"],
          },
        ],
      },
      stat: {
        value: "$500K+",
        label:
          "innerhalb von zwei Wochen nach einem von mir geleiteten Bond-Trading-Launch generiert — zur Veröffentlichung freigegeben.",
      },
    },
  ],

  experience: {
    kicker: "Erfahrung",
    title: "Acht Jahre, Full-Stack — von frühem .NET bis zu Echtzeit-Trading-Plattformen.",
    intro:
      "Frontend und Backend, über fünf Unternehmen und Produkte für schwedische, internationale und VAE-Kunden. Node.js und NestJS in den mittleren Jahren; React und Next.js durchgehend.",
    axisStart: 2018,
    axisEnd: 2026.5,
    yearMarks: [2018, 2020, 2022, 2024, 2026],
    roles: [
      {
        company: "Digicare",
        role: "Associate Software Developer",
        period: "Feb. 2018 – Aug. 2019",
        stack: ["ASP.NET Core", "MVC"],
        start: 2018.1,
        end: 2019.65,
        variant: "muted",
      },
      {
        company: "SecureHops",
        role: "MERN Stack Developer",
        period: "Nov. 2019 – Jan. 2021",
        stack: ["React", "Next.js", "NestJS", "Node", "MongoDB"],
        start: 2019.83,
        end: 2021.08,
        variant: "muted",
      },
      {
        company: "DPL",
        role: "Software Engineer · Full-Stack",
        period: "Feb. 2021 – Feb. 2023",
        stack: ["Node.js", "NestJS", "MongoDB", "React"],
        start: 2021.08,
        end: 2023.08,
        variant: "muted",
      },
      {
        company: "NeeoPal",
        role: "Software Engineer",
        period: "Feb. 2023 – Sep. 2023",
        stack: ["NestJS", "MongoDB", "AWS"],
        start: 2023.08,
        end: 2023.75,
        variant: "muted",
      },
      {
        company: "Emirates NBD",
        role: "Senior Frontend Engineer",
        period: "Okt. 2023 – heute",
        stack: ["React", "Next.js", "TypeScript"],
        start: 2023.75,
        end: null,
        variant: "accent",
        current: true,
      },
    ],
    caption:
      "React & Next.js im Frontend · Node.js & NestJS im Backend · acht Jahre, Full-Stack.",
  },

  projects: {
    kicker: "Ausgewählte Arbeiten",
    title: "Derselbe rote Faden, über sehr unterschiedliche Produkte hinweg.",
    intro:
      "Komplexer State, Echtzeitdaten und Oberflächen, bei denen Fehler teuer sind — in Gesundheit, Marktplätzen und E-Sport-Daten, nicht nur im Finanzbereich.",
    items: [
      {
        id: "tilly",
        title: "Tilly",
        domain: "Gesundheit",
        description:
          "Eine App für Fruchtbarkeit und mentale Gesundheit — sensible, zustandsbehaftete Abläufe, bei denen Klarheit und Vertrauen ebenso zählen wie Geschwindigkeit. Echtzeit-Tracking mit einer Oberfläche, die auch bei komplexen persönlichen Daten ruhig bleibt.",
        tags: ["React", "TypeScript", "Echtzeit", "Barrierefreiheit"],
        period: "Gesundheit · Consumer",
      },
      {
        id: "brightbee",
        title: "BrightBee",
        domain: "Marktplatz",
        description:
          "Ein Consumer-Marktplatz, der zwei Seiten einer Transaktion verbindet — Suche, Angebote und Messaging mit State, der über jede Ansicht hinweg konsistent bleiben muss.",
        tags: ["React", "Next.js", "TypeScript", "Marktplatz"],
        period: "Marktplatz · Consumer",
      },
      {
        id: "pluck-gg",
        title: "Pluck GG",
        domain: "E-Sport-Daten",
        description:
          "E-Sport-Dateninfrastruktur für schwedische Kunden — Live-Daten mit hohem Durchsatz in Echtzeit aufbereitet, DSGVO-konform ausgeliefert.",
        tags: ["React", "Echtzeit", "Datenintensiv", "DSGVO"],
        period: "E-Sport · Dateninfrastruktur",
      },
      {
        id: "miracle-morning",
        title: "Miracle Morning",
        domain: "Wellness",
        description:
          "Ein Wellness-Produkt rund um tägliche Gewohnheiten und Routinen — eine ansprechende, zustandsbehaftete UI mit Fokus auf flüssige, reaktionsschnelle Interaktion.",
        tags: ["React", "TypeScript", "Mobile-First"],
        period: "Wellness · Consumer",
      },
    ],
  },

  craft: {
    kicker: "Handwerk",
    title: "Liebe zum Detail ist kein Aufzählungspunkt. Sie ist eine Messung.",
    bodyBefore: "Keine Schaunummer. Die Zahl rechts ist eine ehrliche ",
    codeSnippet: "performance.now()",
    bodyAfter:
      "-Messung, die beim Laden dieses Abschnitts auf deinem Gerät vorgenommen wurde.",
    cardLabel: "synthetischer Layout-Durchlauf · dieses Gerät",
    unit: "ms",
    opsLabel: "{ops} Operationen · gemessen, nicht behauptet",
  },

  about: {
    kicker: "Über mich",
    lead: "Acht Jahre, in denen ich anspruchsvolle Echtzeit-Produkte gebaut habe — End-to-End.",
    body: "Zuletzt Trading- und Wealth-Plattformen bei der Emirates NBD — aber auch Gesundheit (eine App für Fruchtbarkeit und mentale Gesundheit), Consumer-Marktplätze und E-Sport-Dateninfrastruktur für schwedische Kunden. Der rote Faden: komplexer State, Echtzeitdaten und Produkte — vom Frontend bis zum Backend —, bei denen Fehler teuer sind.",
    blockquote:
      "React und Next im Frontend, Node und NestJS im Backend — acht Jahre anspruchsvolle Full-Stack-Produktarbeit. Das Framework war nie der schwierige Teil.",
    portraitPlaceholder: "Porträt — 4:5-Bild ablegen",
    languagesHeading: "Sprachen",
    languages: [
      { label: "Englisch", detail: "— verhandlungssicher" },
      { label: "Deutsch", detail: "— A1, aktiv im Lernen, Ziel B1 in 2026" },
    ],
    workStatusHeading: "Arbeitsstatus",
    workStatus:
      "EU-Blue-Card-berechtigt bei Angebot (Chancenkarte). Keine Sponsoring-Kosten, keine Verzögerung durch Umzug — sofort verfügbar.",
    contactHeading: "Kontakt",
    contactLinks: [
      { label: "usamadanish22@gmail.com", href: "mailto:usamadanish22@gmail.com" },
      {
        label: "linkedin.com/in/usama-danish",
        href: "https://linkedin.com/in/usama-danish",
        external: true,
      },
      {
        label: "Lebenslauf herunterladen (PDF)",
        href: "/Usama-Danish-CV.pdf",
        external: true,
      },
    ],
  },

  footer: {
    copyright: "© 2026 Usama Danish · Berlin",
    tagline: "als Portfolio-Stück selbst gebaut",
  },
};

export default de;
