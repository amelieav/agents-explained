import { Link } from "react-router-dom";
import { SectionShell } from "../components/SectionShell/SectionShell";
import {
  comparisonPageCopy,
  frameworkFit,
  frameworkTableCopy,
  homeSectionCopy,
  mcpCopy,
  similarTermsComparisons
} from "../content/copy";
import "./ComparisonsPage.css";

export function ComparisonsPage(): JSX.Element {
  return (
    <main className="comparisons-page">
      <div className="comparisons-page__container">
        <header className="comparisons-page__header">
          <p>{comparisonPageCopy.eyebrow}</p>
          <h1>{comparisonPageCopy.title}</h1>
          <p>{comparisonPageCopy.subtitle}</p>
          <div className="comparisons-page__links">
            <Link to="/">{comparisonPageCopy.backLabel}</Link>
            <Link to="/decision-lab">{comparisonPageCopy.labLabel}</Link>
            <Link to="/glossary">{comparisonPageCopy.glossaryLabel}</Link>
          </div>
        </header>

        <SectionShell id="framework-fit" title={homeSectionCopy.framework.title} summary={homeSectionCopy.framework.summary}>
          <div className="comparisons-page__table-wrap">
            <table className="comparisons-page__table">
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
          <div className="comparisons-page__card-grid">
            {mcpCopy.cards.map((card) => (
              <article className="comparisons-page__card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
          <article className="comparisons-page__decision-card">
            <h3>{comparisonPageCopy.mcpDecisionTitle}</h3>
            <ul>
              {comparisonPageCopy.mcpDecisionPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </SectionShell>

        <SectionShell
          id="similar-terms"
          title={comparisonPageCopy.similarTermsTitle}
          summary={comparisonPageCopy.similarTermsSummary}
        >
          <div className="comparisons-page__table-wrap">
            <table className="comparisons-page__table comparisons-page__table--similar">
              <thead>
                <tr>
                  <th>{comparisonPageCopy.similarTermsColumns.terms}</th>
                  <th>{comparisonPageCopy.similarTermsColumns.difference}</th>
                  <th>{comparisonPageCopy.similarTermsColumns.chooseRule}</th>
                </tr>
              </thead>
              <tbody>
                {similarTermsComparisons.map((item) => (
                  <tr key={`${item.leftTerm}-${item.rightTerm}`}>
                    <td>
                      <p className="comparisons-page__pair-title">
                        {item.leftTerm} vs {item.rightTerm}
                      </p>
                      <p>
                        <strong>{item.leftTerm}:</strong> {item.leftIs}
                      </p>
                      <p>
                        <strong>{item.rightTerm}:</strong> {item.rightIs}
                      </p>
                    </td>
                    <td>
                      <p>{item.keyDifference}</p>
                      <p className="comparisons-page__example">
                        <strong>Example:</strong> {item.example}
                      </p>
                    </td>
                    <td>{item.chooseRule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionShell>
      </div>
    </main>
  );
}
