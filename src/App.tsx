import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ComparisonsPage } from "./pages/ComparisonsPage";
import { DecisionLabPage } from "./pages/DecisionLabPage";
import { GlossaryPage } from "./pages/GlossaryPage";
import { HomePage } from "./pages/HomePage";

export function App(): JSX.Element {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/decision-lab" element={<DecisionLabPage />} />
        <Route path="/comparisons" element={<ComparisonsPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
