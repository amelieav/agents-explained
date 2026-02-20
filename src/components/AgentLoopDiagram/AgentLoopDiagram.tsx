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
  const startOffset = 56;
  const endOffset = 56;
  const x1 = from.centerX + nx * startOffset;
  const y1 = from.centerY + ny * startOffset;
  const x2 = to.centerX - nx * endOffset;
  const y2 = to.centerY - ny * endOffset;
  const lx = (x1 + x2) / 2 + -ny * 14;
  const ly = (y1 + y2) / 2 + nx * 14;

  return { x1, y1, x2, y2, lx, ly };
}

export function AgentLoopDiagram({ steps, variant = "default", className }: AgentLoopDiagramProps): JSX.Element {
  const hubX = 360;
  const hubY = 250;
  const radius = 190;
  const nodeWidth = 170;
  const nodeHeight = 78;
  const edgeLabels = ["Intent parse", "Task planning", "Tool execution", "Quality checks", "State updates"];

  const nodes: PositionedLoopNode[] = steps.map((step, index) => {
    const angle = (-90 + (index * 360) / steps.length) * (Math.PI / 180);
    return {
      ...step,
      centerX: hubX + radius * Math.cos(angle),
      centerY: hubY + radius * Math.sin(angle),
      detailLines: wrapLines(step.detail, 24).slice(0, 2)
    };
  });

  const planNode = nodes.find((node) => node.id === "plan");
  const evaluateNode = nodes.find((node) => node.id === "evaluate");
  const adaptNode = nodes.find((node) => node.id === "adapt");
  const understandNode = nodes.find((node) => node.id === "understand");

  return (
    <figure className={classNames("agent-loop", agentLoopVariantClass[variant], className)}>
      <svg viewBox="0 0 720 500" role="img" aria-label="Detailed AI agent loop with shared state, tool execution, and feedback">
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

        {evaluateNode && planNode ? (
          <>
            <path
              d={`M ${evaluateNode.centerX - 20} ${evaluateNode.centerY - 28} C ${hubX + 10} ${hubY - 150}, ${hubX - 20} ${hubY - 160}, ${planNode.centerX + 18} ${planNode.centerY + 26}`}
              className="agent-loop__feedback"
              markerEnd="url(#agent-loop-arrowhead)"
            />
            <text className="agent-loop__edge-label" x={hubX - 8} y={hubY - 156}>
              Feedback retry
            </text>
          </>
        ) : null}

        {adaptNode && understandNode ? (
          <>
            <path
              d={`M ${adaptNode.centerX + 32} ${adaptNode.centerY - 16} C ${hubX - 38} ${hubY - 10}, ${hubX - 120} ${hubY - 42}, ${understandNode.centerX - 24} ${understandNode.centerY + 28}`}
              className="agent-loop__feedback"
              markerEnd="url(#agent-loop-arrowhead)"
            />
            <text className="agent-loop__edge-label" x={hubX - 170} y={hubY - 38}>
              Updated context
            </text>
          </>
        ) : null}

        <circle cx={hubX} cy={hubY} r="76" className="agent-loop__hub" />
        <text x={hubX} y={hubY - 8} className="agent-loop__hub-label">
          Shared State
        </text>
        <text x={hubX} y={hubY + 14} className="agent-loop__hub-meta">
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
            <text x={node.centerX} y={node.centerY - 10} className="agent-loop__label">
              {node.label}
            </text>
            <text x={node.centerX} y={node.centerY + 10} className="agent-loop__detail">
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
        Execution moves through understanding, planning, acting, evaluation, and adaptation while shared state synchronizes each step.
      </figcaption>
    </figure>
  );
}
