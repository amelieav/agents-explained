import { classNames } from "../../utils/classNames";
import { bubbleHeadingVariantClass } from "./variants";
import { BubbleHeadingProps } from "./types";
import "./BubbleHeading.css";

export function BubbleHeading({
  title,
  eyebrow,
  subtitle,
  variant = "section",
  className
}: BubbleHeadingProps): JSX.Element {
  return (
    <header className={classNames("bubble-heading", bubbleHeadingVariantClass[variant], className)}>
      {eyebrow ? <p className="bubble-heading__eyebrow">{eyebrow}</p> : null}
      <h2 className="bubble-heading__title">{title}</h2>
      {subtitle ? <p className="bubble-heading__subtitle">{subtitle}</p> : null}
    </header>
  );
}
