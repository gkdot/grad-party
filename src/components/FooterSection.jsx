export default function FooterSection() {
  return (
    <footer
      className="py-24 px-8 text-center relative overflow-hidden"
      style={{ borderTop: "0.5px solid rgba(203,163,92,0.2)" }}
    >
      <h2
        className="font-serif text-parchment/10 select-none"
        style={{
          fontSize: "clamp(5rem, 18vw, 16rem)",
          fontWeight: 300,
          letterSpacing: "0.04em",
          lineHeight: 0.9,
          userSelect: "none",
        }}
      >
        Thank You
      </h2>
      <div className="mt-8">
        <p className="font-sans text-parchment/30 tracking-[0.4em] text-xs uppercase">
          Gigi Kuffa's Graduation · May 23rd, 2026
        </p>
      </div>
    </footer>
  );
}