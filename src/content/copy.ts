import { FAQItem, FrameworkFitItem, GlossaryItem, LoopStep, PatternItem } from "../types/content";

export const siteCopy = {
  title: "How AI Agents Work",
  eyebrow: "Agents Explained",
  subtitle:
    "A practical guide for developers who want clear architecture choices, not just buzzwords.",
  sidebarTitle: "Guide Map",
  sidebarNote: "Scroll naturally or jump by section.",
  labCta: "Open Component Lab",
  mobileMenuLabel: "Open section menu",
  releaseEndpoint:
    "https://gitlab.com/api/v4/projects/" + encodeURIComponent("ai-agent-coded/agents-explained") + "/releases?per_page=8"
};

export const introCopy = {
  heading: "What is an AI agent?",
  summary:
    "An AI agent is software that accepts a goal, reasons through steps, uses tools, and checks its own work before returning results.",
  bullets: [
    "A chatbot can answer. An agent can act.",
    "Agents are loops, not one-shot prompts.",
    "Reliability comes from constraints and verification, not model power alone."
  ]
};

export const mentalModelCards = [
  {
    title: "Goal",
    body: "A concrete outcome with boundaries and success criteria."
  },
  {
    title: "Planner",
    body: "Turns one big objective into ordered steps."
  },
  {
    title: "Tools",
    body: "External actions: APIs, retrieval, file edits, tests, and commands."
  },
  {
    title: "Memory",
    body: "Short-term state and reusable knowledge for continuity."
  },
  {
    title: "Evaluator",
    body: "Checks quality and decides whether to retry or finish."
  }
];

export const loopSteps: LoopStep[] = [
  {
    id: "understand",
    label: "Understand",
    detail: "Parse intent, constraints, and expected output."
  },
  {
    id: "plan",
    label: "Plan",
    detail: "Select the next smallest useful action."
  },
  {
    id: "act",
    label: "Act",
    detail: "Execute tool calls or write intermediate output."
  },
  {
    id: "evaluate",
    label: "Evaluate",
    detail: "Measure result quality against success criteria."
  },
  {
    id: "adapt",
    label: "Adapt",
    detail: "Revise the plan, then repeat until complete."
  }
];

export const frameworkFit: FrameworkFitItem[] = [
  {
    name: "Raw SDK + custom orchestration",
    bestFor: "Teams that want full control over loop logic and runtime contracts.",
    mentalModel: "You design your own state machine and guardrails.",
    caveat: "Most flexible, but highest engineering overhead."
  },
  {
    name: "LangChain",
    bestFor: "Fast assembly of prompts, tools, and retrieval workflows.",
    mentalModel: "Composable chains with useful abstractions for common patterns.",
    caveat: "Abstractions can hide complexity during debugging."
  },
  {
    name: "LangGraph",
    bestFor: "Durable, stateful, multi-step agent workflows.",
    mentalModel: "Explicit graph/state transitions between nodes.",
    caveat: "Requires stronger architecture discipline up front."
  }
];

export const mcpCopy = {
  heading: "MCP vs tools vs docs",
  summary:
    "Model Context Protocol (MCP) standardizes how a model connects to external capabilities. It is the connection layer, not the content itself.",
  cards: [
    {
      title: "MCP",
      body: "A protocol for exposing capabilities and context in a consistent way."
    },
    {
      title: "Tools",
      body: "Actions the agent can execute, such as calling APIs or editing files."
    },
    {
      title: "Docs/Knowledge",
      body: "Reference context the model can read, cite, or summarize."
    }
  ]
};

export const organizationPatterns: PatternItem[] = [
  {
    name: "Supervisor + workers",
    whenToUse: "Large tasks that split naturally by specialization.",
    risk: "Coordination overhead and context drift if contracts are weak."
  },
  {
    name: "Pipeline handoff",
    whenToUse: "Predictable stages such as ingest -> plan -> execute -> review.",
    risk: "Brittle transitions if outputs are not schema-validated."
  },
  {
    name: "Specialist swarm",
    whenToUse: "Parallel exploration with compare-and-select strategy.",
    risk: "Cost growth and duplicate effort without a clear scoring rule."
  }
];

export const bigProjectPractices = [
  "Define ownership boundaries for each agent role.",
  "Enforce machine-readable contracts between agents.",
  "Persist intermediate state for resumability.",
  "Capture traces and tool logs for debugging.",
  "Add rollback-safe execution boundaries for risky actions."
];

export const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "Do I need LangChain or LangGraph to build agents?",
    answer:
      "No. You can build directly with model and tool APIs. Frameworks help you move faster, but they are optional."
  },
  {
    id: "faq-2",
    question: "Is MCP a replacement for tools?",
    answer:
      "No. MCP is a protocol to expose capabilities and context. Tools are still the actual executable actions."
  },
  {
    id: "faq-3",
    question: "What is the minimum viable agent loop?",
    answer:
      "Understand -> Plan -> Act -> Evaluate -> Repeat. Keep each stage explicit and observable."
  }
];

export const glossaryItems: GlossaryItem[] = [
  {
    term: "Tool call",
    definition: "A structured request made by the model to execute an external function.",
    related: ["function", "API action"]
  },
  {
    term: "Planner",
    definition: "The mechanism that selects next actions from goals and current state.",
    related: ["state machine", "policy"]
  },
  {
    term: "Evaluator",
    definition: "The check step that scores outputs against requirements before finalizing.",
    related: ["validation", "guardrails"]
  },
  {
    term: "Guardrail",
    definition: "A hard rule that constrains behavior, tool usage, or output format.",
    related: ["policy", "safety check"]
  },
  {
    term: "Retry policy",
    definition: "A bounded strategy that decides when and how the agent should try again.",
    related: ["backoff", "error handling"]
  },
  {
    term: "Handoff",
    definition: "A transfer of control and context from one agent or stage to another.",
    related: ["pipeline", "multi-agent"]
  },
  {
    term: "Schema validation",
    definition: "Runtime verification that structured output matches an expected shape.",
    related: ["JSON schema", "contracts"]
  },
  {
    term: "Idempotent action",
    definition: "An operation that can be repeated without changing the final system state.",
    related: ["safety", "side effects"]
  },
  {
    term: "Trace",
    definition: "A step-by-step log of prompts, tool calls, outputs, and decisions.",
    related: ["observability", "debugging"]
  },
  {
    term: "Context window",
    definition: "The bounded token budget the model can consider in one pass.",
    related: ["prompt", "memory"]
  }
];

export const releaseCopy = {
  heading: "Latest Releases",
  subheading: "Auto-loaded from GitLab Releases API.",
  loading: "Loading releases...",
  empty: "No releases found yet. Publish a GitLab release to populate this feed.",
  error: "Could not load releases right now.",
  noNotes: "No release notes yet."
};

export const labCopy = {
  title: "Component Lab",
  subtitle:
    "Preview each component in isolation. Adjust theme and density without touching production page layout.",
  eyebrow: "UI Architecture Lab",
  themeLabel: "Theme",
  densityLabel: "Density",
  sampleLabel: "Sample content",
  sampleSummaryLabel: "Sample summary",
  sampleTitleDefault: "Sample section title",
  sampleSummaryDefault: "This content comes from controlled props, not hardcoded component text.",
  sectionShellNote: "SectionShell composes LayeredPanel + BubbleHeading so page sections stay consistent.",
  backLabel: "Back to guide",
  snippetLabel: "Usage",
  releasesEndpoint:
    "https://gitlab.com/api/v4/projects/" + encodeURIComponent("ai-agent-coded/agents-explained") + "/releases?per_page=4"
};

export const homeSectionCopy = {
  mentalModel: {
    title: "Mental model",
    summary: "These pieces show up in almost every practical agent system."
  },
  loop: {
    title: "Simplest agent loop",
    summary: "Make each step observable and measurable."
  },
  framework: {
    title: "How LangChain and LangGraph fit",
    summary: "Treat frameworks as orchestration choices, not magical requirements."
  },
  organization: {
    title: "Ways to organize agents in big projects",
    summary: "Choose an organization model that fits ownership and risk boundaries."
  },
  practices: {
    title: "Big project operating practices",
    summary: "Treat agent systems as production systems, not demos."
  },
  faq: {
    title: "FAQ",
    summary: "Direct answers to common points of confusion."
  },
  glossary: {
    title: "Glossary",
    summary: "Expanded quick-reference terms in plain language."
  }
};

export const frameworkTableCopy = {
  option: "Option",
  bestFor: "Best for",
  mentalModel: "Mental model",
  caveat: "Caveat"
};

export const sharedLabels = {
  whenToUse: "When to use",
  risk: "Risk"
};
