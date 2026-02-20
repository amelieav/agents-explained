import { ThemeName, themes } from "./tokens";

export interface SemanticTokens {
  surfacePage: string;
  surfaceLayer: string;
  surfaceCard: string;
  borderSoft: string;
  textPrimary: string;
  textMuted: string;
  accentPrimary: string;
  accentSecondary: string;
  accentHighlight: string;
  shadowSoft: string;
  shadowStrong: string;
}

export function semanticForTheme(themeName: ThemeName): SemanticTokens {
  const base = themes[themeName];

  return {
    surfacePage: base.colors.cloud,
    surfaceLayer: base.colors.cream,
    surfaceCard: base.colors.sky,
    borderSoft: base.colors.line,
    textPrimary: base.colors.ink,
    textMuted: base.colors.slate,
    accentPrimary: base.colors.pink,
    accentSecondary: base.colors.lilac,
    accentHighlight: base.colors.peach,
    shadowSoft: base.shadow.soft,
    shadowStrong: base.shadow.strong
  };
}
