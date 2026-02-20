import { useEffect, useState } from "react";
import { ReleaseItem } from "../../types/content";
import { classNames } from "../../utils/classNames";
import { releaseFeedVariantClass } from "./variants";
import { ReleaseFeedProps } from "./types";
import "./ReleaseFeed.css";

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(value));
}

function summarize(text: string | null | undefined, noNotesLabel: string): string {
  if (!text) {
    return noNotesLabel;
  }

  const normalized = text.replace(/\s+/g, " ").trim();
  return normalized.length > 180 ? `${normalized.slice(0, 179)}...` : normalized;
}

interface GitlabRelease {
  tag_name: string;
  name?: string;
  description?: string;
  created_at: string;
  released_at?: string;
  _links?: {
    self?: string;
  };
}

export function ReleaseFeed({
  endpoint,
  emptyLabel,
  loadingLabel,
  errorLabel,
  noNotesLabel,
  variant = "default",
  className
}: ReleaseFeedProps): JSX.Element {
  const [items, setItems] = useState<ReleaseItem[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle");

  useEffect(() => {
    let mounted = true;

    async function load(): Promise<void> {
      setState("loading");

      try {
        const response = await fetch(endpoint, {
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch release feed");
        }

        const payload = (await response.json()) as GitlabRelease[];
        if (!mounted) {
          return;
        }

        const mapped: ReleaseItem[] = payload.map((release) => ({
          tag: release.tag_name,
          name: release.name || release.tag_name,
          url: release._links?.self || "#",
          publishedAt: release.released_at || release.created_at,
          summary: summarize(release.description, noNotesLabel)
        }));

        setItems(mapped);
        setState("loaded");
      } catch (_error) {
        if (mounted) {
          setState("error");
        }
      }
    }

    void load();

    return () => {
      mounted = false;
    };
  }, [endpoint, noNotesLabel]);

  if (state === "loading" || state === "idle") {
    return <p className={classNames("release-feed__status", className)}>{loadingLabel}</p>;
  }

  if (state === "error") {
    return <p className={classNames("release-feed__status", className)}>{errorLabel}</p>;
  }

  if (items.length === 0) {
    return <p className={classNames("release-feed__status", className)}>{emptyLabel}</p>;
  }

  return (
    <ul className={classNames("release-feed", releaseFeedVariantClass[variant], className)}>
      {items.map((item) => (
        <li key={item.tag} className="release-feed__item">
          <a href={item.url} target="_blank" rel="noreferrer">
            {item.name}
          </a>
          <p className="release-feed__meta">
            {item.tag} - {formatDate(item.publishedAt)}
          </p>
          <p className="release-feed__summary">{item.summary}</p>
        </li>
      ))}
    </ul>
  );
}
