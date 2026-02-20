import { GlossaryItem } from "../../types/content";

export type GlossaryTermCardVariant = "default" | "bordered";

export interface GlossaryTermCardProps {
  item: GlossaryItem;
  variant?: GlossaryTermCardVariant;
  className?: string;
}
