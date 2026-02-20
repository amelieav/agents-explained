import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ThemeProvider } from "./theme/ThemeProvider";
import "./theme/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
