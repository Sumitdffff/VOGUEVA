import { NAV, SITE } from "../data/content.js";

export default function Header({ paused, onToggle }) {
  return (
    <header className="topbar" id="top">
      <a className="logo" href="#top">
        <span className="logo-icon">N</span> {SITE.name}
        <span className="sub">/{SITE.studio}</span>
      </a>
      <nav className="nav" aria-label="Main">
        {NAV.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      <button className="motion-toggle" type="button" onClick={onToggle}>
        {paused ? "▶ RESUME MOTION" : "Ⅱ PAUSE MOTION"}
      </button>
    </header>
  );
}
