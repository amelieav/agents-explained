import { AgentLoopReference, FAQItem, FrameworkFitItem, GlossaryItem, LoopStep, PatternItem } from "../types/content";

export const siteCopy = {
  title: "How AI Agents Work",
  eyebrow: "Agents Explained",
  subtitle:
    "A practical guide for developers who want clear architecture choices, not just buzzwords.",
  sidebarTitle: "Guide Map",
  sidebarNote: "Scroll naturally or jump by section.",
  comparisonsCta: "Open Comparisons",
  glossaryCta: "Open Glossary",
  mobileMenuLabel: "Open section menu",
  releaseEndpoint: "https://api.github.com/repos/amelieav/agents-explained/releases?per_page=1"
};

export const introCopy = {
  heading: "What is an AI agent?",
  summary:
    "An AI agent is software that accepts a goal, reasons through steps, uses tools, and checks its own work before returning results.",
  bullets: [
    "A chatbot can answer. An agent can act.",
    "Agent ecosystems are evolving quickly across frameworks and cloud platforms.",
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

export const agentLoopReferences: AgentLoopReference[] = [
  {
    id: "ag2",
    tabLabel: "AG2",
    title: "AG2 (AutoGen) collaborative ecosystem",
    sourceName: "ag2ai/ag2",
    sourceUrl: "https://github.com/ag2ai/ag2",
    why: "AG2 emphasizes role-specialized agents that delegate subtasks and iteratively exchange messages until completion.",
    diagramKind: "conversation-web",
    steps: [
      { id: "ag2-input", label: "Input / task definition", detail: "Receive user goal and scope." },
      { id: "ag2-create", label: "Agent creation", detail: "Spawn specialized role agents." },
      { id: "ag2-message", label: "Message passing", detail: "Exchange structured inter-agent messages." },
      { id: "ag2-delegate", label: "Subtask delegation", detail: "Assign subtasks across agents." },
      { id: "ag2-execute", label: "Execution", detail: "Each agent executes assigned responsibilities." },
      { id: "ag2-aggregate", label: "Result aggregation", detail: "Collate outputs from all agents." },
      { id: "ag2-return", label: "Return output", detail: "Deliver final answer to the user." }
    ]
  },
  {
    id: "microsoft-agent-framework",
    tabLabel: "Microsoft AF",
    title: "Microsoft Agent Framework orchestration architecture",
    sourceName: "Microsoft Agent Framework docs",
    sourceUrl: "https://learn.microsoft.com/en-us/agent-framework/overview/",
    why: "Microsoft treats agents and workflow orchestration as first-class primitives for both open-ended and deterministic enterprise flows.",
    diagramKind: "orchestrator-ladder",
    steps: [
      { id: "ms-trigger", label: "Trigger / start", detail: "User or system initiates workflow." },
      { id: "ms-orchestrate", label: "Agent orchestration", detail: "Define multi-agent structure and routing." },
      { id: "ms-role-exec", label: "Execute role agents", detail: "Creative and analytical agents perform tasks." },
      { id: "ms-control", label: "Workflow control", detail: "Manage branching, sequence, and dependencies." },
      { id: "ms-state", label: "State update", detail: "Agents report progress into shared state." },
      { id: "ms-terminate", label: "Termination", detail: "Stop when goal criteria are met." }
    ]
  },
  {
    id: "google-cloud-multi-agent",
    tabLabel: "Google Cloud",
    title: "Google Cloud coordinator-agent architecture",
    sourceName: "Google Cloud architecture docs",
    sourceUrl: "https://docs.cloud.google.com/architecture/multiagent-ai-system",
    why: "Google Cloud centers on a coordinator pattern for scalable decomposition, inter-agent communication, and iterative refinement.",
    diagramKind: "coordinator-fanout",
    steps: [
      { id: "gc-receive", label: "Receive request", detail: "Frontend/API accepts task." },
      { id: "gc-coordinator", label: "Coordinator agent", detail: "Decompose task and assign plan." },
      { id: "gc-subagents", label: "Invoke sub-agents", detail: "Delegate to specialists." },
      { id: "gc-a2a", label: "A2A communication", detail: "Exchange intermediate outputs." },
      { id: "gc-refine", label: "Iterative refinement", detail: "Repeat until quality threshold." },
      { id: "gc-aggregate", label: "Aggregate result", detail: "Coordinator composes final response." },
      { id: "gc-return", label: "Return to frontend", detail: "Send results to caller." }
    ]
  },
  {
    id: "google-adk",
    tabLabel: "Google ADK",
    title: "Google ADK workflow-agent architecture",
    sourceName: "Google ADK multi-agent docs",
    sourceUrl: "https://google.github.io/adk-docs/agents/multi-agents/",
    why: "ADK makes control flow itself agentic through SequentialAgent, ParallelAgent, and LoopAgent composition.",
    diagramKind: "controller-stack",
    steps: [
      { id: "adk-define", label: "Define agents & hierarchy", detail: "Set base roles and topology." },
      { id: "adk-compose", label: "Compose workflow agents", detail: "Build sequential/parallel/loop controllers." },
      { id: "adk-delegate", label: "Delegate sub-tasks", detail: "Route work to sub-agents." },
      { id: "adk-compute", label: "Compute / interact", detail: "Agents run with shared context." },
      { id: "adk-monitor", label: "Monitor & check state", detail: "Observe progress and loop conditions." },
      { id: "adk-collect", label: "Collect results", detail: "Merge sub-agent outputs." },
      { id: "adk-finalize", label: "Finalize output", detail: "Return completed response." }
    ]
  },
  {
    id: "google-vertex-adk",
    tabLabel: "Vertex AI",
    title: "Google Vertex AI + ADK feedback ecosystem",
    sourceName: "Google Cloud blog (ADK multi-agent systems)",
    sourceUrl: "https://cloud.google.com/blog/products/ai-machine-learning/build-multi-agentic-systems-using-google-adk",
    why: "Vertex AI guidance emphasizes continuous feedback between orchestrator and specialists until task criteria are satisfied.",
    diagramKind: "feedback-loop",
    steps: [
      { id: "vertex-intake", label: "Task intake", detail: "Receive user goal via API/UI." },
      { id: "vertex-orchestrator", label: "Orchestrator agent", detail: "Split work into logical stages." },
      { id: "vertex-specialists", label: "Specialist agents", detail: "Assign domain subtasks." },
      { id: "vertex-tools", label: "Tool/model calls", detail: "Use search, compute, and model APIs." },
      { id: "vertex-feedback", label: "Feedback loop", detail: "Iterate until acceptance criteria." },
      { id: "vertex-compile", label: "Result compilation", detail: "Aggregate validated outputs." },
      { id: "vertex-publish", label: "Publish final", detail: "Send to user/system." }
    ]
  },
  {
    id: "ag2-autobuild",
    tabLabel: "AutoBuild",
    title: "AG2 AutoBuild generated workflow ecosystem",
    sourceName: "AG2 AutoBuild docs",
    sourceUrl: "https://docs.ag2.ai/latest/docs/blog/2023/11/26/Agent-AutoBuild/",
    why: "AutoBuild automates agent assembly from high-level prompts to reduce manual orchestration overhead and preserve iterative completion loops.",
    diagramKind: "autobuild-pipeline",
    steps: [
      { id: "auto-prompt", label: "User prompt", detail: "User describes high-level task." },
      { id: "auto-generate", label: "AgentBuilder generation", detail: "Create expert agents automatically." },
      { id: "auto-chat", label: "Group chat setup", detail: "Initialize agent communication topology." },
      { id: "auto-loop", label: "Execution loop", detail: "Agents exchange messages and refine output." },
      { id: "auto-monitor", label: "Monitor progress", detail: "Track completion and blockers." },
      { id: "auto-end", label: "End condition", detail: "Stop when subtasks are done." },
      { id: "auto-return", label: "Return output", detail: "Deliver final structured result." }
    ]
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
    term: "ReAct loop",
    definition: "A prompting pattern that alternates explicit reasoning steps with tool actions.",
    related: ["chain-of-thought", "tool call"]
  },
  {
    term: "Function-calling schema",
    definition: "The typed argument contract a model must follow when invoking a tool.",
    related: ["JSON schema", "validation"]
  },
  {
    term: "Tool router",
    definition: "Logic that selects which tool to call based on intent, state, and policy.",
    related: ["planner", "policy"]
  },
  {
    term: "Planning horizon",
    definition: "How many future steps the planner considers before choosing the next action.",
    related: ["planner", "search depth"]
  },
  {
    term: "Reflection step",
    definition: "An explicit self-review pass where the agent critiques and revises its output.",
    related: ["evaluator", "retry policy"]
  },
  {
    term: "Critic model",
    definition: "A separate model pass used to evaluate quality, safety, or correctness.",
    related: ["evaluator", "judge"]
  },
  {
    term: "Token budget",
    definition: "The allocated token limit for a step or run, often split across prompt and output.",
    related: ["context window", "cost control"]
  },
  {
    term: "Retrieval-augmented generation (RAG)",
    definition: "A method that injects retrieved documents into context before generation.",
    related: ["retrieval", "vector index"]
  },
  {
    term: "Vector index",
    definition: "A data structure for approximate nearest-neighbor search over embeddings.",
    related: ["RAG", "embedding"]
  },
  {
    term: "Embedding drift",
    definition: "Quality degradation caused by mismatched embedding models, corpora, or index versions.",
    related: ["retrieval quality", "index maintenance"]
  },
  {
    term: "Execution sandbox",
    definition: "An isolated runtime for tool execution that limits filesystem, network, or process access.",
    related: ["least privilege", "safety"]
  },
  {
    term: "Circuit breaker",
    definition: "A protection rule that halts repeated failing actions to prevent cascading errors.",
    related: ["retry policy", "resilience"]
  },
  {
    term: "Dead-letter queue",
    definition: "A holding queue for failed tasks that require manual inspection or reprocessing.",
    related: ["job orchestration", "failure handling"]
  },
  {
    term: "Human-in-the-loop (HITL)",
    definition: "A workflow where certain actions require explicit human approval before execution.",
    related: ["approval gate", "risk control"]
  },
  {
    term: "Deterministic replay",
    definition: "Re-running an agent trace with fixed inputs and seeds to reproduce behavior.",
    related: ["debugging", "trace"]
  },
  {
    term: "Prompt injection",
    definition: "Malicious or untrusted text designed to override instructions or exfiltrate data.",
    related: ["guardrail", "security"]
  },
  {
    term: "Capability scoping",
    definition: "Restricting an agent to a minimal set of tools and permissions for a task.",
    related: ["least privilege", "tool policy"]
  },
  {
    term: "State checkpoint",
    definition: "A persisted snapshot of workflow state used to resume long-running executions.",
    related: ["durability", "resumability"]
  },
  {
    term: "Partial failure recovery",
    definition: "Continuing a workflow by retrying only failed branches rather than restarting everything.",
    related: ["resilience", "idempotent action"]
  },
  {
    term: "Cost guard",
    definition: "A runtime threshold that stops execution when token spend or tool usage exceeds budget.",
    related: ["token budget", "policy"]
  },
  {
    term: "Agent",
    definition: "An AI entity assigned a durable role and responsibility within a larger system.",
    related: ["agent identity", "session"]
  },
  {
    term: "Multi-agent system",
    definition: "A system where multiple specialized agents run concurrently and coordinate toward shared outcomes.",
    related: ["swarming", "orchestrator"]
  },
  {
    term: "Agent orchestrator",
    definition: "Software that routes work across agents, tracks dependencies, and drives workflows to completion.",
    related: ["task routing", "lifecycle management"]
  },
  {
    term: "Swarming",
    definition: "Parallel deployment of many agents on related tasks to increase throughput and reduce delivery time.",
    related: ["parallelization", "multi-agent"]
  },
  {
    term: "Workflow (agentic context)",
    definition: "A structured execution plan with ordered tasks, dependencies, gates, and acceptance criteria.",
    related: ["gate state", "work graph"]
  },
  {
    term: "Persistent work representation",
    definition: "Storing tasks and execution state outside model context so progress survives resets and restarts.",
    related: ["durable execution", "state checkpoint"]
  },
  {
    term: "Durable execution",
    definition: "A property where long-running workflows eventually finish despite crashes, resets, or agent restarts.",
    related: ["resilience", "recovery"]
  },
  {
    term: "Idempotent workflow design",
    definition: "Designing steps so retries are safe and repeated execution does not corrupt system state.",
    related: ["idempotent action", "retry policy"]
  },
  {
    term: "Agent identity vs session",
    definition: "A design split where agents are persistent identities while sessions are temporary runtime instances.",
    related: ["agent", "session"]
  },
  {
    term: "Hook-based execution",
    definition: "Automatically running assigned work for an agent on startup through predefined lifecycle hooks.",
    related: ["autonomous continuation", "startup hooks"]
  },
  {
    term: "Nudging",
    definition: "Explicitly prompting an agent to re-check assigned tasks when passive polling is unreliable.",
    related: ["patrol agents", "workflow recovery"]
  },
  {
    term: "Patrol agents",
    definition: "Recurring agents that monitor queues, detect stalled workflows, and trigger recovery actions.",
    related: ["controllers", "health checks"]
  },
  {
    term: "Merge queue management (agentic context)",
    definition: "Coordinating concurrent AI code changes via ordered merges, rebases, and conflict handling.",
    related: ["rebase automation", "conflict resolution"]
  },
  {
    term: "Convoy",
    definition: "A tracked delivery unit that bundles multiple related tasks and marks done when all complete.",
    related: ["delivery batch", "work order"]
  },
  {
    term: "MEOW (Molecular Expression of Work)",
    definition:
      "A Gas Town concept for modeling knowledge work as composable workflow structures outside the LLM context window.",
    related: ["bead", "molecule", "protomolecule", "formula", "wisp"],
    sourceLabel: "Gas Town (Steve Yegge)",
    sourceUrl: "https://medium.com/@steveyegge/welcome-to-gas-town-2026"
  },
  {
    term: "Bead (MEOW)",
    definition: "An atomic unit of work in the MEOW model; roughly equivalent to a single issue or task item.",
    related: ["MEOW", "work item"],
    sourceLabel: "Gas Town (Steve Yegge)",
    sourceUrl: "https://medium.com/@steveyegge/welcome-to-gas-town-2026"
  },
  {
    term: "Molecule (MEOW)",
    definition: "A composed workflow graph of multiple Beads representing a larger execution path.",
    related: ["MEOW", "workflow graph"],
    sourceLabel: "Gas Town (Steve Yegge)",
    sourceUrl: "https://medium.com/@steveyegge/welcome-to-gas-town-2026"
  },
  {
    term: "Protomolecule (MEOW)",
    definition: "A reusable workflow template that can generate multiple concrete Molecules.",
    related: ["MEOW", "workflow template"],
    sourceLabel: "Gas Town (Steve Yegge)",
    sourceUrl: "https://medium.com/@steveyegge/welcome-to-gas-town-2026"
  },
  {
    term: "Formula (MEOW)",
    definition: "A definition language for dynamically instantiating workflow structures from templates.",
    related: ["MEOW", "workflow DSL"],
    sourceLabel: "Gas Town (Steve Yegge)",
    sourceUrl: "https://medium.com/@steveyegge/welcome-to-gas-town-2026"
  },
  {
    term: "Wisp (MEOW)",
    definition: "An ephemeral instantiated workflow execution derived from a MEOW Formula.",
    related: ["MEOW", "ephemeral workflow"],
    sourceLabel: "Gas Town (Steve Yegge)",
    sourceUrl: "https://medium.com/@steveyegge/welcome-to-gas-town-2026"
  },
  {
    term: "Nondeterministic idempotence",
    definition:
      "A property where variable AI step outputs still converge to a correct final state, and retries remain safe.",
    related: ["idempotent workflow design", "durable execution"]
  },
  {
    term: "Work as graph",
    definition: "Representing work as nodes and edges with dependencies, loops, and conditional execution paths.",
    related: ["workflow", "orchestration graph"]
  },
  {
    term: "Gate state",
    definition: "A workflow pause point waiting for an external signal such as CI, approval, or API callback.",
    related: ["wait condition", "workflow control"]
  },
  {
    term: "Plugin architecture (agentic)",
    definition: "An extension model that injects policy checks, integrations, and domain logic into workflows.",
    related: ["extensibility", "policy enforcement"]
  },
  {
    term: "Ephemeral vs persistent work",
    definition: "Separating short-lived orchestration metadata from durable deliverable work artifacts.",
    related: ["persistent work representation", "state checkpoint"]
  },
  {
    term: "Role-specialized agents",
    definition: "Using different prompts and policies per role such as planner, implementer, reviewer, and merger.",
    related: ["multi-agent system", "division of labor"]
  },
  {
    term: "Token throughput",
    definition: "The rate at which a system consumes model tokens over time across parallel executions.",
    related: ["cost guard", "capacity planning"]
  },
  {
    term: "YOLO mode",
    definition: "A high-autonomy mode where agents execute actions without interactive permission prompts.",
    related: ["risk control", "autonomy"]
  },
  {
    term: "Wide agent",
    definition: "An agent granted broad authority across files, tools, and refactor scope instead of narrow tasks.",
    related: ["capability scoping", "autonomy"]
  },
  {
    term: "Langflow",
    definition:
      "A visual low-code orchestration studio for building and deploying LLM workflows and multi-agent graphs.",
    related: ["application orchestration", "LangChain", "workflow builder"],
    sourceLabel: "langflow-ai/langflow",
    sourceUrl: "https://github.com/langflow-ai/langflow"
  },
  {
    term: "Dify",
    definition:
      "A production-focused LLM application platform that combines workflow orchestration, RAG, model management, and observability.",
    related: ["LLM app platform", "RAG", "agent builder"],
    sourceLabel: "langgenius/dify",
    sourceUrl: "https://github.com/langgenius/dify"
  },
  {
    term: "Browser-Use",
    definition: "A browser-native execution framework that lets LLM agents automate real websites via controlled sessions.",
    related: ["execution layer", "browser automation", "Playwright"],
    sourceLabel: "browser-use/browser-use",
    sourceUrl: "https://github.com/browser-use/browser-use"
  },
  {
    term: "RAGFlow",
    definition: "An enterprise-grade retrieval and context engine for document-heavy RAG systems with agentic workflow support.",
    related: ["context layer", "retrieval", "grounded citations"],
    sourceLabel: "infiniflow/ragflow",
    sourceUrl: "https://github.com/infiniflow/ragflow"
  },
  {
    term: "Prompt Engineering Guide",
    definition:
      "A knowledge repository covering prompt design, reasoning patterns, and agent/RAG prompting techniques rather than runtime infrastructure.",
    related: ["cognitive design", "ReAct", "prompt strategy"],
    sourceLabel: "dair-ai/Prompt-Engineering-Guide",
    sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
  },
  {
    term: "Flow (Langflow)",
    definition:
      "The core visual node graph in Langflow representing an LLM workflow or multi-agent pipeline deployable as API, JSON, or tool.",
    related: ["Langflow", "workflow graph", "canvas"],
    sourceLabel: "langflow-ai/langflow",
    sourceUrl: "https://github.com/langflow-ai/langflow"
  },
  {
    term: "Component (Langflow)",
    definition: "A modular block in Langflow Flows, such as an LLM, retriever, tool, memory, or custom Python component.",
    related: ["Flow (Langflow)", "modular design"],
    sourceLabel: "langflow-ai/langflow",
    sourceUrl: "https://github.com/langflow-ai/langflow"
  },
  {
    term: "MCP Server (Langflow integration)",
    definition: "Langflow capability that exposes flows through an MCP server so external MCP clients can invoke them as tools.",
    related: ["Langflow", "MCP", "tool integration"],
    sourceLabel: "langflow-ai/langflow",
    sourceUrl: "https://github.com/langflow-ai/langflow"
  },
  {
    term: "Interactive Playground (Langflow)",
    definition: "Langflow’s built-in step-through environment for testing and inspecting flow execution behavior.",
    related: ["Langflow", "debugging", "flow inspection"],
    sourceLabel: "langflow-ai/langflow",
    sourceUrl: "https://github.com/langflow-ai/langflow"
  },
  {
    term: "Agentic UX (Langflow context)",
    definition:
      "Interface patterns optimized for agent workflows, including multi-agent visibility, state tracking, and tool tracing.",
    related: ["Langflow", "observability", "multi-agent system"],
    sourceLabel: "langflow-ai/langflow",
    sourceUrl: "https://github.com/langflow-ai/langflow"
  },
  {
    term: "Workflow (Dify canvas)",
    definition:
      "Dify’s canvas-based workflow model, tightly connected to deployment, monitoring, and lifecycle management.",
    related: ["Dify", "workflow builder", "LLMOps"],
    sourceLabel: "langgenius/dify",
    sourceUrl: "https://github.com/langgenius/dify"
  },
  {
    term: "LLMOps (Dify term)",
    definition:
      "Dify’s operational layer for logging, monitoring, prompt iteration, and production AI system maintenance.",
    related: ["Dify", "observability", "prompt improvement"],
    sourceLabel: "langgenius/dify",
    sourceUrl: "https://github.com/langgenius/dify"
  },
  {
    term: "Backend-as-a-Service (Dify context)",
    definition: "Dify pattern of exposing app components via APIs so agent workflows integrate directly into business systems.",
    related: ["Dify", "API integration", "application platform"],
    sourceLabel: "langgenius/dify",
    sourceUrl: "https://github.com/langgenius/dify"
  },
  {
    term: "Suggested Questions Configuration (Dify)",
    definition:
      "Dify feature for post-answer question generation configured by environment variables such as SUGGESTED_QUESTIONS_PROMPT, SUGGESTED_QUESTIONS_MAX_TOKENS, and SUGGESTED_QUESTIONS_TEMPERATURE.",
    related: ["Dify", "runtime config", "prompt controls"],
    sourceLabel: "langgenius/dify",
    sourceUrl: "https://github.com/langgenius/dify"
  },
  {
    term: "Human-in-the-loop (Dify)",
    definition: "Workflow intervention point in Dify where manual decisions can approve, adjust, or unblock execution.",
    related: ["Dify", "gate state", "approval gate"],
    sourceLabel: "langgenius/dify",
    sourceUrl: "https://github.com/langgenius/dify"
  },
  {
    term: "Dify Open Source License",
    definition: "Dify’s Apache-2.0-based license model with additional project-specific conditions.",
    related: ["Dify", "compliance", "governance"],
    sourceLabel: "langgenius/dify",
    sourceUrl: "https://github.com/langgenius/dify"
  },
  {
    term: "Agent (Browser-Use implementation)",
    definition:
      "Browser-Use runtime agent class that binds an LLM to browser control for task-oriented web execution.",
    related: ["Browser-Use", "browser automation", "execution layer"],
    sourceLabel: "browser-use/browser-use",
    sourceUrl: "https://github.com/browser-use/browser-use"
  },
  {
    term: "ChatBrowserUse",
    definition: "Browser-Use specific LLM wrapper optimized for browser interaction tasks and web action planning.",
    related: ["Browser-Use", "LLM wrapper"],
    sourceLabel: "browser-use/browser-use",
    sourceUrl: "https://github.com/browser-use/browser-use"
  },
  {
    term: "Sandbox Decorator (Browser-Use)",
    definition: "Browser-Use cloud integration decorator used to run agent execution in managed sandbox environments.",
    related: ["Browser-Use", "execution sandbox", "cloud runtime"],
    sourceLabel: "browser-use/browser-use",
    sourceUrl: "https://github.com/browser-use/browser-use"
  },
  {
    term: "Browser-Use Cloud",
    definition:
      "Hosted Browser-Use runtime providing stealth browser sessions, persistence, auth handling, and managed execution.",
    related: ["Browser-Use", "cloud execution", "session persistence"],
    sourceLabel: "browser-use/browser-use",
    sourceUrl: "https://github.com/browser-use/browser-use"
  },
  {
    term: "Claude Code Skill (Browser-Use)",
    definition:
      "Browser-Use integration package installed in Claude Code skills for structured browser automation workflows.",
    related: ["Browser-Use", "skill integration", "developer tooling"],
    sourceLabel: "browser-use/browser-use",
    sourceUrl: "https://github.com/browser-use/browser-use"
  },
  {
    term: "State CLI (Browser-Use)",
    definition: "The `browser-use state` command that lists indexed, clickable DOM elements for agent interaction.",
    related: ["Browser-Use", "CLI", "DOM inspection"],
    sourceLabel: "browser-use/browser-use",
    sourceUrl: "https://github.com/browser-use/browser-use"
  },
  {
    term: "DeepDoc (RAGFlow)",
    definition: "RAGFlow subsystem for deep parsing and structured understanding of complex documents.",
    related: ["RAGFlow", "document parsing", "knowledge extraction"],
    sourceLabel: "infiniflow/ragflow",
    sourceUrl: "https://github.com/infiniflow/ragflow"
  },
  {
    term: "Template-based chunking (RAGFlow)",
    definition: "RAGFlow chunking strategy using structured templates instead of only naive token splits.",
    related: ["RAGFlow", "chunking", "retrieval quality"],
    sourceLabel: "infiniflow/ragflow",
    sourceUrl: "https://github.com/infiniflow/ragflow"
  },
  {
    term: "Converged context engine (RAGFlow)",
    definition:
      "RAGFlow architecture combining full-text search, vector retrieval, reranking, and agent-facing context assembly.",
    related: ["RAGFlow", "context engine", "retrieval fusion"],
    sourceLabel: "infiniflow/ragflow",
    sourceUrl: "https://github.com/infiniflow/ragflow"
  },
  {
    term: "Infinity engine option (RAGFlow)",
    definition: "RAGFlow backend option configured via DOC_ENGINE=infinity as an alternative to Elasticsearch.",
    related: ["RAGFlow", "storage backend", "configuration"],
    sourceLabel: "infiniflow/ragflow",
    sourceUrl: "https://github.com/infiniflow/ragflow"
  },
  {
    term: "Cross-language query (RAGFlow)",
    definition: "RAGFlow feature supporting multilingual retrieval and question answering across language boundaries.",
    related: ["RAGFlow", "multilingual retrieval"],
    sourceLabel: "infiniflow/ragflow",
    sourceUrl: "https://github.com/infiniflow/ragflow"
  },
  {
    term: "GraphRAG extraction (RAGFlow)",
    definition: "RAGFlow module for graph-oriented retrieval augmentation and knowledge-graph-style extraction workflows.",
    related: ["RAGFlow", "GraphRAG", "knowledge graph"],
    sourceLabel: "infiniflow/ragflow",
    sourceUrl: "https://github.com/infiniflow/ragflow"
  },
  {
    term: "Orchestrable ingestion pipeline (RAGFlow)",
    definition: "Composable ingestion workflow design in RAGFlow for automating staged document processing.",
    related: ["RAGFlow", "ingestion", "workflow orchestration"],
    sourceLabel: "infiniflow/ragflow",
    sourceUrl: "https://github.com/infiniflow/ragflow"
  },
  {
    term: "Tree of Thoughts (ToT)",
    definition: "Reasoning strategy that explores multiple branches before selecting the strongest solution path.",
    related: ["prompt strategy", "search", "reasoning"],
    sourceLabel: "dair-ai/Prompt-Engineering-Guide",
    sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
  },
  {
    term: "ReAct prompting",
    definition: "Prompting pattern that alternates internal reasoning with external action or tool execution steps.",
    related: ["ReAct loop", "tool call", "reasoning"],
    sourceLabel: "dair-ai/Prompt-Engineering-Guide",
    sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
  },
  {
    term: "Automatic Prompt Engineer",
    definition: "Technique where models generate and refine prompts to optimize downstream task performance.",
    related: ["prompt optimization", "meta prompting"],
    sourceLabel: "dair-ai/Prompt-Engineering-Guide",
    sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
  },
  {
    term: "Program-aided language models (PAL)",
    definition: "Approach where LLMs generate executable programs to improve reasoning and answer accuracy.",
    related: ["tool use", "code execution", "reasoning"],
    sourceLabel: "dair-ai/Prompt-Engineering-Guide",
    sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
  },
  {
    term: "Self-consistency",
    definition: "Sampling multiple reasoning paths and aggregating them to improve reliability of final answers.",
    related: ["reasoning ensemble", "prompt strategy"],
    sourceLabel: "dair-ai/Prompt-Engineering-Guide",
    sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
  },
  {
    term: "Multimodal CoT",
    definition: "Chain-of-thought style reasoning extended across modalities such as text and image inputs.",
    related: ["multimodal reasoning", "chain-of-thought"],
    sourceLabel: "dair-ai/Prompt-Engineering-Guide",
    sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
  },
  {
    term: "Graph prompting",
    definition: "Prompting with graph-structured context or constraints to improve relational reasoning tasks.",
    related: ["graph reasoning", "prompt structure"],
    sourceLabel: "dair-ai/Prompt-Engineering-Guide",
    sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
  },
  {
    term: "Context window",
    definition: "The bounded token budget the model can consider in one pass.",
    related: ["prompt", "memory"]
  }
];

export const releaseCopy = {
  heading: "Latest Tag",
  subheading: "Auto-loaded from GitHub Releases API, with tag fallback.",
  loading: "Loading releases...",
  empty: "No releases or tags found yet.",
  error: "Could not load releases right now.",
  noNotes: "No release notes yet."
};

export const glossaryPageCopy = {
  eyebrow: "Reference",
  title: "Glossary",
  subtitle: "Search terms, apply filters, and save entries to pin them to the top when you return.",
  searchLabel: "Search terms or definitions",
  searchPlaceholder: "Try: guardrail, planner, schema...",
  filterLabel: "Filter",
  filterAll: "All terms",
  filterSaved: "Saved only",
  filterRelated: "Has related tags",
  searchButton: "Search",
  clearButton: "Clear",
  saveButton: "Save",
  savedButton: "Saved",
  resultLabel: "results",
  backLabel: "Back to guide",
  empty: "No glossary terms match this search/filter."
};

export const comparisonPageCopy = {
  eyebrow: "Architecture Decisions",
  title: "Comparisons",
  subtitle:
    "Use this page for side-by-side choices. Keep the landing page focused on loop mechanics and multi-agent ecosystems.",
  backLabel: "Back to landing",
  glossaryLabel: "Open glossary",
  mcpDecisionTitle: "How to use this comparison",
  mcpDecisionPoints: [
    "If it executes actions, that is a tool.",
    "If it provides reference context, that is docs/knowledge.",
    "If it standardizes the connection between model and capability, that is MCP."
  ]
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
    title: "Different agent ecosystems",
    summary: "Agents are evolving quickly, and each ecosystem implements orchestration in a different way."
  },
  ecosystems: {
    title: "Multi-agent ecosystems at a glance",
    summary: "Survey the major ecosystems and quickly see what each loop optimizes for."
  },
  loop: {
    title: "Execution loop with shared state and feedback",
    summary: "Make each stage observable, measurable, and retry-safe."
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
