import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toLaymanText } from "./plainText";

const LANGUAGE_MODE_STORAGE_KEY = "agents_explained_language_mode";

export type LanguageMode = "default" | "plain";

interface LanguageContextValue {
  mode: LanguageMode;
  plainModeEnabled: boolean;
  setMode: (nextMode: LanguageMode) => void;
  toggleMode: () => void;
  translate: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredMode(): LanguageMode {
  if (typeof window === "undefined") {
    return "default";
  }

  try {
    const raw = window.localStorage.getItem(LANGUAGE_MODE_STORAGE_KEY);
    return raw === "plain" ? "plain" : "default";
  } catch {
    return "default";
  }
}

export function LanguageProvider({ children }: PropsWithChildren): JSX.Element {
  const [mode, setMode] = useState<LanguageMode>(() => readStoredMode());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(LANGUAGE_MODE_STORAGE_KEY, mode);
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode((currentMode) => (currentMode === "default" ? "plain" : "default"));
  }, []);

  const translate = useCallback(
    (text: string) => {
      if (mode === "default") {
        return text;
      }

      return toLaymanText(text);
    },
    [mode]
  );

  const value = useMemo(
    () => ({
      mode,
      plainModeEnabled: mode === "plain",
      setMode,
      toggleMode,
      translate
    }),
    [mode, setMode, toggleMode, translate]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const contextValue = useContext(LanguageContext);
  if (!contextValue) {
    throw new Error("useLanguage must be used inside LanguageProvider.");
  }

  return contextValue;
}
