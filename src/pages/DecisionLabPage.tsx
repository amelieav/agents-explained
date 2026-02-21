import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./DecisionLabPage.css";

type PriorityKey =
  | "determinism"
  | "autonomy"
  | "durability"
  | "speed"
  | "costControl"
  | "compliance"
  | "contextComplexity";

interface LabInputs {
  determinism: number;
  autonomy: number;
  durability: number;
  speed: number;
  costControl: number;
  compliance: number;
  contextComplexity: number;
  sideEffects: boolean;
  humanApproval: boolean;
  longRunning: boolean;
}

interface ModelDefinition {
  id: string;
  label: string;
  summary: string;
  profile: Record<PriorityKey, number>;
  bonuses: {
    sideEffects?: number;
    humanApproval?: number;
    longRunning?: number;
  };
}

interface ModelComparisonNarrative {
  winnerEdges: string[];
  runnerEdges: string[];
  bonusEdges: string[];
}

interface SensitivityNote {
  id: string;
  message: string;
}

const PRIORITY_KEYS: PriorityKey[] = [
  "determinism",
  "autonomy",
  "durability",
  "speed",
  "costControl",
  "compliance",
  "contextComplexity"
];

const PRIORITY_LABELS: Record<PriorityKey, string> = {
  determinism: "Determinism",
  autonomy: "Autonomy",
  durability: "Durability",
  speed: "Speed",
  costControl: "Cost control",
  compliance: "Compliance",
  contextComplexity: "Context complexity"
};

const DEFAULT_INPUTS: LabInputs = {
  determinism: 3,
  autonomy: 3,
  durability: 3,
  speed: 3,
  costControl: 3,
  compliance: 3,
  contextComplexity: 3,
  sideEffects: false,
  humanApproval: false,
  longRunning: false
};

const PRESETS: Array<{ id: string; label: string; note: string; values: LabInputs }> = [
  {
    id: "prototype",
    label: "Fast Prototype",
    note: "Optimize for speed and autonomy with lighter controls.",
    values: {
      determinism: 2,
      autonomy: 5,
      durability: 2,
      speed: 5,
      costControl: 4,
      compliance: 2,
      contextComplexity: 3,
      sideEffects: false,
      humanApproval: false,
      longRunning: false
    }
  },
  {
    id: "regulated",
    label: "Regulated Ops",
    note: "Prioritize reliability, auditability, and approvals.",
    values: {
      determinism: 5,
      autonomy: 2,
      durability: 5,
      speed: 2,
      costControl: 3,
      compliance: 5,
      contextComplexity: 4,
      sideEffects: true,
      humanApproval: true,
      longRunning: true
    }
  },
  {
    id: "research",
    label: "Deep Research",
    note: "High context and long-running exploration over many steps.",
    values: {
      determinism: 3,
      autonomy: 4,
      durability: 4,
      speed: 3,
      costControl: 2,
      compliance: 3,
      contextComplexity: 5,
      sideEffects: false,
      humanApproval: false,
      longRunning: true
    }
  }
];

const FRAMEWORK_MODELS: ModelDefinition[] = [
  {
    id: "raw-sdk",
    label: "Raw SDK + custom orchestration",
    summary: "Maximum flexibility with explicit contracts and custom runtime behavior.",
    profile: {
      determinism: 5,
      autonomy: 3,
      durability: 4,
      speed: 2,
      costControl: 4,
      compliance: 5,
      contextComplexity: 4
    },
    bonuses: {
      sideEffects: 6,
      humanApproval: 6,
      longRunning: 4
    }
  },
  {
    id: "langchain",
    label: "LangChain",
    summary: "Fast iteration for chaining prompts, tools, and retrieval patterns.",
    profile: {
      determinism: 3,
      autonomy: 4,
      durability: 2,
      speed: 5,
      costControl: 3,
      compliance: 2,
      contextComplexity: 3
    },
    bonuses: {
      sideEffects: -2,
      humanApproval: -2,
      longRunning: -1
    }
  },
  {
    id: "langgraph",
    label: "LangGraph",
    summary: "State-machine style orchestration with stronger durability and control flow.",
    profile: {
      determinism: 5,
      autonomy: 3,
      durability: 5,
      speed: 3,
      costControl: 3,
      compliance: 4,
      contextComplexity: 5
    },
    bonuses: {
      sideEffects: 4,
      humanApproval: 4,
      longRunning: 8
    }
  }
];

const TOPOLOGY_MODELS: ModelDefinition[] = [
  {
    id: "single-agent",
    label: "Single-agent core",
    summary: "Lower coordination overhead and easier debugging for contained scopes.",
    profile: {
      determinism: 4,
      autonomy: 3,
      durability: 3,
      speed: 4,
      costControl: 5,
      compliance: 3,
      contextComplexity: 2
    },
    bonuses: {
      sideEffects: 2,
      humanApproval: 1,
      longRunning: -2
    }
  },
  {
    id: "multi-agent",
    label: "Multi-agent ecosystem",
    summary: "Higher specialization, parallelism, and richer role separation.",
    profile: {
      determinism: 3,
      autonomy: 5,
      durability: 4,
      speed: 3,
      costControl: 2,
      compliance: 4,
      contextComplexity: 5
    },
    bonuses: {
      sideEffects: -2,
      humanApproval: 3,
      longRunning: 6
    }
  }
];

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function topMatches(inputs: LabInputs, profile: Record<PriorityKey, number>): string {
  const sorted = PRIORITY_KEYS.map((key) => ({ key, diff: Math.abs(inputs[key] - profile[key]) })).sort((a, b) => a.diff - b.diff);
  const strongest = sorted.slice(0, 2).map((entry) => PRIORITY_LABELS[entry.key]);
  return `Strong fit on ${strongest.join(" + ")}.`;
}

function scoreModel(inputs: LabInputs, model: ModelDefinition): number {
  const baseMax = PRIORITY_KEYS.length * 20;
  let base = 0;

  PRIORITY_KEYS.forEach((key) => {
    const diff = Math.abs(inputs[key] - model.profile[key]);
    base += 20 - diff * 5;
  });

  let adjusted = (base / baseMax) * 100;

  if (inputs.sideEffects) {
    adjusted += model.bonuses.sideEffects ?? 0;
  }
  if (inputs.humanApproval) {
    adjusted += model.bonuses.humanApproval ?? 0;
  }
  if (inputs.longRunning) {
    adjusted += model.bonuses.longRunning ?? 0;
  }

  return clampScore(adjusted);
}

function rankedModels(inputs: LabInputs, models: ModelDefinition[]): Array<ModelDefinition & { score: number; reason: string }> {
  return models
    .map((model) => ({
      ...model,
      score: scoreModel(inputs, model),
      reason: topMatches(inputs, model.profile)
    }))
    .sort((a, b) => b.score - a.score);
}

function fitScore(input: number, target: number): number {
  return 20 - Math.abs(input - target) * 5;
}

function modelComparisonNarrative(
  inputs: LabInputs,
  winner: ModelDefinition,
  runner: ModelDefinition
): ModelComparisonNarrative {
  const deltas = PRIORITY_KEYS.map((key) => {
    const winnerFit = fitScore(inputs[key], winner.profile[key]);
    const runnerFit = fitScore(inputs[key], runner.profile[key]);

    return {
      key,
      delta: winnerFit - runnerFit
    };
  });

  const winnerEdges = deltas
    .filter((entry) => entry.delta > 0)
    .sort((a, b) => b.delta - a.delta)
    .slice(0, 2)
    .map((entry) => PRIORITY_LABELS[entry.key]);

  const runnerEdges = deltas
    .filter((entry) => entry.delta < 0)
    .sort((a, b) => a.delta - b.delta)
    .slice(0, 2)
    .map((entry) => PRIORITY_LABELS[entry.key]);

  const bonusEdges: string[] = [];
  if (inputs.sideEffects) {
    const delta = (winner.bonuses.sideEffects ?? 0) - (runner.bonuses.sideEffects ?? 0);
    if (delta > 0) {
      bonusEdges.push("external side-effect safety");
    }
  }
  if (inputs.humanApproval) {
    const delta = (winner.bonuses.humanApproval ?? 0) - (runner.bonuses.humanApproval ?? 0);
    if (delta > 0) {
      bonusEdges.push("approval-gate alignment");
    }
  }
  if (inputs.longRunning) {
    const delta = (winner.bonuses.longRunning ?? 0) - (runner.bonuses.longRunning ?? 0);
    if (delta > 0) {
      bonusEdges.push("long-running durability");
    }
  }

  return {
    winnerEdges,
    runnerEdges,
    bonusEdges
  };
}

function parseSearchInputs(search: string): LabInputs | null {
  const params = new URLSearchParams(search);
  if (!params.size) {
    return null;
  }

  function parsePriority(key: string): number | null {
    const raw = params.get(key);
    if (!raw) {
      return null;
    }

    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) {
      return null;
    }

    return Math.max(1, Math.min(5, Math.round(parsed)));
  }

  const parsed = {
    determinism: parsePriority("det"),
    autonomy: parsePriority("aut"),
    durability: parsePriority("dur"),
    speed: parsePriority("spd"),
    costControl: parsePriority("cost"),
    compliance: parsePriority("cmp"),
    contextComplexity: parsePriority("ctx")
  };

  const hasAllPriorities = Object.values(parsed).every((value) => value !== null);
  if (!hasAllPriorities) {
    return null;
  }

  return {
    determinism: parsed.determinism!,
    autonomy: parsed.autonomy!,
    durability: parsed.durability!,
    speed: parsed.speed!,
    costControl: parsed.costControl!,
    compliance: parsed.compliance!,
    contextComplexity: parsed.contextComplexity!,
    sideEffects: params.get("se") === "1",
    humanApproval: params.get("ha") === "1",
    longRunning: params.get("lr") === "1"
  };
}

function buildShareQuery(inputs: LabInputs): string {
  const params = new URLSearchParams();
  params.set("det", String(inputs.determinism));
  params.set("aut", String(inputs.autonomy));
  params.set("dur", String(inputs.durability));
  params.set("spd", String(inputs.speed));
  params.set("cost", String(inputs.costControl));
  params.set("cmp", String(inputs.compliance));
  params.set("ctx", String(inputs.contextComplexity));
  params.set("se", inputs.sideEffects ? "1" : "0");
  params.set("ha", inputs.humanApproval ? "1" : "0");
  params.set("lr", inputs.longRunning ? "1" : "0");
  return params.toString();
}

function confidenceLabel(score: number): string {
  if (score >= 80) {
    return "High";
  }
  if (score >= 60) {
    return "Medium";
  }
  return "Low";
}

export function DecisionLabPage(): JSX.Element {
  const [inputs, setInputs] = useState<LabInputs>(DEFAULT_INPUTS);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const [linkStatus, setLinkStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    const parsed = parseSearchInputs(window.location.search);
    if (parsed) {
      setInputs(parsed);
    }
  }, []);

  useEffect(() => {
    const query = buildShareQuery(inputs);
    const nextUrl = `${window.location.pathname}?${query}`;
    window.history.replaceState(null, "", nextUrl);
  }, [inputs]);

  const frameworks = useMemo(() => rankedModels(inputs, FRAMEWORK_MODELS), [inputs]);
  const topologies = useMemo(() => rankedModels(inputs, TOPOLOGY_MODELS), [inputs]);
  const frameworkRunnerUp = frameworks[1] ?? null;
  const topologyRunnerUp = topologies[1] ?? null;
  const frameworkGap = frameworks[0].score - (frameworks[1]?.score ?? frameworks[0].score);
  const topologyGap = topologies[0].score - (topologies[1]?.score ?? topologies[0].score);
  const confidence = Math.max(0, Math.min(100, 50 + frameworkGap * 5 + topologyGap * 5));

  const tensions = useMemo(() => {
    const warnings: string[] = [];

    if (inputs.autonomy >= 4 && inputs.compliance >= 4) {
      warnings.push("High autonomy with strict compliance needs tighter approval and audit controls.");
    }
    if (inputs.speed >= 4 && inputs.determinism >= 4) {
      warnings.push("Speed and determinism are both high priorities, so expect additional engineering overhead.");
    }
    if (inputs.costControl >= 4 && inputs.contextComplexity >= 4) {
      warnings.push("Complex context under tight budget needs aggressive retrieval filtering and token caps.");
    }
    if (inputs.longRunning && inputs.durability <= 3) {
      warnings.push("Long-running execution without high durability can cause restart/replay failures.");
    }
    if (inputs.sideEffects && !inputs.humanApproval && inputs.autonomy >= 4) {
      warnings.push("Autonomous side effects without approval gates increase operational risk.");
    }

    return warnings;
  }, [inputs]);

  const guardrails = useMemo(() => {
    const recommendations: string[] = [];

    if (inputs.sideEffects) {
      recommendations.push("Add allowlisted tool policies and idempotency checks before action calls.");
    }
    if (inputs.humanApproval || inputs.compliance >= 4) {
      recommendations.push("Insert explicit approval gates for high-impact actions and production writes.");
    }
    if (inputs.longRunning || inputs.durability >= 4) {
      recommendations.push("Persist checkpoints and use resumable execution boundaries.");
    }
    if (inputs.contextComplexity >= 4) {
      recommendations.push("Use retrieval with citations and enforce schema validation on intermediate outputs.");
    }
    if (inputs.autonomy >= 4 && inputs.determinism <= 3) {
      recommendations.push("Pair high-autonomy steps with evaluator/critic passes before final output.");
    }

    if (recommendations.length === 0) {
      recommendations.push("Current profile is balanced; start simple and add controls only where failures appear.");
    }

    return recommendations;
  }, [inputs]);

  const frameworkNarrative = useMemo(() => {
    if (!frameworkRunnerUp) {
      return null;
    }

    return modelComparisonNarrative(inputs, frameworks[0], frameworkRunnerUp);
  }, [frameworkRunnerUp, frameworks, inputs]);

  const topologyNarrative = useMemo(() => {
    if (!topologyRunnerUp) {
      return null;
    }

    return modelComparisonNarrative(inputs, topologies[0], topologyRunnerUp);
  }, [inputs, topologies, topologyRunnerUp]);

  const sensitivityNotes = useMemo(() => {
    const notes: SensitivityNote[] = [];

    PRIORITY_KEYS.forEach((key) => {
      ([-1, 1] as const).forEach((delta) => {
        const nextValue = Math.max(1, Math.min(5, inputs[key] + delta));
        if (nextValue === inputs[key]) {
          return;
        }

        const candidateInputs: LabInputs = { ...inputs, [key]: nextValue };
        const nextFramework = rankedModels(candidateInputs, FRAMEWORK_MODELS)[0];
        const nextTopology = rankedModels(candidateInputs, TOPOLOGY_MODELS)[0];
        const parts: string[] = [];

        if (nextFramework.id !== frameworks[0].id) {
          parts.push(`framework -> ${nextFramework.label}`);
        }
        if (nextTopology.id !== topologies[0].id) {
          parts.push(`topology -> ${nextTopology.label}`);
        }

        if (parts.length > 0) {
          notes.push({
            id: `${key}-${delta}`,
            message: `${delta > 0 ? "Increase" : "Decrease"} ${PRIORITY_LABELS[key]} by 1: ${parts.join(", ")}`
          });
        }
      });
    });

    return notes.slice(0, 6);
  }, [frameworks, inputs, topologies]);

  const architectureSummary = useMemo(
    () =>
      `${frameworks[0].label} + ${topologies[0].label} with ${guardrails.length} recommended guardrail${guardrails.length === 1 ? "" : "s"}.`,
    [frameworks, guardrails.length, topologies]
  );

  const snapshot = useMemo(
    () => ({
      inputs,
      recommendation: {
        framework: { id: frameworks[0].id, label: frameworks[0].label, score: frameworks[0].score },
        topology: { id: topologies[0].id, label: topologies[0].label, score: topologies[0].score },
        guardrails
      }
    }),
    [frameworks, guardrails, inputs, topologies]
  );

  const snapshotJson = useMemo(() => JSON.stringify(snapshot, null, 2), [snapshot]);

  function updatePriority(key: PriorityKey, value: number): void {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  function updateFlag(key: "sideEffects" | "humanApproval" | "longRunning", value: boolean): void {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  function applyPreset(values: LabInputs): void {
    setInputs(values);
    setCopyStatus("idle");
  }

  function resetInputs(): void {
    setInputs(DEFAULT_INPUTS);
    setCopyStatus("idle");
    setLinkStatus("idle");
  }

  async function copySnapshot(): Promise<void> {
    try {
      await navigator.clipboard.writeText(snapshotJson);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  async function copyShareLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkStatus("copied");
    } catch {
      setLinkStatus("error");
    }
  }

  return (
    <main className="decision-lab-page">
      <div className="decision-lab-page__container">
        <header className="decision-lab-page__header">
          <p>Advanced Feature</p>
          <h1>Architecture Decision Lab</h1>
          <p>
            Tune project constraints and get a live recommendation for framework choice, topology, and guardrails. This is a
            heuristic assistant to speed up architecture discussions.
          </p>
          <div className="decision-lab-page__links">
            <Link to="/">Back to landing</Link>
            <Link to="/comparisons">Open comparisons</Link>
            <Link to="/glossary">Open glossary</Link>
          </div>
        </header>

        <section className="decision-lab-page__layout" aria-label="Decision lab">
          <article className="decision-lab-page__panel">
            <h2>Constraint Inputs</h2>
            <p>Set each priority from 1 (low) to 5 (high).</p>

            <div className="decision-lab-page__sliders">
              {PRIORITY_KEYS.map((key) => (
                <label key={key} className="decision-lab-page__slider-row">
                  <span>{PRIORITY_LABELS[key]}</span>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={inputs[key]}
                    onChange={(event) => updatePriority(key, Number(event.target.value))}
                  />
                  <strong>{inputs[key]}</strong>
                </label>
              ))}
            </div>

            <div className="decision-lab-page__flags">
              <label>
                <input
                  type="checkbox"
                  checked={inputs.sideEffects}
                  onChange={(event) => updateFlag("sideEffects", event.target.checked)}
                />
                Includes external side effects (writes, payments, deploys)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={inputs.humanApproval}
                  onChange={(event) => updateFlag("humanApproval", event.target.checked)}
                />
                Requires human approval gates
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={inputs.longRunning}
                  onChange={(event) => updateFlag("longRunning", event.target.checked)}
                />
                Long-running execution (minutes/hours)
              </label>
            </div>

            <div className="decision-lab-page__presets">
              {PRESETS.map((preset) => (
                <button key={preset.id} type="button" onClick={() => applyPreset(preset.values)} title={preset.note}>
                  {preset.label}
                </button>
              ))}
              <button type="button" onClick={resetInputs}>
                Reset
              </button>
              <button type="button" onClick={copyShareLink}>
                {linkStatus === "copied" ? "Link copied" : "Copy share link"}
              </button>
            </div>
            {linkStatus === "error" ? <p className="decision-lab-page__error">Share link copy is unavailable here.</p> : null}
          </article>

          <article className="decision-lab-page__panel">
            <h2>Recommendation</h2>

            <article className="decision-lab-page__decision-card">
              <h3>Recommended Architecture</h3>
              <p className="decision-lab-page__recommend-title">{architectureSummary}</p>
              <p className="decision-lab-page__muted">
                Confidence: {confidenceLabel(confidence)} ({confidence}/100)
              </p>
            </article>

            <div className="decision-lab-page__recommend-grid">
              <article className="decision-lab-page__recommend-card">
                <h3>Framework</h3>
                <p className="decision-lab-page__recommend-title">{frameworks[0].label}</p>
                <p>{frameworks[0].summary}</p>
                <p className="decision-lab-page__muted">{frameworks[0].reason}</p>
              </article>

              <article className="decision-lab-page__recommend-card">
                <h3>Topology</h3>
                <p className="decision-lab-page__recommend-title">{topologies[0].label}</p>
                <p>{topologies[0].summary}</p>
                <p className="decision-lab-page__muted">{topologies[0].reason}</p>
              </article>
            </div>

            {tensions.length > 0 ? (
              <article className="decision-lab-page__tension-card">
                <h3>Tradeoff Alerts</h3>
                <ul>
                  {tensions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ) : null}

            <div className="decision-lab-page__analysis-grid">
              <article className="decision-lab-page__analysis-card">
                <h3>Why Not The Runner-up (Framework)</h3>
                {frameworkRunnerUp && frameworkNarrative ? (
                  <>
                    <p className="decision-lab-page__analysis-title">
                      {frameworkRunnerUp.label} trails by {frameworkGap} points.
                    </p>
                    <p>
                      <strong>Winner strengths:</strong>{" "}
                      {frameworkNarrative.winnerEdges.length > 0 ? frameworkNarrative.winnerEdges.join(", ") : "mixed factors"}
                    </p>
                    <p>
                      <strong>Runner-up strengths:</strong>{" "}
                      {frameworkNarrative.runnerEdges.length > 0 ? frameworkNarrative.runnerEdges.join(", ") : "no standout edges"}
                    </p>
                    {frameworkNarrative.bonusEdges.length > 0 ? (
                      <p>
                        <strong>Bonus alignment:</strong> {frameworkNarrative.bonusEdges.join(", ")}
                      </p>
                    ) : null}
                  </>
                ) : (
                  <p>No runner-up data available.</p>
                )}
              </article>

              <article className="decision-lab-page__analysis-card">
                <h3>Why Not The Runner-up (Topology)</h3>
                {topologyRunnerUp && topologyNarrative ? (
                  <>
                    <p className="decision-lab-page__analysis-title">
                      {topologyRunnerUp.label} trails by {topologyGap} points.
                    </p>
                    <p>
                      <strong>Winner strengths:</strong>{" "}
                      {topologyNarrative.winnerEdges.length > 0 ? topologyNarrative.winnerEdges.join(", ") : "mixed factors"}
                    </p>
                    <p>
                      <strong>Runner-up strengths:</strong>{" "}
                      {topologyNarrative.runnerEdges.length > 0 ? topologyNarrative.runnerEdges.join(", ") : "no standout edges"}
                    </p>
                    {topologyNarrative.bonusEdges.length > 0 ? (
                      <p>
                        <strong>Bonus alignment:</strong> {topologyNarrative.bonusEdges.join(", ")}
                      </p>
                    ) : null}
                  </>
                ) : (
                  <p>No runner-up data available.</p>
                )}
              </article>
            </div>

            <article className="decision-lab-page__guardrail-card">
              <h3>Suggested Guardrails</h3>
              <ul>
                {guardrails.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="decision-lab-page__analysis-card">
              <h3>Sensitivity Analysis</h3>
              {sensitivityNotes.length > 0 ? (
                <ul>
                  {sensitivityNotes.map((note) => (
                    <li key={note.id}>{note.message}</li>
                  ))}
                </ul>
              ) : (
                <p>Current recommendation is stable against single-step slider changes.</p>
              )}
            </article>

            <div className="decision-lab-page__ranking-grid">
              <article>
                <h3>Framework Scoreboard</h3>
                {frameworks.map((item) => (
                  <div className="decision-lab-page__score-row" key={item.id}>
                    <div>
                      <p>{item.label}</p>
                      <small>{item.score}/100</small>
                    </div>
                    <div className="decision-lab-page__score-bar" aria-hidden="true">
                      <span style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                ))}
              </article>

              <article>
                <h3>Topology Scoreboard</h3>
                {topologies.map((item) => (
                  <div className="decision-lab-page__score-row" key={item.id}>
                    <div>
                      <p>{item.label}</p>
                      <small>{item.score}/100</small>
                    </div>
                    <div className="decision-lab-page__score-bar" aria-hidden="true">
                      <span style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                ))}
              </article>
            </div>

            <details className="decision-lab-page__snapshot">
              <summary>Recommendation JSON Snapshot</summary>
              <pre>{snapshotJson}</pre>
              <button type="button" onClick={copySnapshot}>
                {copyStatus === "copied" ? "Copied" : "Copy JSON"}
              </button>
              {copyStatus === "error" ? <p>Clipboard unavailable in this environment.</p> : null}
            </details>
          </article>
        </section>
      </div>
    </main>
  );
}
