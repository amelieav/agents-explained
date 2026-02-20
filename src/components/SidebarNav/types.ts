import { NavItem, SectionId } from "../../types/content";

export type SidebarNavVariant = "pastel" | "subtle";

export interface SidebarNavProps {
  items: NavItem[];
  activeId: SectionId;
  onNavigate?: () => void;
  variant?: SidebarNavVariant;
  className?: string;
  title: string;
  note?: string;
}
