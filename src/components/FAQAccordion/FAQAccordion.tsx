import { classNames } from "../../utils/classNames";
import { faqAccordionVariantClass } from "./variants";
import { FAQAccordionProps } from "./types";
import "./FAQAccordion.css";

export function FAQAccordion({ items, variant = "default", className }: FAQAccordionProps): JSX.Element {
  return (
    <div className={classNames("faq-accordion", faqAccordionVariantClass[variant], className)}>
      {items.map((item) => (
        <details key={item.id} className="faq-accordion__item">
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
