import { PropsWithChildren } from "react";
import { BubbleHeadingVariant } from "../BubbleHeading/types";
import { LayeredPanelVariant } from "../LayeredPanel/types";

export interface SectionShellProps extends PropsWithChildren {
  id: string;
  title: string;
  eyebrow?: string;
  summary?: string;
  variant?: LayeredPanelVariant;
  headingVariant?: BubbleHeadingVariant;
  className?: string;
}
