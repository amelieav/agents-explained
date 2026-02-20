import { classNames } from "../../utils/classNames";
import { layeredPanelVariantClass } from "./variants";
import { LayeredPanelProps } from "./types";
import "./LayeredPanel.css";

export function LayeredPanel({ children, variant = "soft", className }: LayeredPanelProps): JSX.Element {
  return <div className={classNames("layered-panel", layeredPanelVariantClass[variant], className)}>{children}</div>;
}
