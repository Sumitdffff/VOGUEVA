import { useMemo, useState } from "react";
import SectionHead from "./SectionHead.jsx";
import { useReveal } from "../useReveal.js";

export default function Work({ photos, onOpen }) {
  const ref = useReveal();
  const [filter, setFilter] = useState("ALL");
  const types = useMemo(() => ["ALL", ...new Set(photos.map((p) => p.type))], [photos]);
  const shown = photos
    .map((p, i) => ({ ...p, i }))
    .filter((p) => filter === "ALL" || p.type === filter);

  return (
    <section className="section reveal" id="work" ref={ref}>
      <SectionHead eyebrow="SELECTED WORK">
        Frames worth <em>staying with.</em>
      </SectionHead>

      <div className="filters" role="tablist" aria-label="Filter by category">
        {types.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={filter === t}
            className={`chip${filter === t ? " active" : ""}`}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="work-grid">
        {shown.map((p) => (
          <button
            key={p.title}
            type="button"
            className={`work-card tall-${p.i % 3}`}
            onClick={() => onOpen(p.i)}
          >
            <img src={p.src} alt={p.alt} loading="lazy" draggable={false} />
            <span className="card-shade" />
            <span className="card-info">
              <small>{p.type}</small>
              <b>{p.title}</b>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
