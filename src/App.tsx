import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlossaryPage } from "./pages/GlossaryPage";
import { HomePage } from "./pages/HomePage";

export function App(): JSX.Element {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
