export type ReleaseFeedVariant = "default" | "minimal";

export interface ReleaseFeedProps {
  endpoint: string;
  emptyLabel: string;
  loadingLabel: string;
  errorLabel: string;
  noNotesLabel: string;
  variant?: ReleaseFeedVariant;
  className?: string;
}
