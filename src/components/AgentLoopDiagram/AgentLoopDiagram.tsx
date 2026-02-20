import { classNames } from "../../utils/classNames";
import { agentLoopVariantClass } from "./variants";
import { AgentLoopDiagramProps } from "./types";
import "./AgentLoopDiagram.css";

interface PositionedLoopNode {
  id: string;
  label: string;
  detail: string;
  centerX: number;
  centerY: number;
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

function edgePoints(from: PositionedLoopNode, to: PositionedLoopNode): { x1: number; y1: number; x2: number; y2: number; lx: number; ly: number } {
  const dx = to.centerX - from.centerX;
  const dy = to.centerY - from.centerY;
  const length = Math.hypot(dx, dy) || 1;
  const nx = dx / length;
  const ny = dy / length;
  const startOffset = 78;
  const endOffset = 78;
  const x1 = from.centerX + nx * startOffset;
  const y1 = from.centerY + ny * startOffset;
  const x2 = to.centerX - nx * endOffset;
  const y2 = to.centerY - ny * endOffset;
  const lx = (x1 + x2) / 2 + -ny * 16;
  const ly = (y1 + y2) / 2 + nx * 16;

  return { x1, y1, x2, y2, lx, ly };
}

export function AgentLoopDiagram({ steps, variant = "default", className }: AgentLoopDiagramProps): JSX.Element {
  const diagramWidth = 980;
  const diagramHeight = 700;
  const hubX = 490;
  const hubY = 350;
  const radius = steps.length >= 7 ? 282 : steps.length === 6 ? 262 : 238;
  const nodeWidth = 214;
  const nodeHeight = 104;
  const edgeLabels = ["Intake", "Route", "Execute", "Check", "Refine", "Merge", "Publish"];

  const nodes: PositionedLoopNode[] = steps.map((step, index) => {
    const angle = (-90 + (index * 360) / steps.length) * (Math.PI / 180);
    return {
      ...step,
      centerX: hubX + radius * Math.cos(angle),
      centerY: hubY + radius * Math.sin(angle),
      labelLines: wrapLines(step.label, 20).slice(0, 2),
      detailLines: wrapLines(step.detail, 28).slice(0, 2)
    };
  });

  const retryFrom = nodes[Math.min(nodes.length - 1, Math.max(0, Math.floor((nodes.length * 2) / 3)))];
  const retryTo = nodes[Math.max(0, Math.floor(nodes.length / 3))];
  const closeLoopFrom = nodes[nodes.length - 1];
  const closeLoopTo = nodes[0];

  return (
    <figure className={classNames("agent-loop", agentLoopVariantClass[variant], className)}>
      <svg
        viewBox={`0 0 ${diagramWidth} ${diagramHeight}`}
        role="img"
        aria-label="Detailed AI agent loop with orchestration, shared state, and feedback"
      >
        <defs>
          <marker id="agent-loop-arrowhead" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M 0 0 L 9 4.5 L 0 9 z" className="agent-loop__arrowhead" />
          </marker>
        </defs>

        {nodes.map((node) => (
          <line key={`${node.id}-sync`} x1={node.centerX} y1={node.centerY} x2={hubX} y2={hubY} className="agent-loop__sync" />
        ))}

        {nodes.map((node, index) => {
          const next = nodes[(index + 1) % nodes.length];
          const edge = edgePoints(node, next);
          return (
            <g key={`${node.id}-edge`}>
              <line
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                className="agent-loop__edge"
                markerEnd="url(#agent-loop-arrowhead)"
              />
              <text className="agent-loop__edge-label" x={edge.lx} y={edge.ly}>
                {edgeLabels[index % edgeLabels.length]}
              </text>
            </g>
          );
        })}

        {steps.length > 3 && retryFrom && retryTo ? (
          <>
            <path
              d={`M ${retryFrom.centerX - 24} ${retryFrom.centerY - 32} C ${hubX + 26} ${hubY - 210}, ${hubX - 32} ${hubY - 216}, ${retryTo.centerX + 22} ${retryTo.centerY + 38}`}
              className="agent-loop__feedback"
              markerEnd="url(#agent-loop-arrowhead)"
            />
            <text className="agent-loop__edge-label" x={hubX - 16} y={hubY - 216}>
              Feedback retry
            </text>
          </>
        ) : null}

        {steps.length > 2 && closeLoopFrom && closeLoopTo ? (
          <>
            <path
              d={`M ${closeLoopFrom.centerX + 42} ${closeLoopFrom.centerY - 10} C ${hubX - 10} ${hubY + 48}, ${hubX - 156} ${hubY - 24}, ${closeLoopTo.centerX - 26} ${closeLoopTo.centerY + 36}`}
              className="agent-loop__feedback"
              markerEnd="url(#agent-loop-arrowhead)"
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

        {nodes.map((node) => (
          <g key={node.id}>
            <rect
              x={node.centerX - nodeWidth / 2}
              y={node.centerY - nodeHeight / 2}
              width={nodeWidth}
              height={nodeHeight}
              rx={18}
              className="agent-loop__node"
            />
            <text x={node.centerX} y={node.centerY - 22} className="agent-loop__label">
              {node.labelLines.map((line, lineIndex) => (
                <tspan key={`${node.id}-label-${lineIndex}`} x={node.centerX} dy={lineIndex === 0 ? 0 : 16}>
                  {line}
                </tspan>
              ))}
            </text>
            <text x={node.centerX} y={node.centerY + 18} className="agent-loop__detail">
              {node.detailLines.map((line, lineIndex) => (
                <tspan key={`${node.id}-line-${lineIndex}`} x={node.centerX} dy={lineIndex === 0 ? 0 : 14}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="agent-loop__caption">
        Each loop pattern coordinates orchestration, execution, shared state updates, and iterative feedback until completion.
      </figcaption>
    </figure>
  );
}
