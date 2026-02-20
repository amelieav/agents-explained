import { semanticForTheme } from "./semantic";
import { ThemeName, themes } from "./tokens";

function setVar(root: HTMLElement, name: string, value: string): void {
  root.style.setProperty(name, value);
}

export function applyThemeVariables(themeName: ThemeName): void {
  const root = document.documentElement;
  const tokens = themes[themeName];
  const semantic = semanticForTheme(themeName);

  setVar(root, "--theme-font-display", tokens.typography.fontDisplay);
  setVar(root, "--theme-font-body", tokens.typography.fontBody);
  setVar(root, "--theme-size-hero", tokens.typography.sizeHero);
  setVar(root, "--theme-size-section", tokens.typography.sizeSection);
  setVar(root, "--theme-size-body", tokens.typography.sizeBody);
  setVar(root, "--theme-size-caption", tokens.typography.sizeCaption);
  setVar(root, "--theme-size-card-title", tokens.typography.sizeCardTitle);
  setVar(root, "--theme-size-compact-title", tokens.typography.sizeCompactTitle);
  setVar(root, "--theme-size-action", tokens.typography.sizeAction);
  setVar(root, "--theme-size-diagram-label", tokens.typography.sizeDiagramLabel);

  setVar(root, "--space-xxs", tokens.spacing.xxs);
  setVar(root, "--space-xs", tokens.spacing.xs);
  setVar(root, "--space-sm", tokens.spacing.sm);
  setVar(root, "--space-md", tokens.spacing.md);
  setVar(root, "--space-lg", tokens.spacing.lg);
  setVar(root, "--space-xl", tokens.spacing.xl);
  setVar(root, "--space-xxl", tokens.spacing.xxl);

  setVar(root, "--radius-sm", tokens.radius.sm);
  setVar(root, "--radius-md", tokens.radius.md);
  setVar(root, "--radius-lg", tokens.radius.lg);
  setVar(root, "--radius-pill", tokens.radius.pill);

  setVar(root, "--motion-quick", tokens.motion.quick);
  setVar(root, "--motion-standard", tokens.motion.standard);

  setVar(root, "--surface-page", semantic.surfacePage);
  setVar(root, "--surface-layer", semantic.surfaceLayer);
  setVar(root, "--surface-card", semantic.surfaceCard);
  setVar(root, "--border-soft", semantic.borderSoft);
  setVar(root, "--text-primary", semantic.textPrimary);
  setVar(root, "--text-muted", semantic.textMuted);
  setVar(root, "--accent-primary", semantic.accentPrimary);
  setVar(root, "--accent-secondary", semantic.accentSecondary);
  setVar(root, "--accent-highlight", semantic.accentHighlight);
  setVar(root, "--shadow-soft", semantic.shadowSoft);
  setVar(root, "--shadow-strong", semantic.shadowStrong);

  root.dataset.theme = themeName;
}
