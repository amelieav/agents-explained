import { LoopStep } from "../../types/content";

export type AgentLoopDiagramVariant = "default" | "compact";

export interface AgentLoopDiagramProps {
  steps: LoopStep[];
  variant?: AgentLoopDiagramVariant;
  className?: string;
}
