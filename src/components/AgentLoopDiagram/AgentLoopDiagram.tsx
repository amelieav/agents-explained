import { useId } from "react";
import { classNames } from "../../utils/classNames";
import { agentLoopVariantClass } from "./variants";
import { AgentLoopDiagramProps } from "./types";
import { AgentLoopDiagramLayout } from "./types";
import "./AgentLoopDiagram.css";

interface DiagramNode {
  id: string;
  cx: number;
  cy: number;
  w: number;
  h: number;
  labelLines: string[];
  detailLines: string[];
}

function wrapLines(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
      return;
    }

    if (current) {
      lines.push(current);
    }

    current = word;
  });

  if (current) {
    lines.push(current);
  }

  return lines;
}

function makeNode(
  step: AgentLoopDiagramProps["steps"][number],
  cx: number,
  cy: number,
  options?: { w?: number; h?: number; labelChars?: number; detailChars?: number; detailLines?: number }
): DiagramNode {
  const w = options?.w ?? 220;
  const h = options?.h ?? 92;
  const labelChars = options?.labelChars ?? 22;
  const detailChars = options?.detailChars ?? 34;
  const detailLines = options?.detailLines ?? 1;

  return {
    id: step.id,
    cx,
    cy,
    w,
    h,
    labelLines: wrapLines(step.label, labelChars).slice(0, 2),
    detailLines: wrapLines(step.detail, detailChars).slice(0, detailLines)
  };
}

function edgePoints(from: DiagramNode, to: DiagramNode, padding = 56): { x1: number; y1: number; x2: number; y2: number } {
  const dx = to.cx - from.cx;
  const dy = to.cy - from.cy;
  const length = Math.hypot(dx, dy) || 1;
  const nx = dx / length;
  const ny = dy / length;

  return {
    x1: from.cx + nx * padding,
    y1: from.cy + ny * padding,
    x2: to.cx - nx * padding,
    y2: to.cy - ny * padding
  };
}

function nodeGraphic(node: DiagramNode): JSX.Element {
  return (
    <g key={node.id}>
      <rect x={node.cx - node.w / 2} y={node.cy - node.h / 2} width={node.w} height={node.h} rx={18} className="agent-loop__node" />
      <text x={node.cx} y={node.cy - 18} className="agent-loop__label">
        {node.labelLines.map((line, index) => (
          <tspan key={`${node.id}-label-${index}`} x={node.cx} dy={index === 0 ? 0 : 16}>
            {line}
          </tspan>
        ))}
      </text>
      <text x={node.cx} y={node.cy + 16} className="agent-loop__detail">
        {node.detailLines.map((line, index) => (
          <tspan key={`${node.id}-detail-${index}`} x={node.cx} dy={index === 0 ? 0 : 14}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function markerDefs(markerId: string): JSX.Element {
  return (
    <defs>
      <marker id={markerId} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
        <path d="M 0 0 L 9 4.5 L 0 9 z" className="agent-loop__arrowhead" />
      </marker>
    </defs>
  );
}

function renderConversationWeb(steps: AgentLoopDiagramProps["steps"], markerId: string): JSX.Element {
  const diagramWidth = 980;
  const diagramHeight = 700;

  if (steps.length < 7) {
    return renderOrchestratorLadder(steps, markerId);
  }

  const nodes = [
    makeNode(steps[0], 490, 96),
    makeNode(steps[1], 490, 228),
    makeNode(steps[2], 250, 366),
    makeNode(steps[3], 490, 326),
    makeNode(steps[4], 730, 366),
    makeNode(steps[5], 490, 510),
    makeNode(steps[6], 490, 626)
  ];

  const e01 = edgePoints(nodes[0], nodes[1]);
  const e12 = edgePoints(nodes[1], nodes[2]);
  const e13 = edgePoints(nodes[1], nodes[3]);
  const e14 = edgePoints(nodes[1], nodes[4]);
  const e25 = edgePoints(nodes[2], nodes[5]);
  const e35 = edgePoints(nodes[3], nodes[5]);
  const e45 = edgePoints(nodes[4], nodes[5]);
  const e56 = edgePoints(nodes[5], nodes[6]);

  return (
    <svg viewBox={`0 0 ${diagramWidth} ${diagramHeight}`} role="img" aria-label="Conversation-web ecosystem diagram">
      {markerDefs(markerId)}

      <line x1={e01.x1} y1={e01.y1} x2={e01.x2} y2={e01.y2} className="agent-loop__edge" markerEnd={`url(#${markerId})`} />
      <line x1={e12.x1} y1={e12.y1} x2={e12.x2} y2={e12.y2} className="agent-loop__edge" markerEnd={`url(#${markerId})`} />
      <line x1={e13.x1} y1={e13.y1} x2={e13.x2} y2={e13.y2} className="agent-loop__edge" markerEnd={`url(#${markerId})`} />
      <line x1={e14.x1} y1={e14.y1} x2={e14.x2} y2={e14.y2} className="agent-loop__edge" markerEnd={`url(#${markerId})`} />
      <line x1={e25.x1} y1={e25.y1} x2={e25.x2} y2={e25.y2} className="agent-loop__edge" markerEnd={`url(#${markerId})`} />
      <line x1={e35.x1} y1={e35.y1} x2={e35.x2} y2={e35.y2} className="agent-loop__edge" markerEnd={`url(#${markerId})`} />
      <line x1={e45.x1} y1={e45.y1} x2={e45.x2} y2={e45.y2} className="agent-loop__edge" markerEnd={`url(#${markerId})`} />
      <line x1={e56.x1} y1={e56.y1} x2={e56.x2} y2={e56.y2} className="agent-loop__edge" markerEnd={`url(#${markerId})`} />

      <line x1="250" y1="366" x2="490" y2="326" className="agent-loop__sync" />
      <line x1="490" y1="326" x2="730" y2="366" className="agent-loop__sync" />
      <line x1="250" y1="366" x2="730" y2="366" className="agent-loop__sync" />

      <path
        d="M 460 470 C 250 250, 730 250, 518 278"
        className="agent-loop__feedback"
        markerEnd={`url(#${markerId})`}
      />
      <text className="agent-loop__edge-label" x="490" y="252">
        Iterative agent chat
      </text>

      {nodes.map((node) => nodeGraphic(node))}
    </svg>
  );
}

function renderOrchestratorLadder(steps: AgentLoopDiagramProps["steps"], markerId: string): JSX.Element {
  const diagramWidth = 980;
  const diagramHeight = 700;
  const startY = 90;
  const gapY = 88;

  const nodes = steps.map((step, index) => makeNode(step, index % 2 === 0 ? 410 : 570, startY + index * gapY, { w: 320, h: 82 }));

  return (
    <svg viewBox={`0 0 ${diagramWidth} ${diagramHeight}`} role="img" aria-label="Orchestrator-ladder ecosystem diagram">
      {markerDefs(markerId)}
      <rect x="278" y="38" width="424" height="620" rx="30" className="agent-loop__lane" />

      {nodes.map((node, index) => {
        if (index === nodes.length - 1) {
          return null;
        }

        const next = nodes[index + 1];
        const edge = edgePoints(node, next, 52);

        return (
          <line
            key={`${node.id}-to-${next.id}`}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            className="agent-loop__edge"
            markerEnd={`url(#${markerId})`}
          />
        );
      })}

      {nodes.map((node) => nodeGraphic(node))}
    </svg>
  );
}

function renderCoordinatorFanout(steps: AgentLoopDiagramProps["steps"], markerId: string): JSX.Element {
  const diagramWidth = 980;
  const diagramHeight = 700;

  if (steps.length < 7) {
    return renderOrchestratorLadder(steps, markerId);
  }

  const nodes = [
    makeNode(steps[0], 490, 96, { w: 280 }),
    makeNode(steps[1], 490, 210),
    makeNode(steps[2], 250, 336),
    makeNode(steps[3], 490, 336),
    makeNode(steps[4], 730, 336),
    makeNode(steps[5], 490, 484),
    makeNode(steps[6], 490, 612, { w: 280 })
  ];

  const edges = [
    edgePoints(nodes[0], nodes[1]),
    edgePoints(nodes[1], nodes[2]),
    edgePoints(nodes[1], nodes[3]),
    edgePoints(nodes[1], nodes[4]),
    edgePoints(nodes[2], nodes[5]),
    edgePoints(nodes[3], nodes[5]),
    edgePoints(nodes[4], nodes[5]),
    edgePoints(nodes[5], nodes[6])
  ];

  return (
    <svg viewBox={`0 0 ${diagramWidth} ${diagramHeight}`} role="img" aria-label="Coordinator fan-out ecosystem diagram">
      {markerDefs(markerId)}

      {edges.map((edge, index) => (
        <line
          key={`edge-${index}`}
          x1={edge.x1}
          y1={edge.y1}
          x2={edge.x2}
          y2={edge.y2}
          className="agent-loop__edge"
          markerEnd={`url(#${markerId})`}
        />
      ))}

      <line x1="250" y1="336" x2="490" y2="336" className="agent-loop__sync" />
      <line x1="490" y1="336" x2="730" y2="336" className="agent-loop__sync" />
      <text className="agent-loop__edge-label" x="490" y="305">
        A2A exchange
      </text>

      <path d="M 452 448 C 320 300, 660 300, 528 248" className="agent-loop__feedback" markerEnd={`url(#${markerId})`} />

      {nodes.map((node) => nodeGraphic(node))}
    </svg>
  );
}

function renderControllerStack(steps: AgentLoopDiagramProps["steps"], markerId: string): JSX.Element {
  const diagramWidth = 980;
  const diagramHeight = 700;

  if (steps.length < 7) {
    return renderOrchestratorLadder(steps, markerId);
  }

  const nodes = [
    makeNode(steps[0], 200, 120),
    makeNode(steps[1], 200, 250),
    makeNode(steps[2], 200, 380),
    makeNode(steps[3], 490, 210),
    makeNode(steps[4], 490, 350),
    makeNode(steps[5], 780, 250),
    makeNode(steps[6], 780, 430)
  ];

  const connectors = [
    edgePoints(nodes[0], nodes[1]),
    edgePoints(nodes[1], nodes[2]),
    edgePoints(nodes[2], nodes[3]),
    edgePoints(nodes[3], nodes[4]),
    edgePoints(nodes[4], nodes[5]),
    edgePoints(nodes[5], nodes[6])
  ];

  const sync = edgePoints(nodes[1], nodes[4], 52);

  return (
    <svg viewBox={`0 0 ${diagramWidth} ${diagramHeight}`} role="img" aria-label="Controller-stack ecosystem diagram">
      {markerDefs(markerId)}

      <rect x="74" y="62" width="252" height="372" rx="28" className="agent-loop__lane" />
      <rect x="364" y="132" width="252" height="292" rx="28" className="agent-loop__lane" />
      <rect x="654" y="172" width="252" height="332" rx="28" className="agent-loop__lane" />

      {connectors.map((edge, index) => (
        <line
          key={`stack-${index}`}
          x1={edge.x1}
          y1={edge.y1}
          x2={edge.x2}
          y2={edge.y2}
          className="agent-loop__edge"
          markerEnd={`url(#${markerId})`}
        />
      ))}

      <line x1={sync.x1} y1={sync.y1} x2={sync.x2} y2={sync.y2} className="agent-loop__sync" />
      <text className="agent-loop__edge-label" x="344" y="286">
        Controller feedback
      </text>

      {nodes.map((node) => nodeGraphic(node))}
    </svg>
  );
}

function renderFeedbackLoop(steps: AgentLoopDiagramProps["steps"], markerId: string): JSX.Element {
  const diagramWidth = 980;
  const diagramHeight = 700;
  const hubX = 490;
  const hubY = 350;
  const radius = steps.length >= 7 ? 282 : steps.length === 6 ? 262 : 238;
  const edgeLabels = ["Intake", "Route", "Execute", "Check", "Refine", "Merge", "Publish"];

  const nodes = steps.map((step, index) => {
    const angle = (-90 + (index * 360) / steps.length) * (Math.PI / 180);
    return makeNode(step, hubX + radius * Math.cos(angle), hubY + radius * Math.sin(angle), {
      w: 214,
      h: 104,
      labelChars: 20,
      detailChars: 28,
      detailLines: 2
    });
  });

  const retryFrom = nodes[Math.min(nodes.length - 1, Math.max(0, Math.floor((nodes.length * 2) / 3)))];
  const retryTo = nodes[Math.max(0, Math.floor(nodes.length / 3))];
  const closeLoopFrom = nodes[nodes.length - 1];
  const closeLoopTo = nodes[0];

  return (
    <svg viewBox={`0 0 ${diagramWidth} ${diagramHeight}`} role="img" aria-label="Feedback-loop ecosystem diagram">
      {markerDefs(markerId)}

      {nodes.map((node) => (
        <line key={`${node.id}-sync`} x1={node.cx} y1={node.cy} x2={hubX} y2={hubY} className="agent-loop__sync" />
      ))}

      {nodes.map((node, index) => {
        const next = nodes[(index + 1) % nodes.length];
        const edge = edgePoints(node, next, 78);

        return (
          <g key={`${node.id}-edge`}>
            <line
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              className="agent-loop__edge"
              markerEnd={`url(#${markerId})`}
            />
            <text className="agent-loop__edge-label" x={(edge.x1 + edge.x2) / 2} y={(edge.y1 + edge.y2) / 2 - 10}>
              {edgeLabels[index % edgeLabels.length]}
            </text>
          </g>
        );
      })}

      {steps.length > 3 && retryFrom && retryTo ? (
        <>
          <path
            d={`M ${retryFrom.cx - 24} ${retryFrom.cy - 32} C ${hubX + 26} ${hubY - 210}, ${hubX - 32} ${hubY - 216}, ${retryTo.cx + 22} ${retryTo.cy + 38}`}
            className="agent-loop__feedback"
            markerEnd={`url(#${markerId})`}
          />
          <text className="agent-loop__edge-label" x={hubX - 16} y={hubY - 216}>
            Feedback retry
          </text>
        </>
      ) : null}

      {steps.length > 2 && closeLoopFrom && closeLoopTo ? (
        <>
          <path
            d={`M ${closeLoopFrom.cx + 42} ${closeLoopFrom.cy - 10} C ${hubX - 10} ${hubY + 48}, ${hubX - 156} ${hubY - 24}, ${closeLoopTo.cx - 26} ${closeLoopTo.cy + 36}`}
            className="agent-loop__feedback"
            markerEnd={`url(#${markerId})`}
          />
          <text className="agent-loop__edge-label" x={hubX - 214} y={hubY - 8}>
            Updated context
          </text>
        </>
      ) : null}

      <circle cx={hubX} cy={hubY} r="84" className="agent-loop__hub" />
      <text x={hubX} y={hubY - 8} className="agent-loop__hub-label">
        Shared State
      </text>
      <text x={hubX} y={hubY + 18} className="agent-loop__hub-meta">
        Memory • Tool logs • Budget
      </text>

      {nodes.map((node) => nodeGraphic(node))}
    </svg>
  );
}

function renderAutobuildPipeline(steps: AgentLoopDiagramProps["steps"], markerId: string): JSX.Element {
  const diagramWidth = 980;
  const diagramHeight = 700;

  if (steps.length < 7) {
    return renderOrchestratorLadder(steps, markerId);
  }

  const nodes = [
    makeNode(steps[0], 170, 172, { w: 196 }),
    makeNode(steps[1], 390, 172, { w: 196 }),
    makeNode(steps[2], 610, 172, { w: 196 }),
    makeNode(steps[3], 830, 172, { w: 196 }),
    makeNode(steps[4], 830, 394, { w: 196 }),
    makeNode(steps[5], 610, 394, { w: 196 }),
    makeNode(steps[6], 390, 394, { w: 196 })
  ];

  const edges = [
    edgePoints(nodes[0], nodes[1], 56),
    edgePoints(nodes[1], nodes[2], 56),
    edgePoints(nodes[2], nodes[3], 56),
    edgePoints(nodes[3], nodes[4], 56),
    edgePoints(nodes[4], nodes[5], 56),
    edgePoints(nodes[5], nodes[6], 56)
  ];

  return (
    <svg viewBox={`0 0 ${diagramWidth} ${diagramHeight}`} role="img" aria-label="AutoBuild pipeline ecosystem diagram">
      {markerDefs(markerId)}

      {edges.map((edge, index) => (
        <line
          key={`pipeline-${index}`}
          x1={edge.x1}
          y1={edge.y1}
          x2={edge.x2}
          y2={edge.y2}
          className="agent-loop__edge"
          markerEnd={`url(#${markerId})`}
        />
      ))}

      <path d="M 560 350 C 520 260, 540 250, 596 222" className="agent-loop__feedback" markerEnd={`url(#${markerId})`} />
      <text className="agent-loop__edge-label" x="502" y="292">
        Auto-refine loop
      </text>

      {nodes.map((node) => nodeGraphic(node))}
    </svg>
  );
}

export function AgentLoopDiagram({ steps, layout = "feedback-loop", variant = "default", className }: AgentLoopDiagramProps): JSX.Element {
  const markerId = `agent-loop-arrow-${useId().replace(/:/g, "-")}`;

  const captionByLayout: Record<AgentLoopDiagramLayout, string> = {
    "conversation-web": "Role-specialized agents collaborate through dense message exchange before aggregation.",
    "orchestrator-ladder": "An orchestrator-driven ladder pattern prioritizes controlled stage progression.",
    "coordinator-fanout": "A coordinator decomposes work, routes to specialists, then merges outputs.",
    "controller-stack": "Workflow controllers layer execution policies before final composition.",
    "feedback-loop": "Continuous feedback cycles around shared state until quality criteria are met.",
    "autobuild-pipeline": "AutoBuild emphasizes generated setup followed by iterative execution and completion gates."
  };

  let diagram: JSX.Element;

  switch (layout) {
    case "conversation-web":
      diagram = renderConversationWeb(steps, markerId);
      break;
    case "orchestrator-ladder":
      diagram = renderOrchestratorLadder(steps, markerId);
      break;
    case "coordinator-fanout":
      diagram = renderCoordinatorFanout(steps, markerId);
      break;
    case "controller-stack":
      diagram = renderControllerStack(steps, markerId);
      break;
    case "autobuild-pipeline":
      diagram = renderAutobuildPipeline(steps, markerId);
      break;
    case "feedback-loop":
    default:
      diagram = renderFeedbackLoop(steps, markerId);
      break;
  }

  return (
    <figure className={classNames("agent-loop", agentLoopVariantClass[variant], className)}>
      {diagram}
      <figcaption className="agent-loop__caption">{captionByLayout[layout]}</figcaption>
    </figure>
  );
}
