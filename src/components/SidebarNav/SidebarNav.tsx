import { classNames } from "../../utils/classNames";
import { sidebarVariantClass } from "./variants";
import { SidebarNavProps } from "./types";
import "./SidebarNav.css";

export function SidebarNav({
  items,
  activeId,
  onNavigate,
  variant = "pastel",
  className,
  title,
  note
}: SidebarNavProps): JSX.Element {
  return (
    <nav aria-label="Section navigation" className={classNames("sidebar-nav", sidebarVariantClass[variant], className)}>
      <div className="sidebar-nav__meta">
        <p className="sidebar-nav__title">{title}</p>
        {note ? <p className="sidebar-nav__note">{note}</p> : null}
      </div>

      <ul className="sidebar-nav__list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={classNames("sidebar-nav__link", activeId === item.id && "sidebar-nav__link--active")}
              onClick={onNavigate}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

    </nav>
  );
}
