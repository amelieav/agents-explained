import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LanguageToggle } from "../components/LanguageToggle/LanguageToggle";
import { MobileNavDrawer } from "../components/MobileNavDrawer/MobileNavDrawer";
import { ReleaseFeed } from "../components/ReleaseFeed/ReleaseFeed";
import { SectionShell } from "../components/SectionShell/SectionShell";
import { SidebarNav } from "../components/SidebarNav/SidebarNav";
import { homeSectionCopy, introCopy, releaseCopy, siteCopy } from "../content/copy";
import autoBuildDiagram from "../images/autobuild.webp";
import autoGenDiagram from "../images/autogen.webp";
import googleAdkDiagram from "../images/google-adk.webp";
import googleCloudDiagram from "../images/google.webp";
import microsoftDiagram from "../images/microsoft.webp";
import simpleAgentDiagram from "../images/simple-agent-diagram-of-single-agents-vs-multi-agents.webp";
import vertexDiagram from "../images/vertex-ai.webp";
import { useLanguage } from "../language/LanguageProvider";
import { NavItem } from "../types/content";
import { useActiveSection } from "../utils/useActiveSection";
import "./HomePage.css";

interface TechnicalEcosystem {
  id: string;
  sectionId: string;
  bookmarkLabel: string;
  title: string;
  sourceLabel: string;
  sourceUrl: string;
  imageSrc: string;
  imageAlt: string;
  happening: string;
  why: string;
  tradeoffs: string[];
  goodFor: string[];
}

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
    "Simple view of one agent vs a team of agents, and where each is useful.",
  mentalModelLead:
    "An AI agent is a digital worker: you give it a goal, and it can figure out the steps, use tools, and return a complete result.",
  mentalModelSupport:
    "A multi-agent system means multiple digital workers collaborate. One can research, one can analyze, and one can check quality so the final answer is stronger.",
  mentalModelUseCases: [
    "Personal planning, writing support, and document summaries.",
    "Business workflows like customer support, compliance review, and reporting.",
    "Research-heavy tasks where several specialist agents can work in parallel."
  ],
  mentalModelDiseaseExample:
    "Disease-solving example: one agent reads patient notes and lab results, another scans new medical studies, and a third checks treatment risks or drug interactions. Together they can prepare a faster, better-organized draft for doctors to review."
};

const technicalEcosystems: TechnicalEcosystem[] = [
  {
    id: "autobuild",
    sectionId: "ecosystem-autobuild",
    bookmarkLabel: "AutoBuild",
    title: "Agent AutoBuild (Role-Specialized Collaboration Model)",
    sourceLabel: "AG2 AutoBuild docs",
    sourceUrl: "https://docs.ag2.ai/latest/docs/blog/2023/11/26/Agent-AutoBuild/",
    imageSrc: autoBuildDiagram,
    imageAlt: "Agent AutoBuild architecture diagram",
    happening:
      "This architecture runs in two phases. First, it builds the agent team from a single user goal by defining roles and instructions. Then those role agents move into a group chat execution loop where they exchange messages, refine work, and call code execution when needed until they converge on a final output.",
    why:
      "It is designed for specialization, delegation, and iterative reasoning. Instead of one giant prompt, it creates a structured team with isolated responsibilities and clearer task decomposition.",
    tradeoffs: [
      "Higher runtime cost because multiple agents may run for one task.",
      "Debugging can be harder when issues happen across agent-to-agent conversations.",
      "Convergence can be slower for open-ended work."
    ],
    goodFor: ["Research workflows", "Multi-step analysis", "Autonomous exploration"]
  },
  {
    id: "autogen",
    sectionId: "ecosystem-autogen",
    bookmarkLabel: "AutoGen",
    title: "AutoGen (Conversable Agent Framework)",
    sourceLabel: "microsoft/autogen",
    sourceUrl: "https://github.com/microsoft/autogen",
    imageSrc: autoGenDiagram,
    imageAlt: "AutoGen conversable agent framework diagram",
    happening:
      "The diagram centers on ConversableAgent as the base abstraction and shows three main roles: AssistantAgent, UserProxyAgent, and GroupChatManager. It highlights human input modes such as ALWAYS and NEVER, which define how autonomous each workflow is.",
    why:
      "AutoGen is designed to make autonomy boundaries programmable. It focuses on controlled execution and reproducible multi-agent workflows, not just free-form agent chat.",
    tradeoffs: [
      "Needs more orchestration setup than a single-agent approach.",
      "Enterprise integrations are usually not automatic and may require extra plumbing."
    ],
    goodFor: ["Structured experiments", "Code-execution-heavy workflows", "Deterministic pipelines"]
  },
  {
    id: "google-cloud-agent-engine",
    sectionId: "ecosystem-google-cloud",
    bookmarkLabel: "Google Cloud Agent Engine",
    title: "Google Cloud Agent Engine (Orchestrated Enterprise Agents)",
    sourceLabel: "Google Cloud architecture docs",
    sourceUrl: "https://docs.cloud.google.com/architecture/multiagent-ai-system",
    imageSrc: googleCloudDiagram,
    imageAlt: "Google Cloud multi-agent orchestrated architecture diagram",
    happening:
      "A root orchestrator agent receives the request and delegates work to specialized agents running in separate engines. Communication flows through A2A, MCP, and APIs while each agent can connect to tools and enterprise data systems such as BigQuery and REST services.",
    why:
      "It is built for enterprise constraints: isolation, security boundaries, service-based architecture, and production tool integrations.",
    tradeoffs: [
      "Operational complexity is higher due to multiple services and boundaries.",
      "Strong contract governance is required between orchestration and execution services."
    ],
    goodFor: ["Enterprise workflows", "Data warehouse integration", "Production-grade deployment"]
  },
  {
    id: "google-adk",
    sectionId: "ecosystem-google-adk",
    bookmarkLabel: "Google ADK Agent Types",
    title: "Google ADK Agent Types",
    sourceLabel: "Google ADK docs",
    sourceUrl: "https://google.github.io/adk-docs/agents/multi-agents/",
    imageSrc: googleAdkDiagram,
    imageAlt: "Google ADK agent types hierarchy diagram",
    happening:
      "The hierarchy starts with BaseAgent, then splits into LLM-based agents, workflow agents (sequential, parallel, loop), and custom logic agents. It clearly separates reasoning behavior from control-flow behavior.",
    why:
      "The design acknowledges that LLM reasoning and workflow control are different concerns. By making control-flow explicit, it improves reliability and state management.",
    tradeoffs: [
      "Requires stronger architecture discipline before implementation.",
      "More moving parts means more components to design and test."
    ],
    goodFor: ["Deterministic flows", "Safe loop/parallel composition", "Custom business-logic injection"]
  },
  {
    id: "microsoft-agent-model",
    sectionId: "ecosystem-microsoft-model",
    bookmarkLabel: "Microsoft Agent Model",
    title: "Microsoft Agent Model (Tool-Centric Agent)",
    sourceLabel: "Microsoft Azure AI Agents docs",
    sourceUrl: "https://learn.microsoft.com/en-us/azure/ai-services/agents/overview",
    imageSrc: microsoftDiagram,
    imageAlt: "Microsoft tool-centric agent model diagram",
    happening:
      "The flow is straightforward: input goes to one agent, the agent calls tools, and output comes back. Inside that one agent are instructions, a generative model, and tool connectors, supported by retrieval, actions, and memory.",
    why:
      "It emphasizes a strong single reasoning core with tool augmentation. This keeps architecture lean while still enabling real actions and grounded retrieval.",
    tradeoffs: [
      "Less native support for complex multi-agent coordination patterns.",
      "Very large orchestration needs may require adding another orchestration layer."
    ],
    goodFor: ["Copilot-style assistants", "Interactive task assistants", "Retrieval + action experiences"]
  },
  {
    id: "vertex-grounded-flow",
    sectionId: "ecosystem-vertex-grounded-flow",
    bookmarkLabel: "Vertex Grounded Flow",
    title: "Vertex AI Search Grounded Flow",
    sourceLabel: "Vertex AI grounding docs",
    sourceUrl: "https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-vertex-ai-search",
    imageSrc: vertexDiagram,
    imageAlt: "Vertex AI Search grounded answer architecture diagram",
    happening:
      "A user query is routed through a session service to an LLM, which calls Vertex AI Search against enterprise data stores. Retrieved context comes back to the model, then the model returns a grounded answer with sources.",
    why:
      "This pattern is designed for trust and governance. It reduces unsupported answers by grounding responses in approved enterprise data.",
    tradeoffs: [
      "Answer quality depends heavily on the quality and freshness of indexed data.",
      "Search-and-grounding steps can add latency to responses."
    ],
    goodFor: ["Internal knowledge assistants", "Secure enterprise help bots", "Customer support grounded in source data"]
  }
];

export function HomePage(): JSX.Element {
  const { plainModeEnabled } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navItems = useMemo<NavItem[]>(() => {
    const baseItems: NavItem[] = [
      { id: "intro", label: "Start Here" },
      { id: "mental-model", label: plainModeEnabled ? "AI Agent Basics" : "AI Ecosystems" },
      { id: "releases", label: "Releases" }
    ];

    if (plainModeEnabled) {
      return baseItems;
    }

    const ecosystemItems: NavItem[] = technicalEcosystems.map((ecosystem) => ({
      id: ecosystem.sectionId,
      label: ecosystem.bookmarkLabel,
      level: 1
    }));

    return [
      baseItems[0],
      baseItems[1],
      ...ecosystemItems,
      { id: "single-vs-multi-agents-tech", label: "Single vs Multi-Agent (Tech)", level: 1 },
      baseItems[2]
    ];
  }, [plainModeEnabled]);

  const ids = useMemo(() => navItems.map((item) => item.id), [navItems]);
  const activeId = useActiveSection(ids);

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
              <div className="home-page__simple-agent-stack">
                <p className="home-page__simple-agent-lead">{simpleHomeCopy.mentalModelLead}</p>
                <img
                  className="home-page__simple-agent-image"
                  src={simpleAgentDiagram}
                  alt="Simple diagram showing a single agent versus multiple cooperating agents"
                  loading="lazy"
                />
                <p className="home-page__simple-agent-support">{simpleHomeCopy.mentalModelSupport}</p>

                <div className="home-page__simple-agent-usecases">
                  <h4>Common use cases</h4>
                  <ul>
                    {simpleHomeCopy.mentalModelUseCases.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="home-page__simple-agent-disease">
                  <h4>How this can help with disease-solving</h4>
                  <p>{simpleHomeCopy.mentalModelDiseaseExample}</p>
                </div>
              </div>
            ) : (
              <div className="home-page__ecosystem-stack">
                {technicalEcosystems.map((ecosystem) => (
                  <article className="home-page__ecosystem-card" key={ecosystem.id} id={ecosystem.sectionId}>
                    <div className="home-page__loop-meta">
                      <h3 className="home-page__subheading">{ecosystem.title}</h3>
                      <a href={ecosystem.sourceUrl} target="_blank" rel="noreferrer">
                        {ecosystem.sourceLabel}
                      </a>
                    </div>

                    <img className="home-page__ecosystem-image" src={ecosystem.imageSrc} alt={ecosystem.imageAlt} loading="lazy" />

                    <div className="home-page__walkthrough">
                      <h4>Deep walkthrough</h4>

                      <div className="home-page__walkthrough-block">
                        <h5>What&apos;s happening</h5>
                        <p>{ecosystem.happening}</p>
                      </div>

                      <div className="home-page__walkthrough-block">
                        <h5>Why it&apos;s designed that way</h5>
                        <p>{ecosystem.why}</p>
                      </div>

                      <div className="home-page__walkthrough-block">
                        <h5>What tradeoffs exist</h5>
                        <ul>
                          {ecosystem.tradeoffs.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="home-page__walkthrough-block">
                        <h5>Who this pattern is good for</h5>
                        <ul>
                          {ecosystem.goodFor.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))}

                <article className="home-page__ecosystem-card home-page__ecosystem-card--comparison" id="single-vs-multi-agents-tech">
                  <div className="home-page__loop-meta">
                    <h3 className="home-page__subheading">Single-Agent vs Multi-Agent Systems (Technical)</h3>
                  </div>

                  <div className="home-page__walkthrough">
                    <div className="home-page__walkthrough-block">
                      <h5>Single-agent architecture</h5>
                      <p>
                        One agent owns planning, tool use, and response generation end-to-end. This minimizes coordination overhead,
                        simplifies tracing, and is usually easier to operate in production.
                      </p>
                    </div>

                    <div className="home-page__walkthrough-block">
                      <h5>Multi-agent architecture</h5>
                      <p>
                        A coordinator delegates work to specialist agents (for example, retrieval, analysis, and validation). This improves
                        specialization and parallelism but introduces inter-agent contracts and routing complexity.
                      </p>
                    </div>

                    <div className="home-page__walkthrough-block">
                      <h5>Key technical tradeoffs</h5>
                      <ul>
                        <li>Coordination complexity: low in single-agent, high in multi-agent.</li>
                        <li>Latency and cost: generally lower in single-agent, often higher in multi-agent.</li>
                        <li>Debuggability: simpler traces in single-agent, distributed traces in multi-agent.</li>
                        <li>Specialization: limited in single-agent, stronger role specialization in multi-agent.</li>
                        <li>Fault isolation: coarse in single-agent, better branch isolation in multi-agent.</li>
                      </ul>
                    </div>

                    <div className="home-page__walkthrough-block">
                      <h5>Selection rule</h5>
                      <p>
                        Start with single-agent for most production paths. Move to multi-agent only when specialization, parallel throughput,
                        or independent validation stages become clear bottlenecks.
                      </p>
                    </div>
                  </div>
                </article>
              </div>
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
