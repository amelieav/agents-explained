export type BubbleHeadingVariant = "hero" | "section" | "compact";

export interface BubbleHeadingProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  variant?: BubbleHeadingVariant;
  className?: string;
}
