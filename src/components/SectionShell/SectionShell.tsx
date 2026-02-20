import { BubbleHeading } from "../BubbleHeading/BubbleHeading";
import { LayeredPanel } from "../LayeredPanel/LayeredPanel";
import { classNames } from "../../utils/classNames";
import { SectionShellProps } from "./types";
import { sectionShellVariants } from "./variants";
import "./SectionShell.css";

export function SectionShell({
  id,
  title,
  eyebrow,
  summary,
  variant = "soft",
  headingVariant = "section",
  className,
  children
}: SectionShellProps): JSX.Element {
  return (
    <section id={id} className={classNames(sectionShellVariants.base, className)}>
      <LayeredPanel variant={variant}>
        <BubbleHeading title={title} eyebrow={eyebrow} subtitle={summary} variant={headingVariant} />
        <div className="section-shell__content">{children}</div>
      </LayeredPanel>
    </section>
  );
}
