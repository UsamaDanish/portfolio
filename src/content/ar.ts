import type { Dictionary } from "./types";

// Arabic dictionary — professional Modern Standard Arabic (RTL). Company names,
// framework/tech names and the fictional Latency Lab symbols stay in Latin
// script (standard in Arabic tech writing). experience.role/period are not
// rendered, so they are left in English.
const ar: Dictionary = {
  meta: {
    title: "أسامة دانش — مهندس برمجيات Full-Stack أوّل",
    description:
      "مهندس Full-Stack أوّل يبني منتجات عالية الأداء وفي الزمن الحقيقي — React وNext.js وTypeScript في الواجهة الأمامية، وNode.js وNestJS في الخلفية. برلين · أكثر من 8 سنوات.",
  },

  nav: {
    brand: "أسامة دانش",
    links: [
      { label: "Latency Lab", href: "#lab" },
      { label: "دراسة حالة", href: "#case" },
      { label: "الخبرة", href: "#experience" },
      { label: "المشاريع", href: "#projects" },
      { label: "نبذة", href: "#about" },
    ],
    themeToLight: "التبديل إلى المظهر الفاتح",
    themeToDark: "التبديل إلى المظهر الداكن",
    languageLabel: "اللغة",
    localeComingSoon: "قريبًا",
  },

  hero: {
    kicker: "مهندس Full-Stack أوّل · برلين · أكثر من 8 سنوات",
    headline: "أبني منتجات تبقى سريعة حين لا تتباطأ البيانات.",
    subheadline:
      "ثماني سنوات من المنتجات المتطلّبة والعاملة في الزمن الحقيقي — من الواجهة الأمامية إلى الخلفية — حيث يكون الخطأ مكلفًا. أصعب ما بنيتُه يقع خلف تسجيل دخول مصرفي، لذا بدلاً من لقطة شاشة، إليك مثالاً حيًّا يعمل داخل متصفّحك.",
    chips: ["الثروات والتداول", "الصحة", "الأسواق", "بيانات الرياضات الإلكترونية"],
    liveLabel: "مباشر",
    fpsUnit: "fps",
    scrollPre: "مرِّر",
    scrollPost: "↓ العرض الحيّ",
    photoPlaceholder: "اختياري — أفلِت صورة (16:9). تبدو رائعة فارغة أيضًا.",
  },

  lab: {
    kicker: "المحور الأساسي",
    title: "Latency Lab",
    syntheticChip: "⟨ بيانات اصطناعية ⟩",
    intro:
      "11,000 أداة، وتصل الأسعار باستمرار. النسخة الساذجة تنخفض إلى ~12 إطارًا/ث على حاسوب متوسط — نوع التأخّر الذي يجعل ما تتصرّف بناءً عليه قديمًا بالفعل في أي واجهة تتحرّك فيها البيانات بسرعة. بدّل المفاتيح. إنها تتقطّع فعلاً.",
    toggles: [
      {
        id: "naive",
        label: "عرض ساذج",
        off: "RAF مُجمَّع",
        on: "إعادة عرض لكل tick",
      },
      {
        id: "noVirtual",
        label: "بدون Virtualization",
        off: "صفوف مُنافَذة",
        on: "كل 11k صف",
      },
      {
        id: "noMemo",
        label: "بدون Memoization",
        off: "خلايا مُخزَّنة",
        on: "إعادة حساب الكل",
      },
    ],
    meterFps: "FPS",
    meterDropped: "مفقود",
    colSym: "الرمز",
    colInstrument: "الأداة",
    colLast: "السعر",
    colChg: "التغيّر",
    naiveWarning: "الوضع الساذج · يتوقّف تلقائيًا خلال {s}ث",
    footnote:
      "الرموز خيالية · الأخضر والأحمر يُشيران إلى تغيّرات حيّة فقط · المفاتيح الحقيقية تأتي في نسخة الكود",
  },

  caseStudies: [
    {
      id: "enbd-wealth-pro",
      kicker: "دراسة حالة · مشكلة صعبة حللتُها",
      title:
        "منصة واحدة، وثلاثة أنواع من المستخدمين يجب ألّا يروا الشاشة نفسها أبدًا، وأربع ولايات قضائية متعارضة.",
      intro:
        "منصة SaaS للثروات والتداول لعملاء أصحاب الملاءة العالية لدى Emirates NBD — تعمل في دبي والسعودية وسنغافورة، ولندن قيد الإنجاز. تولّيتُها من الفكرة وإثباتات المفهوم مرورًا بالمعمارية وحتى الإنتاج.",
      steps: [
        {
          label: "المشكلة",
          title: "ثلاثة أنواع مستخدمين، منصة واحدة",
          body: "المستشار والامتثال والعميل يجب ألّا يروا الشاشة نفسها أبدًا — والقواعد تختلف باختلاف الولاية القضائية.",
        },
        {
          label: "القيد",
          title: "أربع ولايات قضائية متعارضة",
          body: "دبي والسعودية وسنغافورة، ولندن قيد الإنجاز — لكلٍّ منها شكلها التنظيمي الخاص.",
        },
        {
          label: "القرار",
          title: "عرض قائم على القدرات (Capabilities)",
          body: "المكوّنات تُصرِّح بالقدرات التي تحتاجها؛ والأدوار تُترجَم إلى مجموعات قدرات منفصلة عن الهوية.",
        },
        {
          label: "النتيجة",
          title: "سوق جديد دون إعادة كتابة",
          body: "الولاية القضائية الجديدة هي مجرد خريطة قدرات جديدة — دون تغيير المكوّنات. مملوكة من البداية إلى النهاية.",
        },
      ],
      roleSwitcher: {
        title: "عرض قائم على القدرات",
        body: "المكوّنات تُصرِّح بما تحتاجه، لا بمن هي موجَّهة إليه. الأدوار تُترجَم إلى مجموعات قدرات — الولاية القضائية الجديدة هي خريطة قدرات جديدة دون تغيير المكوّنات. بدّل دورًا:",
        pill: "توضيحي · ليست واجهة عميل حقيقية",
        roles: [
          { id: "advisor", label: "مستشار" },
          { id: "compliance", label: "امتثال" },
          { id: "client", label: "عميل" },
        ],
        panels: [
          {
            title: "نظرة عامة على المراكز",
            meta: "الأرباح والخسائر مباشرةً · الحيازات",
            roles: ["advisor", "client"],
          },
          {
            title: "تذكرة أمر",
            meta: "إنشاء · تعديل · إلغاء",
            roles: ["advisor"],
          },
          {
            title: "فحوص الملاءمة",
            meta: "قواعد لكل ولاية قضائية",
            roles: ["advisor", "compliance"],
          },
          {
            title: "تنبيهات الامتثال",
            meta: "12 مفتوحة · 3 مُصعَّدة",
            roles: ["compliance"],
          },
          {
            title: "سجل التدقيق",
            meta: "سجل أحداث غير قابل للتغيير",
            roles: ["compliance"],
          },
          {
            title: "الكشوف والتقارير",
            meta: "PDF · فصليًا",
            roles: ["client", "advisor"],
          },
          {
            title: "ملاحظات استشارية",
            meta: "مذكّرات مرتبطة بالعميل",
            roles: ["advisor"],
          },
          {
            title: "خزينة المستندات",
            meta: "KYC · الاتفاقيات",
            roles: ["client"],
          },
        ],
      },
      stat: {
        value: "$500K+",
        label: "تحقّقت خلال أسبوعين من إطلاق تداول سندات قُدْتُه — مُصرَّح بنشرها.",
      },
    },
  ],

  experience: {
    kicker: "الخبرة",
    title: "ثماني سنوات، Full-Stack — من بدايات .NET إلى منصّات التداول في الزمن الحقيقي.",
    intro:
      "واجهة أمامية وخلفية، عبر خمس شركات ومنتجات لعملاء سويديين ودوليين وإماراتيين. Node.js وNestJS في السنوات الوسطى؛ React وNext.js طوال الوقت.",
    axisStart: 2018,
    axisEnd: 2026.5,
    yearMarks: [2018, 2020, 2022, 2024, 2026],
    roles: [
      {
        company: "Digicare",
        role: "Associate Software Developer",
        period: "Feb 2018 – Aug 2019",
        stack: ["ASP.NET Core", "MVC"],
        start: 2018.1,
        end: 2019.65,
        variant: "muted",
      },
      {
        company: "SecureHops",
        role: "MERN Stack Developer",
        period: "Nov 2019 – Jan 2021",
        stack: ["React", "Next.js", "NestJS", "Node", "MongoDB"],
        start: 2019.83,
        end: 2021.08,
        variant: "muted",
      },
      {
        company: "DPL",
        role: "Software Engineer · Full-Stack",
        period: "Feb 2021 – Feb 2023",
        stack: ["Node.js", "NestJS", "MongoDB", "React"],
        start: 2021.08,
        end: 2023.08,
        variant: "muted",
      },
      {
        company: "NeeoPal",
        role: "Software Engineer",
        period: "Feb 2023 – Sep 2023",
        stack: ["NestJS", "MongoDB", "AWS"],
        start: 2023.08,
        end: 2023.75,
        variant: "muted",
      },
      {
        company: "Emirates NBD",
        role: "Senior Frontend Engineer",
        period: "Oct 2023 – Present",
        stack: ["React", "Next.js", "TypeScript"],
        start: 2023.75,
        end: null,
        variant: "accent",
        current: true,
      },
    ],
    caption:
      "React وNext.js في الواجهة · Node.js وNestJS في الخلفية · ثماني سنوات، Full-Stack.",
  },

  projects: {
    kicker: "أعمال مختارة",
    title: "الخيط نفسه، عبر منتجات شديدة الاختلاف.",
    intro:
      "حالة معقّدة، وبيانات في الزمن الحقيقي، وواجهات يكون فيها الخطأ مكلفًا — في الصحة والأسواق وبيانات الرياضات الإلكترونية، لا في التمويل وحده.",
    items: [
      {
        id: "tilly",
        title: "Tilly",
        domain: "الصحة",
        description:
          "تطبيق للخصوبة والصحة النفسية — تدفّقات حسّاسة ذات حالة، حيث يهمّ الوضوح والثقة بقدر السرعة. تتبّع في الزمن الحقيقي بواجهة تبقى هادئة رغم تعقيد البيانات الشخصية.",
        tags: ["React", "TypeScript", "الزمن الحقيقي", "إمكانية الوصول"],
        period: "الصحة · للمستهلك",
      },
      {
        id: "brightbee",
        title: "BrightBee",
        domain: "سوق",
        description:
          "سوق استهلاكي يربط طرفَي معاملة — بحث وقوائم ومراسلة بحالة يجب أن تبقى متّسقة عبر كل عرض.",
        tags: ["React", "Next.js", "TypeScript", "سوق"],
        period: "سوق · للمستهلك",
      },
      {
        id: "pluck-gg",
        title: "Pluck GG",
        domain: "بيانات الرياضات الإلكترونية",
        description:
          "بنية بيانات للرياضات الإلكترونية لعملاء سويديين — بيانات حيّة عالية الإنتاجية تُعرَض في الزمن الحقيقي، وتُسلَّم وفق معايير GDPR.",
        tags: ["React", "الزمن الحقيقي", "كثيف البيانات", "GDPR"],
        period: "رياضات إلكترونية · بنية بيانات",
      },
      {
        id: "miracle-morning",
        title: "Miracle Morning",
        domain: "العافية",
        description:
          "منتج عافية مبنيّ حول العادات والروتين اليومي — واجهة جذّابة ذات حالة تركّز على تفاعل سلس وسريع الاستجابة.",
        tags: ["React", "TypeScript", "Mobile-First"],
        period: "عافية · للمستهلك",
      },
    ],
  },

  craft: {
    kicker: "الحِرفة",
    title: "الاهتمام بالتفاصيل ليس نقطة في قائمة. إنه قياس.",
    bodyBefore: "لا رقم استعراضيّ. الرقم على اليسار قراءة صادقة لـ",
    codeSnippet: "performance.now()",
    bodyAfter: " أُخِذَت على جهازك لحظة تحميل هذا القسم.",
    cardLabel: "تمريرة تخطيط اصطناعية · هذا الجهاز",
    unit: "ms",
    opsLabel: "{ops} عملية · مُقاسة لا مُدَّعاة",
  },

  about: {
    kicker: "نبذة",
    lead: "ثماني سنوات في بناء منتجات متطلّبة وفي الزمن الحقيقي — من البداية إلى النهاية.",
    body: "أحدثها منصّات تداول وثروات لدى Emirates NBD — لكن أيضًا الصحة (تطبيق للخصوبة والصحة النفسية)، وأسواق استهلاكية، وبنية بيانات للرياضات الإلكترونية لعملاء سويديين. الخيط المشترك: حالة معقّدة، وبيانات في الزمن الحقيقي، ومنتجات — من الواجهة إلى الخلفية — يكون فيها الخطأ مكلفًا.",
    blockquote:
      "React وNext في الواجهة، وNode وNestJS في الخلفية — ثماني سنوات من عمل Full-Stack المتطلّب على المنتجات. لم يكن الإطار يومًا هو الجزء الصعب.",
    portraitPlaceholder: "صورة شخصية — أفلِت صورة بنسبة 4:5",
    languagesHeading: "اللغات",
    languages: [
      { label: "الإنجليزية", detail: "— إجادة مهنية" },
      { label: "الألمانية", detail: "— A1، قيد الدراسة الجادّة، الهدف B1 في 2026" },
    ],
    workStatusHeading: "حالة العمل",
    workStatus:
      "مؤهّل لبطاقة الاتحاد الأوروبي الزرقاء عند تلقّي عرض (Chancenkarte). لا تكاليف كفالة، ولا تأخير بسبب الانتقال — متاح فورًا.",
    contactHeading: "تواصل",
    contactLinks: [
      { label: "usamadanish22@gmail.com", href: "mailto:usamadanish22@gmail.com" },
      {
        label: "linkedin.com/in/usama-danish",
        href: "https://linkedin.com/in/usama-danish",
        external: true,
      },
      {
        label: "تنزيل السيرة الذاتية (PDF)",
        href: "/Usama-Danish-CV.pdf",
        external: true,
      },
    ],
  },

  footer: {
    copyright: "© 2026 أسامة دانش · برلين",
    tagline: "مبنيّ ليكون قطعة معرض الأعمال نفسها",
  },
};

export default ar;
