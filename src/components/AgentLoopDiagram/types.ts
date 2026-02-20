import { LoopStep } from "../../types/content";

export type AgentLoopDiagramVariant = "default" | "compact";
export type AgentLoopDiagramLayout =
  | "conversation-web"
  | "orchestrator-ladder"
  | "coordinator-fanout"
  | "controller-stack"
  | "feedback-loop"
  | "autobuild-pipeline";

export interface AgentLoopDiagramProps {
  steps: LoopStep[];
  layout?: AgentLoopDiagramLayout;
  variant?: AgentLoopDiagramVariant;
  className?: string;
}
