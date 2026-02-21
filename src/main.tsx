import ReactDOM from "react-dom/client";
import { App } from "./App";
import { LanguageProvider } from "./language/LanguageProvider";
import { ThemeProvider } from "./theme/ThemeProvider";
import "./theme/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ThemeProvider>
);
