const phraseReplacements: Array<{ pattern: RegExp; replacement: string }> = [
  { pattern: /\bModel Context Protocol \(MCP\)\b/g, replacement: "MCP (a standard connector format)" },
  { pattern: /\bmulti-agent\b/gi, replacement: "team-based helper" },
  { pattern: /\bAI agents?\b/gi, replacement: "AI helpers" },
  { pattern: /\bagents?\b/gi, replacement: "helpers" },
  { pattern: /\borchestrator\b/gi, replacement: "coordinator" },
  { pattern: /\borchestration\b/gi, replacement: "coordination" },
  { pattern: /\bworkflow\b/gi, replacement: "step-by-step process" },
  { pattern: /\bstate machine\b/gi, replacement: "step map" },
  { pattern: /\bstateful\b/gi, replacement: "state-aware" },
  { pattern: /\bguardrails?\b/gi, replacement: "safety rules" },
  { pattern: /\bconstraints?\b/gi, replacement: "limits" },
  { pattern: /\bretrieval\b/gi, replacement: "looking up stored info" },
  { pattern: /\bAPI(?:s)?\b/g, replacement: "app connections" },
  { pattern: /\bSDK\b/g, replacement: "developer toolkit" },
  { pattern: /\bevaluate\b/gi, replacement: "check" },
  { pattern: /\bvalidation\b/gi, replacement: "checking" },
  { pattern: /\bverify\b/gi, replacement: "double-check" },
  { pattern: /\bcriteria\b/gi, replacement: "success checks" },
  { pattern: /\bdeploy(?:ment)?\b/gi, replacement: "rollout" },
  { pattern: /\biterate(?:d|s|ion)?\b/gi, replacement: "repeat" },
  { pattern: /\bparallel(?:ism)?\b/gi, replacement: "at the same time" },
  { pattern: /\bautonomous\b/gi, replacement: "self-running" },
  { pattern: /\bresumability\b/gi, replacement: "restart support" },
  { pattern: /\bdeterministic\b/gi, replacement: "predictable" }
];

function normalizeSpacing(text: string): string {
  return text
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

export function toLaymanText(text: string): string {
  let result = text;

  for (const replacement of phraseReplacements) {
    result = result.replace(replacement.pattern, replacement.replacement);
  }

  result = result.replace(/->/g, "to");
  return normalizeSpacing(result);
}
