import { useState } from "react";
import SectionHead from "./SectionHead.jsx";
import { useReveal } from "../useReveal.js";
import { SITE } from "../data/content.js";

const TYPES = ["Portrait", "Editorial", "Travel & Landscape", "Brand Stories", "Something else"];

export default function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", email: "", type: TYPES[0], message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  // Opens the visitor's email app with the message filled in.
  // To send from the page itself, swap this for a form service such as Formspree.
  const onSubmit = (e) => {
    e.preventDefault();
    const subject = `${form.type} enquiry from ${form.name}`;
    const body = `${form.message}\n\n${form.name}\n${form.email}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="section reveal" id="contact" ref={ref}>
      <SectionHead eyebrow="CONTACT">
        Let's make something <em>worth keeping.</em>
      </SectionHead>
      <div className="contact">
        <div className="contact-info">
          <p>Tell me about the idea, the date and the place. I'll reply with availability and a short plan.</p>
          <a className="contact-mail" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          <ul className="socials">
            {SITE.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href}>{s.label} ↗</a>
              </li>
            ))}
          </ul>
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          <label htmlFor="c-name">NAME</label>
          <input id="c-name" required value={form.name} onChange={set("name")} autoComplete="name" />

          <label htmlFor="c-email">EMAIL</label>
          <input id="c-email" type="email" required value={form.email} onChange={set("email")} autoComplete="email" />

          <label htmlFor="c-type">WHAT ARE YOU AFTER?</label>
          <select id="c-type" value={form.type} onChange={set("type")}>
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <label htmlFor="c-msg">MESSAGE</label>
          <textarea id="c-msg" rows={5} required value={form.message} onChange={set("message")} />

          <button type="submit" className="cta">
            SEND BY EMAIL <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>
    </section>
  );
}
