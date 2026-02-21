const phraseReplacements: Array<{ pattern: RegExp; replacement: string }> = [
  { pattern: /\bModel Context Protocol \(MCP\)\b/g, replacement: "MCP (a standard connector format)" },
  { pattern: /\bMCP\b/g, replacement: "MCP (standard connector)" },
  { pattern: /\bmulti-agent\b/gi, replacement: "team-based AI helper" },
  { pattern: /\bAI agents?\b/gi, replacement: "AI assistants that can do tasks" },
  { pattern: /\bagents?\b/gi, replacement: "assistants" },
  { pattern: /\borchestrator\b/gi, replacement: "manager assistant" },
  { pattern: /\borchestration\b/gi, replacement: "step management" },
  { pattern: /\bworkflow\b/gi, replacement: "step-by-step checklist" },
  { pattern: /\bstate machine\b/gi, replacement: "if/then step map" },
  { pattern: /\bstateful\b/gi, replacement: "able to remember progress" },
  { pattern: /\bguardrails?\b/gi, replacement: "hard safety rules" },
  { pattern: /\bconstraints?\b/gi, replacement: "clear limits" },
  { pattern: /\bretrieval\b/gi, replacement: "looking up saved info" },
  { pattern: /\bRAG\b/g, replacement: "RAG (look up docs before answering)" },
  { pattern: /\bAPI(?:s)?\b/g, replacement: "app connections" },
  { pattern: /\bSDK\b/g, replacement: "developer toolkit" },
  { pattern: /\bschema\b/gi, replacement: "required format" },
  { pattern: /\bevaluate\b/gi, replacement: "check quality" },
  { pattern: /\bvalidation\b/gi, replacement: "format checking" },
  { pattern: /\bverify\b/gi, replacement: "double-check" },
  { pattern: /\bcriteria\b/gi, replacement: "success checks" },
  { pattern: /\bdeploy(?:ment)?\b/gi, replacement: "rollout" },
  { pattern: /\biterate(?:d|s|ion)?\b/gi, replacement: "repeat and improve" },
  { pattern: /\bparallel(?:ism)?\b/gi, replacement: "at the same time" },
  { pattern: /\bautonomous\b/gi, replacement: "self-running" },
  { pattern: /\bresumability\b/gi, replacement: "restart support" },
  { pattern: /\bdeterministic\b/gi, replacement: "predictable" },
  { pattern: /\btoken budget\b/gi, replacement: "word-use limit" },
  { pattern: /\bcontext window\b/gi, replacement: "how much text the AI can read at once" }
];

const explanationHints: Array<{ pattern: RegExp; hint: string }> = [
  {
    pattern: /\bMCP\b/i,
    hint: "MCP is like using one standard plug so the AI can connect to many tools the same way."
  },
  {
    pattern: /\bAPI|tool call|tools?\b/i,
    hint: "A tool call means the AI is asking another app or function to do real work."
  },
  {
    pattern: /\bworkflow|orchestration|orchestrator|planner\b/i,
    hint: "Think of this as a checklist with a manager making sure each step happens in order."
  },
  {
    pattern: /\bmodel|LLM\b/i,
    hint: "The model is the AI brain that reads text and decides what to say or do next."
  },
  {
    pattern: /\btoken|context window\b/i,
    hint: "This is the reading/writing limit for one AI run, similar to a page limit."
  },
  {
    pattern: /\bschema|required format|validation\b/i,
    hint: "This means responses must follow a strict template so software can read them safely."
  }
];

const MAX_HINTS = 2;

function normalizeSpacing(text: string): string {
  return text
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function withSentenceCase(text: string): string {
  if (!text) {
    return text;
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

function collectHints(source: string): string[] {
  const hints: string[] = [];

  for (const hint of explanationHints) {
    if (hint.pattern.test(source)) {
      hints.push(hint.hint);
      if (hints.length >= MAX_HINTS) {
        break;
      }
    }
  }

  return hints;
}

export function toLaymanText(text: string): string {
  let result = text;
  const source = text;

  for (const replacement of phraseReplacements) {
    result = result.replace(replacement.pattern, replacement.replacement);
  }

  result = result.replace(/->/g, "to");
  result = withSentenceCase(normalizeSpacing(result));

  const hints = collectHints(source);
  if (hints.length > 0 && source.length >= 65) {
    result = `${result} Plain-English note: ${hints.join(" ")}`;
  }

  return result;
}
