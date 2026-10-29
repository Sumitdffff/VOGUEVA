export default function SectionHead({ eyebrow, children }) {
  return (
    <div className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{children}</h2>
    </div>
  );
}
