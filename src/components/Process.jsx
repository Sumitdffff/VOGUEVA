import SectionHead from "./SectionHead.jsx";
import { useReveal } from "../useReveal.js";
import { PROCESS } from "../data/content.js";

export default function Process() {
  const ref = useReveal();
  return (
    <section className="section reveal" id="process" ref={ref}>
      <SectionHead eyebrow="HOW IT WORKS">
        From first message <em>to final frame.</em>
      </SectionHead>
      <ol className="steps">
        {PROCESS.map((s, i) => (
          <li key={s.title}>
            <span className="step-no">{String(i + 1).padStart(2, "0")}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
