import { PropsWithChildren } from "react";

export type LayeredPanelVariant = "soft" | "glass" | "highlight";

export interface LayeredPanelProps extends PropsWithChildren {
  variant?: LayeredPanelVariant;
  className?: string;
}
