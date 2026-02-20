import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GlossaryTermCard } from "../components/GlossaryTermCard/GlossaryTermCard";
import { glossaryItems, glossaryPageCopy } from "../content/copy";
import "./GlossaryPage.css";

type GlossaryFilter = "all" | "saved" | "related";

const SAVED_TERMS_KEY = "agents_explained_saved_glossary_terms";

function readSavedTerms(): string[] {
  try {
    const raw = window.localStorage.getItem(SAVED_TERMS_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((value): value is string => typeof value === "string");
  } catch {
    return [];
  }
}

export function GlossaryPage(): JSX.Element {
  const [draftQuery, setDraftQuery] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<GlossaryFilter>("all");
  const [savedTerms, setSavedTerms] = useState<string[]>([]);

  useEffect(() => {
    setSavedTerms(readSavedTerms());
  }, []);

  useEffect(() => {
    window.localStorage.setItem(SAVED_TERMS_KEY, JSON.stringify(savedTerms));
  }, [savedTerms]);

  const savedSet = useMemo(() => new Set(savedTerms), [savedTerms]);

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = glossaryItems.filter((item) => {
      if (filter === "saved" && !savedSet.has(item.term)) {
        return false;
      }

      if (filter === "related" && (!item.related || item.related.length === 0)) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const relatedText = item.related ? item.related.join(" ").toLowerCase() : "";
      return (
        item.term.toLowerCase().includes(normalizedQuery) ||
        item.definition.toLowerCase().includes(normalizedQuery) ||
        relatedText.includes(normalizedQuery)
      );
    });

    const alphabetized = [...filtered].sort((left, right) => left.term.localeCompare(right.term));

    if (!normalizedQuery && filter === "all") {
      return alphabetized.sort((left, right) => {
        const leftSaved = savedSet.has(left.term);
        const rightSaved = savedSet.has(right.term);
        if (leftSaved === rightSaved) {
          return left.term.localeCompare(right.term);
        }

        return leftSaved ? -1 : 1;
      });
    }

    return alphabetized;
  }, [filter, query, savedSet]);

  function onSearch(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setQuery(draftQuery);
  }

  function clearSearch(): void {
    setDraftQuery("");
    setQuery("");
    setFilter("all");
  }

  function toggleSaved(term: string): void {
    setSavedTerms((current) => {
      if (current.includes(term)) {
        return current.filter((item) => item !== term);
      }

      return [...current, term];
    });
  }

  return (
    <main className="glossary-page">
      <div className="glossary-page__container">
        <header className="glossary-page__header">
          <p>{glossaryPageCopy.eyebrow}</p>
          <h1>{glossaryPageCopy.title}</h1>
          <p>{glossaryPageCopy.subtitle}</p>
          <Link to="/">{glossaryPageCopy.backLabel}</Link>
        </header>

        <form className="glossary-page__controls" onSubmit={onSearch}>
          <label className="glossary-page__field">
            <span>{glossaryPageCopy.searchLabel}</span>
            <input
              type="search"
              value={draftQuery}
              placeholder={glossaryPageCopy.searchPlaceholder}
              onChange={(event) => setDraftQuery(event.target.value)}
            />
          </label>

          <label className="glossary-page__field glossary-page__field--filter">
            <span>{glossaryPageCopy.filterLabel}</span>
            <select value={filter} onChange={(event) => setFilter(event.target.value as GlossaryFilter)}>
              <option value="all">{glossaryPageCopy.filterAll}</option>
              <option value="saved">{glossaryPageCopy.filterSaved}</option>
              <option value="related">{glossaryPageCopy.filterRelated}</option>
            </select>
          </label>

          <div className="glossary-page__actions">
            <button type="submit">{glossaryPageCopy.searchButton}</button>
            <button type="button" onClick={clearSearch}>
              {glossaryPageCopy.clearButton}
            </button>
          </div>
        </form>

        <p className="glossary-page__result-count">
          {visibleItems.length} {glossaryPageCopy.resultLabel}
        </p>

        {visibleItems.length > 0 ? (
          <section className="glossary-page__grid">
            {visibleItems.map((item) => (
              <GlossaryTermCard
                key={item.term}
                item={item}
                saved={savedSet.has(item.term)}
                saveLabel={glossaryPageCopy.saveButton}
                savedLabel={glossaryPageCopy.savedButton}
                onToggleSave={toggleSaved}
                variant="bordered"
              />
            ))}
          </section>
        ) : (
          <p className="glossary-page__empty">{glossaryPageCopy.empty}</p>
        )}
      </div>
    </main>
  );
}
