export type ThemeName = "cotton-candy" | "mint-sherbet";

export interface ThemeTokens {
  colors: {
    cloud: string;
    cream: string;
    peach: string;
    pink: string;
    lilac: string;
    sky: string;
    mint: string;
    ink: string;
    slate: string;
    line: string;
  };
  typography: {
    fontDisplay: string;
    fontBody: string;
    sizeHero: string;
    sizeSection: string;
    sizeBody: string;
    sizeCaption: string;
    sizeCardTitle: string;
    sizeCompactTitle: string;
    sizeAction: string;
    sizeDiagramLabel: string;
  };
  spacing: {
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    pill: string;
  };
  shadow: {
    soft: string;
    strong: string;
  };
  motion: {
    quick: string;
    standard: string;
  };
}

export const themes: Record<ThemeName, ThemeTokens> = {
  "cotton-candy": {
    colors: {
      cloud: "#fff8fd",
      cream: "#fff4ea",
      peach: "#ffd8c9",
      pink: "#ffd8f2",
      lilac: "#e9ddff",
      sky: "#d9ecff",
      mint: "#d8f8ea",
      ink: "#2f2940",
      slate: "#5f6078",
      line: "#e8ddeb"
    },
    typography: {
      fontDisplay: "\"Baloo 2\", \"Trebuchet MS\", cursive",
      fontBody: "\"Nunito\", \"Segoe UI\", sans-serif",
      sizeHero: "clamp(2.4rem, 5vw, 4rem)",
      sizeSection: "clamp(1.5rem, 2.4vw, 2.1rem)",
      sizeBody: "1.02rem",
      sizeCaption: "0.88rem",
      sizeCardTitle: "1.2rem",
      sizeCompactTitle: "1.25rem",
      sizeAction: "0.95rem",
      sizeDiagramLabel: "16px"
    },
    spacing: {
      xxs: "0.25rem",
      xs: "0.5rem",
      sm: "0.75rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2.25rem",
      xxl: "3.25rem"
    },
    radius: {
      sm: "12px",
      md: "20px",
      lg: "28px",
      pill: "999px"
    },
    shadow: {
      soft: "0 16px 38px -26px rgba(47, 41, 64, 0.35)",
      strong: "0 28px 50px -32px rgba(47, 41, 64, 0.45)"
    },
    motion: {
      quick: "140ms",
      standard: "240ms"
    }
  },
  "mint-sherbet": {
    colors: {
      cloud: "#f7fffb",
      cream: "#f4fff5",
      peach: "#ffe2cb",
      pink: "#ffe4f3",
      lilac: "#e4ecff",
      sky: "#dcf4ff",
      mint: "#d6ffe5",
      ink: "#233740",
      slate: "#4f6773",
      line: "#d8e8e1"
    },
    typography: {
      fontDisplay: "\"Baloo 2\", \"Trebuchet MS\", cursive",
      fontBody: "\"Nunito\", \"Segoe UI\", sans-serif",
      sizeHero: "clamp(2.4rem, 5vw, 4rem)",
      sizeSection: "clamp(1.5rem, 2.4vw, 2.1rem)",
      sizeBody: "1.02rem",
      sizeCaption: "0.88rem",
      sizeCardTitle: "1.2rem",
      sizeCompactTitle: "1.25rem",
      sizeAction: "0.95rem",
      sizeDiagramLabel: "16px"
    },
    spacing: {
      xxs: "0.25rem",
      xs: "0.5rem",
      sm: "0.75rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2.25rem",
      xxl: "3.25rem"
    },
    radius: {
      sm: "12px",
      md: "20px",
      lg: "28px",
      pill: "999px"
    },
    shadow: {
      soft: "0 16px 38px -26px rgba(35, 55, 64, 0.32)",
      strong: "0 28px 50px -32px rgba(35, 55, 64, 0.4)"
    },
    motion: {
      quick: "140ms",
      standard: "240ms"
    }
  }
};

export const defaultTheme: ThemeName = "cotton-candy";
