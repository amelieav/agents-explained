export type ReleaseFeedVariant = "default" | "minimal";

export interface ReleaseFeedProps {
  endpoint: string;
  emptyLabel: string;
  loadingLabel: string;
  errorLabel: string;
  noNotesLabel: string;
  maxItems?: number;
  variant?: ReleaseFeedVariant;
  className?: string;
}
