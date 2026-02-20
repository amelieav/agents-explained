import { SectionId } from "../../types/content";
import { SidebarNavProps } from "../SidebarNav/types";

export type MobileNavDrawerVariant = "pastel" | "subtle";

export interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
  activeId: SectionId;
  navProps: Omit<SidebarNavProps, "activeId" | "onNavigate" | "variant" | "className">;
  variant?: MobileNavDrawerVariant;
  className?: string;
}
