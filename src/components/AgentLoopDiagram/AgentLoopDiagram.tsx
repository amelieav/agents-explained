import { classNames } from "../../utils/classNames";
import { agentLoopVariantClass } from "./variants";
import { AgentLoopDiagramProps } from "./types";
import "./AgentLoopDiagram.css";

export function AgentLoopDiagram({ steps, variant = "default", className }: AgentLoopDiagramProps): JSX.Element {
  const centerX = 330;
  const centerY = 220;
  const radius = 150;

  const nodes = steps.map((step, index) => {
    const angle = (-90 + (index * 360) / steps.length) * (Math.PI / 180);
    return {
      ...step,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  });

  return (
    <figure className={classNames("agent-loop", agentLoopVariantClass[variant], className)}>
      <svg viewBox="0 0 660 440" role="img" aria-label="Simplest AI agent loop diagram">
        {nodes.map((node, index) => {
          const next = nodes[(index + 1) % nodes.length];
          return (
            <g key={`${node.id}-edge`}>
              <line x1={node.x} y1={node.y} x2={next.x} y2={next.y} className="agent-loop__edge" />
            </g>
          );
        })}

        {nodes.map((node) => (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r="48" className="agent-loop__node" />
            <text x={node.x} y={node.y} className="agent-loop__label">
              {node.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="agent-loop__caption">Understand -&gt; Plan -&gt; Act -&gt; Evaluate -&gt; Adapt</figcaption>
    </figure>
  );
}
