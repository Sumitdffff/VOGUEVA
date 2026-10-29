import SectionHead from "./SectionHead.jsx";
import { useReveal } from "../useReveal.js";
import { ABOUT } from "../data/content.js";

export default function About({ photos }) {
  const ref = useReveal();
  const categories = new Set(photos.map((p) => p.type)).size;
  const stats = [
    { value: String(photos.length).padStart(2, "0"), label: "SERIES IN THIS GALLERY" },
    { value: String(categories).padStart(2, "0"), label: "KINDS OF PICTURE" },
    { value: "2026", label: "NOW BOOKING" },
  ];

  return (
    <section className="section reveal" id="about" ref={ref}>
      <SectionHead eyebrow="ABOUT">{ABOUT.heading}</SectionHead>
      <div className="about-body">
        <div className="about-text">
          {ABOUT.paragraphs.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
        <dl className="stats">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
