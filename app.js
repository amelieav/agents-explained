const PROJECT_PATH = "ai-agent-coded/agents-explained";
const RELEASES_API = `https://gitlab.com/api/v4/projects/${encodeURIComponent(PROJECT_PATH)}/releases?per_page=8`;

function formatDate(value) {
  if (!value) return "Unknown date";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(value));
}

function shortText(text, max = 180) {
  if (!text) return "No release notes provided.";
  const cleaned = text.replace(/\s+/g, " ").trim();
  return cleaned.length > max ? `${cleaned.slice(0, max - 1)}…` : cleaned;
}

function createItem(release) {
  const item = document.createElement("li");
  item.className = "release-item";

  const title = release.name || release.tag_name;
  const link = release._links?.self || release.url || "#";

  item.innerHTML = `
    <a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a>
    <div class="release-meta">Tag: ${release.tag_name} • Published: ${formatDate(release.released_at || release.created_at)}</div>
    <div class="release-desc">${shortText(release.description)}</div>
  `;

  return item;
}

async function loadReleases() {
  const list = document.getElementById("release-list");
  list.innerHTML = "<li class='release-item'>Loading releases...</li>";

  try {
    const response = await fetch(RELEASES_API, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`GitLab API returned ${response.status}`);

    const releases = await response.json();
    list.innerHTML = "";

    if (!Array.isArray(releases) || releases.length === 0) {
      list.innerHTML = "<li class='release-item'>No releases found yet. Create your first Git tag + release in GitLab.</li>";
      return;
    }

    releases.forEach((release) => list.appendChild(createItem(release)));
  } catch (_error) {
    list.innerHTML = "<li class='release-item'>Could not load releases right now. Try again in a moment.</li>";
  }
}

loadReleases();
