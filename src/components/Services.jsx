import SectionHead from "./SectionHead.jsx";
import { useReveal } from "../useReveal.js";
import { SERVICES } from "../data/content.js";

export default function Services() {
  const ref = useReveal();
  return (
    <section className="section reveal" id="services" ref={ref}>
      <SectionHead eyebrow="SERVICES">
        What I can <em>shoot for you.</em>
      </SectionHead>
      <div className="services">
        {SERVICES.map((s) => (
          <article key={s.name} className="service">
            <h3>{s.name}</h3>
            <p>{s.text}</p>
            <ul>
              {s.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
