import { useEffect, useRef } from "react";

export default function DressCodeSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    el.classList.add("fade-in-section");
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="dresscode" className="py-40 px-8 md:px-20 max-w-6xl mx-auto" ref={sectionRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Image */}
        <div className="relative">
          <div
            className="w-full aspect-[3/4] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80')",
              filter: "brightness(0.55) sepia(0.2)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ border: "0.5px solid rgba(203,163,92,0.3)", margin: "12px" }}
          />
        </div>

        {/* Content */}
        <div>
          <p className="font-sans text-brass tracking-[0.35em] text-xs uppercase mb-4">
            Attire
          </p>
          <h2
            className="font-serif text-parchment font-light mb-8"
            style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", letterSpacing: "0.04em" }}
          >
            Cocktail
            <br />
            <em style={{ color: "#CBA35C" }}>Attire</em>
          </h2>

          <div style={{ width: "40px", height: "0.5px", backgroundColor: "#CBA35C", marginBottom: "32px" }} />

          <p
            className="font-sans text-parchment/60 text-sm mb-12"
            style={{ lineHeight: "1.9" }}
          >
            We invite our guests to celebrate with sophistication and ease. Cocktail attire strikes the perfect balance — polished, stylish, and fitting for an evening of refined celebration.
          </p>

          <div className="space-y-8">
            {[
              {
                label: "Gentlemen",
                detail: "Dark suit or blazer with dress trousers. A tie is encouraged but not required. Polished shoes and refined accessories.",
              },
              {
                label: "Ladies",
                detail: "Cocktail dress, elegant midi, or a tailored suit. Knee to midi length preferred. Statement jewelry is welcomed.",
              },
              {
                label: "Palette Guidance",
                detail: "Black, champagne, deep navy, rich jewel tones. Avoid casual wear, distressed fabrics, or overly bright prints.",
              },
            ].map((item, i) => (
              <div key={i} className="border-t pt-6" style={{ borderColor: "rgba(203,163,92,0.15)" }}>
                <p className="font-sans text-brass text-xs tracking-widest uppercase mb-2">
                  {item.label}
                </p>
                <p className="font-sans text-parchment/60 text-sm" style={{ lineHeight: "1.7" }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}