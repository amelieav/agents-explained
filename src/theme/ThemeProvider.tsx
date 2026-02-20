import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { applyThemeVariables } from "./applyTheme";
import { defaultTheme, ThemeName } from "./tokens";

type Density = "cozy" | "compact";

interface ThemeContextValue {
  themeName: ThemeName;
  setThemeName: (next: ThemeName) => void;
  density: Density;
  setDensity: (next: Density) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren): JSX.Element {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);
  const [density, setDensity] = useState<Density>("cozy");

  useEffect(() => {
    applyThemeVariables(themeName);
  }, [themeName]);

  useEffect(() => {
    document.documentElement.dataset.density = density;
  }, [density]);

  const value = useMemo(
    () => ({
      themeName,
      setThemeName,
      density,
      setDensity
    }),
    [themeName, density]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return value;
}

export type { Density };
