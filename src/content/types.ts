/**
 * Content types. All site copy and data live in per-locale dictionaries
 * (src/content/<locale>.ts) typed against these interfaces — nothing is
 * hardcoded in components. Adding a project or case study is an array edit;
 * the design is never touched. Expanded in Phase A as sections are built.
 */

export interface Meta {
  title: string;
  description: string;
}

export interface Dictionary {
  meta: Meta;
}
