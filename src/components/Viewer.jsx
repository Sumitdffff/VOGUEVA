import { useEffect, useRef } from "react";

const mod = (a, n) => ((a % n) + n) % n;

export default function Viewer({ photos, index, onChange, onClose }) {
  const open = index !== null;
  const n = photos.length;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (!open) return;
      if (e.key === "ArrowLeft") onChange(mod(index - 1, n));
      if (e.key === "ArrowRight") onChange(mod(index + 1, n));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, index, n, onChange, onClose]);

  // Keep showing the last photo while the viewer fades out.
  const last = useRef(null);
  if (open) last.current = index;
  const photo = last.current === null ? null : photos[last.current];

  return (
    <div
      className={`viewer${open ? " open" : ""}`}
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className="viewer-close" aria-label="Close" onClick={onClose}>
        ×
      </button>
      <button
        id="viewerPrev"
        className="viewer-arrow"
        aria-label="Previous photo"
        onClick={() => onChange(mod(index - 1, n))}
      >
        ←
      </button>
      <img
        src={photo ? photo.src.replace(/w=\d+/, "w=1600") : undefined}
        alt={photo ? photo.alt : ""}
      />
      <div className="viewer-caption">
        {photo ? `${photo.type}  /  ${photo.title}` : ""}
      </div>
      <button
        id="viewerNext"
        className="viewer-arrow"
        aria-label="Next photo"
        onClick={() => onChange(mod(index + 1, n))}
      >
        →
      </button>
    </div>
  );
}
