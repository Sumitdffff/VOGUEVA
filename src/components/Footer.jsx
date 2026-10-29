import { NAV, SITE } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wordmark" aria-hidden="true">NOIR</div>
      <div className="footer-cols">
        <div>
          <h4>EXPLORE</h4>
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>FOLLOW</h4>
          <ul>
            {SITE.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href}>{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>SAY HELLO</h4>
          <ul>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
          </ul>
        </div>
        <a className="to-top" href="#top">BACK TO TOP ↑</a>
      </div>
      <div className="footer-base">
        <span>NOIR/STUDIO</span>
        <span>AN EXPERIMENT IN MOTION</span>
        <span>© {new Date().getFullYear()} {SITE.name}. ALL RIGHTS RESERVED.</span>
      </div>
    </footer>
  );
}
