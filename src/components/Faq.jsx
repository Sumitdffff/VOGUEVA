import { useState } from "react";
import SectionHead from "./SectionHead.jsx";
import { useReveal } from "../useReveal.js";
import { FAQ } from "../data/content.js";

export default function Faq() {
  const ref = useReveal();
  const [open, setOpen] = useState(0);
  return (
    <section className="section reveal" id="faq" ref={ref}>
      <SectionHead eyebrow="QUESTIONS">
        Good to <em>know.</em>
      </SectionHead>
      <div className="faq">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className={`faq-item${isOpen ? " open" : ""}`}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </button>
              <div className="faq-a">
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
