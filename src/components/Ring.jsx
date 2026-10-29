import { useEffect, useRef } from "react";

const AUTO_SPEED = 0.055; // degrees per frame when drifting on its own
const STEP = 45;          // degrees turned by one arrow click

export default function Ring({ photos, paused, onOpen }) {
  const ringRef = useRef(null);
  const stageRef = useRef(null);

  // Motion state lives in refs so the animation never re-renders React.
  const rotation = useRef(0);
  const velocity = useRef(AUTO_SPEED);
  const dragging = useRef(false);
  const startX = useRef(0);
  const lastX = useRef(0);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const draw = () => {
    if (ringRef.current) {
      ringRef.current.style.transform = `rotateY(${rotation.current}deg)`;
    }
  };

  useEffect(() => {
    let raf;
    const tick = () => {
      if (!pausedRef.current && !dragging.current) {
        rotation.current += velocity.current;
        draw();
      }
      raf = requestAnimationFrame(tick);
    };
    draw();
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const rotateBy = (amount) => {
    rotation.current += amount;
    draw();
  };

  const onPointerDown = (e) => {
    if (e.target.closest(".photo-card")) return; // clicks on photos open the viewer
    dragging.current = true;
    startX.current = e.clientX;
    lastX.current = e.clientX;
    stageRef.current.classList.add("dragging");
    stageRef.current.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const delta = e.clientX - lastX.current;
    rotation.current += delta * 0.45;
    velocity.current = Math.max(-0.45, Math.min(0.45, delta * 0.012));
    lastX.current = e.clientX;
    draw();
  };
  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    stageRef.current.classList.remove("dragging");
    if (Math.abs(lastX.current - startX.current) < 5) velocity.current = AUTO_SPEED;
  };

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className="experience" aria-label="360 degree rotating photo gallery">
      <div className="orbit-glow" />
      <div
        className="gallery-stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
      >
        <div className="ring" ref={ringRef}>
          {photos.map((p, i) => (
            <button
              key={p.title}
              className="photo-card"
              style={{ "--i": i }}
              onClick={() => onOpen(i)}
            >
              <img src={p.src} alt={p.alt} draggable={false} />
              <span className="card-shade" />
              <span className="card-info">
                <small>
                  {pad(i + 1)} / {p.type}
                </small>
                <b>{p.title}</b>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="controls">
        <button className="arrow" aria-label="Rotate gallery left" onClick={() => rotateBy(-STEP)}>
          ←
        </button>
        <div className="control-copy">
          <span className="control-line" />
          <span>DRAG TO ROTATE · 360° VIEW</span>
          <span className="control-line" />
        </div>
        <button className="arrow" aria-label="Rotate gallery right" onClick={() => rotateBy(STEP)}>
          →
        </button>
      </div>
      <p className="hint">CLICK ANY PHOTO TO VIEW IT FULL SIZE</p>
    </section>
  );
}
