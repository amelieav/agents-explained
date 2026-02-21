import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AgentLoopDiagram } from "../components/AgentLoopDiagram/AgentLoopDiagram";
import { LanguageToggle } from "../components/LanguageToggle/LanguageToggle";
import { MobileNavDrawer } from "../components/MobileNavDrawer/MobileNavDrawer";
import { ReleaseFeed } from "../components/ReleaseFeed/ReleaseFeed";
import { SectionShell } from "../components/SectionShell/SectionShell";
import { SidebarNav } from "../components/SidebarNav/SidebarNav";
import {
  agentLoopReferences,
  homeSectionCopy,
  introCopy,
  releaseCopy,
  siteCopy
} from "../content/copy";
import { navItems } from "../content/sections";
import { useLanguage } from "../language/LanguageProvider";
import { useActiveSection } from "../utils/useActiveSection";
import "./HomePage.css";

export function HomePage(): JSX.Element {
  const { translate } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeLoopReferenceId, setActiveLoopReferenceId] = useState(agentLoopReferences[0].id);
  const ids = useMemo(() => navItems.map((item) => item.id), []);
  const activeId = useActiveSection(ids);
  const activeLoopReference = useMemo(
    () => agentLoopReferences.find((item) => item.id === activeLoopReferenceId) ?? agentLoopReferences[0],
    [activeLoopReferenceId]
  );

  return (
    <main className="home-page">
      <div className="home-page__layout">
        <aside className="home-page__sidebar" aria-label="Desktop navigation">
          <SidebarNav items={navItems} activeId={activeId} title={siteCopy.sidebarTitle} note={siteCopy.sidebarNote} />
        </aside>

        <div className="home-page__content">
          <div className="home-page__toolbar">
            <LanguageToggle />
          </div>

          <header className="home-page__hero" id="top">
            <div className="home-page__hero-copy">
              <p>{siteCopy.eyebrow}</p>
              <h1>{siteCopy.title}</h1>
              <p>{translate(siteCopy.subtitle)}</p>
              <button className="home-page__menu-button" type="button" onClick={() => setDrawerOpen(true)}>
                {siteCopy.mobileMenuLabel}
              </button>
            </div>
            <div className="home-page__hero-links">
              <Link className="home-page__hero-link" to="/comparisons">
                {siteCopy.comparisonsCta}
              </Link>
              <Link className="home-page__hero-link" to="/glossary">
                {siteCopy.glossaryCta}
              </Link>
            </div>
          </header>

          <SectionShell id="intro" title={introCopy.heading} summary={translate(introCopy.summary)} variant="highlight">
            <ul className="home-page__bullet-list">
              {introCopy.bullets.map((bullet) => (
                <li key={bullet}>{translate(bullet)}</li>
              ))}
            </ul>
          </SectionShell>

          <SectionShell
            id="mental-model"
            title={homeSectionCopy.mentalModel.title}
            summary={translate(homeSectionCopy.mentalModel.summary)}
            variant="glass"
          >
            <div className="home-page__loop-tabs" role="tablist" aria-label="Agent ecosystem sources">
              {agentLoopReferences.map((reference) => (
                <button
                  key={reference.id}
                  type="button"
                  role="tab"
                  className={`home-page__loop-tab${reference.id === activeLoopReference.id ? " home-page__loop-tab--active" : ""}`}
                  aria-selected={reference.id === activeLoopReference.id}
                  onClick={() => setActiveLoopReferenceId(reference.id)}
                >
                  {reference.tabLabel}
                </button>
              ))}
            </div>

            <div className="home-page__loop-stack">
              <div className="home-page__loop-meta">
                <h3 className="home-page__subheading">{activeLoopReference.title}</h3>
                <a href={activeLoopReference.sourceUrl} target="_blank" rel="noreferrer">
                  {activeLoopReference.sourceName}
                </a>
              </div>
              <p className="home-page__loop-why">{translate(activeLoopReference.why)}</p>
              <AgentLoopDiagram steps={activeLoopReference.steps} layout={activeLoopReference.diagramKind} />
              <ol className="home-page__ordered-list">
                {activeLoopReference.steps.map((step) => (
                  <li key={step.id}>
                    <strong>{step.label}:</strong> {translate(step.detail)}
                  </li>
                ))}
              </ol>
            </div>
          </SectionShell>

          <SectionShell id="releases" title={releaseCopy.heading} summary={translate(releaseCopy.subheading)}>
            <ReleaseFeed
              endpoint={siteCopy.releaseEndpoint}
              loadingLabel={releaseCopy.loading}
              emptyLabel={releaseCopy.empty}
              errorLabel={releaseCopy.error}
              noNotesLabel={releaseCopy.noNotes}
              maxItems={1}
            />
          </SectionShell>
        </div>
      </div>

      <MobileNavDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeId={activeId}
        navProps={{
          items: navItems,
          title: siteCopy.sidebarTitle,
          note: siteCopy.sidebarNote
        }}
      />
    </main>
  );
}
