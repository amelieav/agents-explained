import { classNames } from "../../utils/classNames";
import { glossaryVariantClass } from "./variants";
import { GlossaryTermCardProps } from "./types";
import "./GlossaryTermCard.css";

export function GlossaryTermCard({ item, variant = "default", className }: GlossaryTermCardProps): JSX.Element {
  return (
    <article className={classNames("glossary-card", glossaryVariantClass[variant], className)}>
      <h3>{item.term}</h3>
      <p>{item.definition}</p>
      {item.related && item.related.length > 0 ? (
        <ul>
          {item.related.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
