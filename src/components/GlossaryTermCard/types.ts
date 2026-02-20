import { GlossaryItem } from "../../types/content";

export type GlossaryTermCardVariant = "default" | "bordered";

export interface GlossaryTermCardProps {
  item: GlossaryItem;
  saved?: boolean;
  saveLabel?: string;
  savedLabel?: string;
  onToggleSave?: (term: string) => void;
  variant?: GlossaryTermCardVariant;
  className?: string;
}
