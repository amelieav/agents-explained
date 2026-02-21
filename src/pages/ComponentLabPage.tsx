import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { AgentLoopDiagram } from "../components/AgentLoopDiagram/AgentLoopDiagram";
import { BubbleHeading } from "../components/BubbleHeading/BubbleHeading";
import { FAQAccordion } from "../components/FAQAccordion/FAQAccordion";
import { GlossaryTermCard } from "../components/GlossaryTermCard/GlossaryTermCard";
import { LanguageToggle } from "../components/LanguageToggle/LanguageToggle";
import { LayeredPanel } from "../components/LayeredPanel/LayeredPanel";
import { ReleaseFeed } from "../components/ReleaseFeed/ReleaseFeed";
import { SectionShell } from "../components/SectionShell/SectionShell";
import { faqItems, glossaryItems, labCopy, loopSteps, releaseCopy } from "../content/copy";
import { useLanguage } from "../language/LanguageProvider";
import { Density, useTheme } from "../theme/ThemeProvider";
import { ThemeName, themes } from "../theme/tokens";
import "./ComponentLabPage.css";

function codeSnippet(label: string, snippet: string): JSX.Element {
  return (
    <div className="lab-page__snippet">
      <p>{label}</p>
      <pre>
        <code>{snippet}</code>
      </pre>
    </div>
  );
}

export function ComponentLabPage(): JSX.Element {
  const { themeName, setThemeName, density, setDensity } = useTheme();
  const { translate } = useLanguage();
  const [sampleTitle, setSampleTitle] = useState(labCopy.sampleTitleDefault);
  const [sampleSummary, setSampleSummary] = useState(labCopy.sampleSummaryDefault);

  function onThemeChange(event: ChangeEvent<HTMLSelectElement>): void {
    setThemeName(event.target.value as ThemeName);
  }

  function onDensityChange(event: ChangeEvent<HTMLSelectElement>): void {
    setDensity(event.target.value as Density);
  }

  return (
    <main className="lab-page">
      <div className="lab-page__container">
        <div className="lab-page__toolbar">
          <LanguageToggle />
        </div>

        <header className="lab-page__header">
          <p>{labCopy.eyebrow}</p>
          <h1>{labCopy.title}</h1>
          <p>{translate(labCopy.subtitle)}</p>
          <Link to="/">{labCopy.backLabel}</Link>
        </header>

        <LayeredPanel variant="highlight">
          <div className="lab-page__controls">
            <label>
              {labCopy.themeLabel}
              <select value={themeName} onChange={onThemeChange}>
                {Object.keys(themes).map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {labCopy.densityLabel}
              <select value={density} onChange={onDensityChange}>
                <option value="cozy">cozy</option>
                <option value="compact">compact</option>
              </select>
            </label>
            <label>
              {labCopy.sampleLabel}
              <input value={sampleTitle} onChange={(event) => setSampleTitle(event.target.value)} />
            </label>
            <label>
              {labCopy.sampleSummaryLabel}
              <input value={sampleSummary} onChange={(event) => setSampleSummary(event.target.value)} />
            </label>
          </div>
        </LayeredPanel>

        <section className="lab-page__showcase">
          <LayeredPanel>
            <BubbleHeading title={sampleTitle} subtitle={sampleSummary} variant="hero" eyebrow="BubbleHeading" />
            {codeSnippet(labCopy.snippetLabel, '<BubbleHeading title="..." subtitle="..." variant="hero" />')}
          </LayeredPanel>

          <SectionShell id="lab-section-shell" title={sampleTitle} summary={sampleSummary} variant="glass">
            <p>{translate(labCopy.sectionShellNote)}</p>
            {codeSnippet(labCopy.snippetLabel, '<SectionShell id="..." title="..." summary="...">...</SectionShell>')}
          </SectionShell>

          <LayeredPanel>
            <h2>AgentLoopDiagram</h2>
            <AgentLoopDiagram steps={loopSteps} variant="compact" />
            {codeSnippet(labCopy.snippetLabel, '<AgentLoopDiagram steps={loopSteps} variant="compact" />')}
          </LayeredPanel>

          <LayeredPanel>
            <h2>FAQAccordion</h2>
            <FAQAccordion items={faqItems} variant="soft" />
            {codeSnippet(labCopy.snippetLabel, '<FAQAccordion items={faqItems} variant="soft" />')}
          </LayeredPanel>

          <LayeredPanel>
            <h2>GlossaryTermCard</h2>
            <GlossaryTermCard item={glossaryItems[0]} variant="bordered" />
            {codeSnippet(labCopy.snippetLabel, '<GlossaryTermCard item={glossaryItems[0]} variant="bordered" />')}
          </LayeredPanel>

          <LayeredPanel>
            <h2>ReleaseFeed</h2>
            <ReleaseFeed
              endpoint={labCopy.releasesEndpoint}
              loadingLabel={releaseCopy.loading}
              emptyLabel={releaseCopy.empty}
              errorLabel={releaseCopy.error}
              noNotesLabel={releaseCopy.noNotes}
              variant="minimal"
            />
            {codeSnippet(
              labCopy.snippetLabel,
              '<ReleaseFeed endpoint={api} loadingLabel="..." emptyLabel="..." errorLabel="..." variant="minimal" />'
            )}
          </LayeredPanel>
        </section>
      </div>
    </main>
  );
}
