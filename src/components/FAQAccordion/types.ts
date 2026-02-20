import { FAQItem } from "../../types/content";

export type FAQAccordionVariant = "default" | "soft";

export interface FAQAccordionProps {
  items: FAQItem[];
  variant?: FAQAccordionVariant;
  className?: string;
}
