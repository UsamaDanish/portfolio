/**
 * Content types. ALL site copy and data live in per-locale dictionaries
 * (src/content/<locale>.ts) typed against these interfaces — nothing is
 * hardcoded in components. Adding a project or case study is an array edit;
 * the design is never touched.
 *
 * Locale-independent, non-editorial data (the fictional Latency Lab symbols)
 * lives in src/lib, not here — it never translates.
 */

export interface Meta {
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  /** In-page anchor, e.g. "#lab". */
  href: string;
}

export interface NavContent {
  brand: string;
  links: NavLink[];
  /** aria-labels for the theme toggle. */
  themeToLight: string;
  themeToDark: string;
  /** aria-label for the language switcher group. */
  languageLabel: string;
  /** tooltip on the not-yet-enabled locales (Phase C). */
  localeComingSoon: string;
}

export interface HeroContent {
  kicker: string;
  headline: string;
  subheadline: string;
  chips: string[];
  /** "live" and "fps" wrap a live number in the FPS chip. */
  liveLabel: string;
  fpsUnit: string;
  scrollPre: string;
  scrollPost: string;
  /** Empty-state caption for the optional hero photo slot. */
  photoPlaceholder: string;
}

export type LabToggleId = "naive" | "noVirtual" | "noMemo";

export interface LabToggle {
  id: LabToggleId;
  label: string;
  /** sub-label when OFF (the good/optimized state). */
  off: string;
  /** sub-label when ON (the harmful state). */
  on: string;
}

export interface LabContent {
  kicker: string;
  title: string;
  syntheticChip: string;
  intro: string;
  toggles: LabToggle[];
  meterFps: string;
  meterDropped: string;
  colSym: string;
  colInstrument: string;
  colLast: string;
  colChg: string;
  /** "{s}" is replaced with the live countdown. */
  naiveWarning: string;
  footnote: string;
}

export interface CaseStep {
  /** e.g. "Problem", "Constraint". */
  label: string;
  title: string;
  body: string;
}

export interface TimelineBar {
  label: string;
  startPct: number;
  widthPct: number;
  variant: "muted" | "accent";
  /** Runs off the right edge with an edge-fade (the ongoing bar). */
  runsOff?: boolean;
}

export interface CaseTimeline {
  heading: string;
  bars: TimelineBar[];
  years: string[];
  caption: string;
}

export interface RolePanel {
  title: string;
  meta: string;
  /** Which role ids this panel is visible to. */
  roles: string[];
}

export interface RoleSwitcher {
  title: string;
  body: string;
  pill: string;
  roles: { id: string; label: string }[];
  panels: RolePanel[];
}

export interface CaseStat {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  kicker: string;
  title: string;
  intro: string;
  steps: CaseStep[];
  timeline: CaseTimeline;
  roleSwitcher: RoleSwitcher;
  stat: CaseStat;
}

export interface Project {
  id: string;
  title: string;
  /** Industry label, e.g. "Health", "Marketplace". */
  domain: string;
  description: string;
  tags: string[];
  /** Optional year or range shown on the card. */
  period?: string;
  /** Optional external link. */
  link?: { label: string; href: string };
}

export interface ProjectsContent {
  kicker: string;
  title: string;
  intro: string;
  items: Project[];
}

export interface CraftContent {
  kicker: string;
  title: string;
  /** The word wrapped in a <code> chip in the body copy. */
  bodyBefore: string;
  codeSnippet: string;
  bodyAfter: string;
  cardLabel: string;
  unit: string;
  /** "{ops}" is replaced with the op count. */
  opsLabel: string;
}

export interface AboutContent {
  kicker: string;
  lead: string;
  body: string;
  blockquote: string;
  portraitPlaceholder: string;
  languagesHeading: string;
  languages: { label: string; detail: string }[];
  workStatusHeading: string;
  workStatus: string;
  contactHeading: string;
  contactLinks: { label: string; href: string; external?: boolean }[];
}

export interface FooterContent {
  copyright: string;
  tagline: string;
}

export interface Dictionary {
  meta: Meta;
  nav: NavContent;
  hero: HeroContent;
  lab: LabContent;
  caseStudies: CaseStudy[];
  projects: ProjectsContent;
  craft: CraftContent;
  about: AboutContent;
  footer: FooterContent;
}
