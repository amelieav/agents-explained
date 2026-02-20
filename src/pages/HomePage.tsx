import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AgentLoopDiagram } from "../components/AgentLoopDiagram/AgentLoopDiagram";
import { FAQAccordion } from "../components/FAQAccordion/FAQAccordion";
import { MobileNavDrawer } from "../components/MobileNavDrawer/MobileNavDrawer";
import { ReleaseFeed } from "../components/ReleaseFeed/ReleaseFeed";
import { SectionShell } from "../components/SectionShell/SectionShell";
import { SidebarNav } from "../components/SidebarNav/SidebarNav";
import {
  bigProjectPractices,
  faqItems,
  frameworkFit,
  frameworkTableCopy,
  homeSectionCopy,
  introCopy,
  loopSteps,
  mcpCopy,
  mentalModelCards,
  organizationPatterns,
  releaseCopy,
  sharedLabels,
  siteCopy
} from "../content/copy";
import { navItems } from "../content/sections";
import { useActiveSection } from "../utils/useActiveSection";
import "./HomePage.css";

export function HomePage(): JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const ids = useMemo(() => navItems.map((item) => item.id), []);
  const activeId = useActiveSection(ids);

  return (
    <main className="home-page">
      <div className="home-page__layout">
        <aside className="home-page__sidebar" aria-label="Desktop navigation">
          <SidebarNav items={navItems} activeId={activeId} title={siteCopy.sidebarTitle} note={siteCopy.sidebarNote} />
        </aside>

        <div className="home-page__content">
          <header className="home-page__hero" id="top">
            <p>{siteCopy.eyebrow}</p>
            <h1>{siteCopy.title}</h1>
            <p>{siteCopy.subtitle}</p>
            <button className="home-page__menu-button" type="button" onClick={() => setDrawerOpen(true)}>
              {siteCopy.mobileMenuLabel}
            </button>
            <Link className="home-page__glossary-link" to="/glossary">
              {siteCopy.glossaryCta}
            </Link>
          </header>

          <SectionShell id="intro" title={introCopy.heading} summary={introCopy.summary} variant="highlight">
            <ul className="home-page__bullet-list">
              {introCopy.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </SectionShell>

          <SectionShell id="mental-model" title={homeSectionCopy.mentalModel.title} summary={homeSectionCopy.mentalModel.summary}>
            <div className="home-page__card-grid">
              {mentalModelCards.map((card) => (
                <article className="home-page__card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </SectionShell>

          <SectionShell id="agent-loop" title={homeSectionCopy.loop.title} summary={homeSectionCopy.loop.summary} variant="glass">
            <AgentLoopDiagram steps={loopSteps} />
            <ol className="home-page__ordered-list">
              {loopSteps.map((step) => (
                <li key={step.id}>
                  <strong>{step.label}:</strong> {step.detail}
                </li>
              ))}
            </ol>
          </SectionShell>

          <SectionShell
            id="framework-fit"
            title={homeSectionCopy.framework.title}
            summary={homeSectionCopy.framework.summary}
          >
            <div className="home-page__table-wrap">
              <table className="home-page__table">
                <thead>
                  <tr>
                    <th>{frameworkTableCopy.option}</th>
                    <th>{frameworkTableCopy.bestFor}</th>
                    <th>{frameworkTableCopy.mentalModel}</th>
                    <th>{frameworkTableCopy.caveat}</th>
                  </tr>
                </thead>
                <tbody>
                  {frameworkFit.map((item) => (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>{item.bestFor}</td>
                      <td>{item.mentalModel}</td>
                      <td>{item.caveat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionShell>

          <SectionShell id="mcp" title={mcpCopy.heading} summary={mcpCopy.summary} variant="glass">
            <div className="home-page__card-grid">
              {mcpCopy.cards.map((card) => (
                <article className="home-page__card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </SectionShell>

          <SectionShell
            id="org-patterns"
            title={homeSectionCopy.organization.title}
            summary={homeSectionCopy.organization.summary}
          >
            <div className="home-page__card-grid">
              {organizationPatterns.map((item) => (
                <article className="home-page__card" key={item.name}>
                  <h3>{item.name}</h3>
                  <p>
                    <strong>{sharedLabels.whenToUse}:</strong> {item.whenToUse}
                  </p>
                  <p>
                    <strong>{sharedLabels.risk}:</strong> {item.risk}
                  </p>
                </article>
              ))}
            </div>
          </SectionShell>

          <SectionShell
            id="big-projects"
            title={homeSectionCopy.practices.title}
            summary={homeSectionCopy.practices.summary}
            variant="glass"
          >
            <ul className="home-page__bullet-list">
              {bigProjectPractices.map((practice) => (
                <li key={practice}>{practice}</li>
              ))}
            </ul>
          </SectionShell>

          <SectionShell id="faq" title={homeSectionCopy.faq.title} summary={homeSectionCopy.faq.summary}>
            <FAQAccordion items={faqItems} variant="soft" />
          </SectionShell>

          <SectionShell id="releases" title={releaseCopy.heading} summary={releaseCopy.subheading}>
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
