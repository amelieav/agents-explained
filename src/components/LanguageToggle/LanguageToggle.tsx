import { classNames } from "../../utils/classNames";
import { useLanguage } from "../../language/LanguageProvider";
import "./LanguageToggle.css";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps): JSX.Element {
  const { plainModeEnabled, toggleMode } = useLanguage();
  const modeLabel = plainModeEnabled ? "On" : "Off";
  const actionLabel = plainModeEnabled ? "Switch to default wording" : "Switch to simpler wording";

  return (
    <button
      type="button"
      className={classNames("language-toggle", plainModeEnabled && "language-toggle--active", className)}
      onClick={toggleMode}
      aria-pressed={plainModeEnabled}
      aria-label={actionLabel}
      title={actionLabel}
    >
      <span className="language-toggle__label">Layman Terms</span>
      <span className="language-toggle__status">{modeLabel}</span>
    </button>
  );
}
