import { LoopStep } from "../../types/content";

export type AgentLoopDiagramVariant = "default" | "compact";
export type AgentLoopDiagramLayout = "loop" | "topdown";

export interface AgentLoopDiagramProps {
  steps: LoopStep[];
  layout?: AgentLoopDiagramLayout;
  variant?: AgentLoopDiagramVariant;
  className?: string;
}
