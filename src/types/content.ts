export type SectionId =
  | "intro"
  | "mental-model"
  | "framework-fit"
  | "mcp"
  | "org-patterns"
  | "big-projects"
  | "faq"
  | "releases";

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface LoopStep {
  id: string;
  label: string;
  detail: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface GlossaryItem {
  term: string;
  definition: string;
  related?: string[];
  sourceLabel?: string;
  sourceUrl?: string;
}

export interface ReleaseItem {
  tag: string;
  name: string;
  url: string;
  publishedAt?: string;
  summary: string;
}

export interface FrameworkFitItem {
  name: string;
  bestFor: string;
  mentalModel: string;
  caveat: string;
}

export interface PatternItem {
  name: string;
  whenToUse: string;
  risk: string;
}
