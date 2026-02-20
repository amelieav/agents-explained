import { useEffect, useState } from "react";
import { ReleaseItem } from "../../types/content";
import { classNames } from "../../utils/classNames";
import { releaseFeedVariantClass } from "./variants";
import { ReleaseFeedProps } from "./types";
import "./ReleaseFeed.css";

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
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

interface GithubRelease {
  tag_name: string;
  name?: string;
  body?: string;
  html_url?: string;
  created_at: string;
  published_at?: string;
}

interface GitTag {
  name: string;
  message?: string;
  release?: {
    description?: string;
  };
  commit?: {
    committed_date?: string;
    created_at?: string;
  };
}

function parseRepoUrl(endpoint: string): URL | null {
  try {
    return new URL(endpoint);
  } catch {
    return null;
  }
}

function getRepositoryUrl(endpoint: string): string | null {
  const parsed = parseRepoUrl(endpoint);
  if (!parsed) {
    return null;
  }

  const parts = parsed.pathname.split("/").filter(Boolean);

  if (parsed.hostname === "api.github.com" && parts[0] === "repos" && parts.length >= 3) {
    return `https://github.com/${parts[1]}/${parts[2]}`;
  }

  if (parsed.hostname === "gitlab.com") {
    const projectIndex = parts.indexOf("projects");
    if (projectIndex >= 0 && parts[projectIndex + 1]) {
      return `https://gitlab.com/${decodeURIComponent(parts[projectIndex + 1])}`;
    }
  }

  return null;
}

function getTagUrl(endpoint: string, tag: string): string {
  const repositoryUrl = getRepositoryUrl(endpoint);
  if (!repositoryUrl) {
    return "#";
  }

  if (repositoryUrl.includes("github.com")) {
    return `${repositoryUrl}/releases/tag/${encodeURIComponent(tag)}`;
  }

  return `${repositoryUrl}/-/tags/${encodeURIComponent(tag)}`;
}

function mapReleasePayload(payload: unknown, endpoint: string, noNotesLabel: string): ReleaseItem[] {
  if (!Array.isArray(payload) || payload.length === 0) {
    return [];
  }

  const [first] = payload;
  if (!first || typeof first !== "object") {
    return [];
  }

  if ("tag_name" in first) {
    const releases = payload as Array<GitlabRelease | GithubRelease>;
    return releases.map((release) => ({
      tag: release.tag_name,
      name: release.name || release.tag_name,
      url:
        ("html_url" in release && release.html_url) ||
        ("_links" in release ? release._links?.self : undefined) ||
        getTagUrl(endpoint, release.tag_name),
      publishedAt:
        ("released_at" in release && release.released_at) ||
        ("published_at" in release && release.published_at) ||
        release.created_at,
      summary: summarize(
        ("description" in release ? release.description : undefined) ||
          ("body" in release ? release.body : undefined),
        noNotesLabel
      )
    }));
  }

  if ("name" in first) {
    const tags = payload as GitTag[];
    return tags.map((tag) => ({
      tag: tag.name,
      name: tag.name,
      url: getTagUrl(endpoint, tag.name),
      publishedAt: tag.commit?.committed_date || tag.commit?.created_at,
      summary: summarize(tag.release?.description || tag.message, noNotesLabel)
    }));
  }

  return [];
}

function toTagEndpoint(endpoint: string): string | null {
  return endpoint.includes("/releases") ? endpoint.replace("/releases", "/tags") : null;
}

async function fetchPayload(endpoint: string): Promise<unknown> {
  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch release feed");
  }

  return response.json();
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
        const releasePayload = await fetchPayload(endpoint);
        let mapped = mapReleasePayload(releasePayload, endpoint, noNotesLabel);
        if (mapped.length === 0) {
          const tagEndpoint = toTagEndpoint(endpoint);
          if (tagEndpoint) {
            const tagPayload = await fetchPayload(tagEndpoint);
            mapped = mapReleasePayload(tagPayload, tagEndpoint, noNotesLabel);
          }
        }

        if (!mounted) {
          return;
        }

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
          <p className="release-feed__meta">{item.publishedAt ? `${item.tag} - ${formatDate(item.publishedAt)}` : item.tag}</p>
          <p className="release-feed__summary">{item.summary}</p>
        </li>
      ))}
    </ul>
  );
}
