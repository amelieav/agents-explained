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
import { LoopStep } from "../types/content";
import { useActiveSection } from "../utils/useActiveSection";
import "./HomePage.css";

const simpleLoopSteps: LoopStep[] = [
  {
    id: "simple-listen",
    label: "1) You ask for help",
    detail: "You type what you want, like planning a trip or writing an email."
  },
  {
    id: "simple-plan",
    label: "2) It makes a plan",
    detail: "The AI breaks your request into small steps."
  },
  {
    id: "simple-work",
    label: "3) It does the work",
    detail: "It uses tools and information to complete each step."
  },
  {
    id: "simple-check",
    label: "4) It checks itself",
    detail: "It reviews the result to catch mistakes."
  },
  {
    id: "simple-return",
    label: "5) It gives you the answer",
    detail: "You get a clear result, and you can ask it to improve it."
  }
];

const simpleHomeCopy = {
  heroSubtitle:
    "A simple guide to one of the next big steps in technology: AI Agents. AI agents are helpers that can understand a goal, do the steps, and bring back a finished result.",
  introSummary:
    "An AI agent is like a digital helper that can do a task for you, not just chat with you.",
  introBullets: [
    "A normal chatbot mostly talks. An AI agent can take action.",
    "You give it a goal, and it works through the steps for you.",
    "It can check its own work before showing you the final answer."
  ],
  introExampleTitle: "Simple example",
  introExampleText:
    "You type: 'Plan a 2-day birthday trip for my family under $600.' The AI agent can search options, compare prices, build a day-by-day plan, and give you one final plan you can use right away.",
  mentalModelTitle: "What an AI agent is (super simple view)",
  mentalModelSummary:
    "Think of it like a smart assistant that follows a 5-step checklist every time.",
  mentalModelBody:
    "Instead of showing many advanced systems, this simple view shows the basic idea: you ask, it plans, it does, it checks, and it returns the result."
};

export function HomePage(): JSX.Element {
  const { plainModeEnabled } = useLanguage();
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
              <p>{plainModeEnabled ? simpleHomeCopy.heroSubtitle : siteCopy.subtitle}</p>
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

          <SectionShell
            id="intro"
            title={introCopy.heading}
            summary={plainModeEnabled ? simpleHomeCopy.introSummary : introCopy.summary}
            variant="highlight"
          >
            <ul className="home-page__bullet-list">
              {(plainModeEnabled ? simpleHomeCopy.introBullets : introCopy.bullets).map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            {plainModeEnabled ? (
              <article className="home-page__example-card" aria-label="Simple AI agent example">
                <h3>{simpleHomeCopy.introExampleTitle}</h3>
                <p>{simpleHomeCopy.introExampleText}</p>
              </article>
            ) : null}
          </SectionShell>

          <SectionShell
            id="mental-model"
            title={plainModeEnabled ? simpleHomeCopy.mentalModelTitle : homeSectionCopy.mentalModel.title}
            summary={plainModeEnabled ? simpleHomeCopy.mentalModelSummary : homeSectionCopy.mentalModel.summary}
            variant="glass"
          >
            {plainModeEnabled ? (
              <div className="home-page__loop-stack">
                <p className="home-page__loop-why">{simpleHomeCopy.mentalModelBody}</p>
                <AgentLoopDiagram steps={simpleLoopSteps} layout="orchestrator-ladder" />
                <ol className="home-page__ordered-list">
                  {simpleLoopSteps.map((step) => (
                    <li key={step.id}>
                      <strong>{step.label}:</strong> {step.detail}
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <>
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
                  <p className="home-page__loop-why">{activeLoopReference.why}</p>
                  <AgentLoopDiagram steps={activeLoopReference.steps} layout={activeLoopReference.diagramKind} />
                  <ol className="home-page__ordered-list">
                    {activeLoopReference.steps.map((step) => (
                      <li key={step.id}>
                        <strong>{step.label}:</strong> {step.detail}
                      </li>
                    ))}
                  </ol>
                </div>
              </>
            )}
          </SectionShell>

          <SectionShell
            id="releases"
            title={releaseCopy.heading}
            summary={plainModeEnabled ? "Latest project update from GitHub." : releaseCopy.subheading}
          >
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
