import { SidebarNav } from "../SidebarNav/SidebarNav";
import { classNames } from "../../utils/classNames";
import { MobileNavDrawerProps } from "./types";
import { mobileDrawerVariantClass } from "./variants";
import "./MobileNavDrawer.css";

export function MobileNavDrawer({
  open,
  onClose,
  activeId,
  navProps,
  variant = "pastel",
  className
}: MobileNavDrawerProps): JSX.Element {
  return (
    <div
      className={classNames("mobile-drawer", mobileDrawerVariantClass[variant], open && "mobile-drawer--open", className)}
      aria-hidden={!open}
    >
      <button aria-label="Close menu" className="mobile-drawer__scrim" onClick={onClose} type="button" />
      <aside className="mobile-drawer__panel">
        <SidebarNav {...navProps} activeId={activeId} onNavigate={onClose} variant="pastel" />
      </aside>
    </div>
  );
}
