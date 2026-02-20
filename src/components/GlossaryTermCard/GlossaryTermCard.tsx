import { classNames } from "../../utils/classNames";
import { glossaryVariantClass } from "./variants";
import { GlossaryTermCardProps } from "./types";
import "./GlossaryTermCard.css";

export function GlossaryTermCard({
  item,
  saved = false,
  saveLabel = "Save",
  savedLabel = "Saved",
  onToggleSave,
  variant = "default",
  className
}: GlossaryTermCardProps): JSX.Element {
  return (
    <article className={classNames("glossary-card", glossaryVariantClass[variant], className)}>
      <header className="glossary-card__header">
        <h3>{item.term}</h3>
        {onToggleSave ? (
          <button
            className={classNames("glossary-card__save", saved && "glossary-card__save--active")}
            type="button"
            onClick={() => onToggleSave(item.term)}
          >
            {saved ? savedLabel : saveLabel}
          </button>
        ) : null}
      </header>
      <p>{item.definition}</p>
      {item.related && item.related.length > 0 ? (
        <ul>
          {item.related.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
      {item.sourceLabel && item.sourceUrl ? (
        <p className="glossary-card__source">
          Source:{" "}
          <a href={item.sourceUrl} target="_blank" rel="noreferrer">
            {item.sourceLabel}
          </a>
        </p>
      ) : null}
    </article>
  );
}
