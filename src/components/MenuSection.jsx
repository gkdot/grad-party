import { useEffect, useRef } from "react";

const courses = [
  {
    course: "To Start",
    title: "Starters",
    items: [
      "Salad",
      "ሳምቡሳ (Sambusa) — spiced lentil pastry",
      "አይብ (Ayib) — homemade cheese",
    ],
  },
  {
    course: "Mains",
    title: "From the Homeland",
    items: [
      "ዶሮ ወጥ (Doro Wat) — spiced chicken stew",
      "ስጋ ወጥ (Siga Wat) — spiced beef stew",
      "አልጫ ወጥ (Alicha Wat) — mild beef with turmeric",
      "ጥብስ (Tibs) — roasted beef",
      "ክትፎ (Kitfo) — ground beef with spiced butter",
      "ጥሬ ስጋ (Tire Siga) — raw beef (if available)",
    ],
  },
  {
    course: "Also Served",
    title: "Additional Dishes",
    items: [
      "Rice with chicken",
      "Lasagna (×2)",
    ],
  },
  {
    course: "Accompaniments",
    title: "On the Side",
    items: [
      "ጎመን (Gomen) — cooked collard greens",
      "እንጀራ (Injera) — Ethiopian flatbread",
      "ዳቦ (Dabo) — bread",
    ],
  },
];

export default function MenuSection() {
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
    <section
      id="menu"
      className="py-40 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background image strip */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80')",
          filter: "brightness(0.12)",
        }}
      />

      <div className="relative z-10 px-8 md:px-20 max-w-6xl mx-auto">
        <div className="mb-20">
          <p className="font-sans text-brass tracking-[0.35em] text-xs uppercase mb-4">
            Culinary Programme
          </p>
          <h2
            className="font-serif text-parchment font-light"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "0.04em" }}
          >
            The Menu
          </h2>
          <div style={{ width: "40px", height: "0.5px", backgroundColor: "#CBA35C", marginTop: "24px" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {courses.map((course, i) => (
            <div
              key={i}
              className="p-8"
              style={{ border: "0.5px solid rgba(203,163,92,0.2)" }}
            >
              <p className="font-sans text-brass/50 tracking-[0.3em] text-xs uppercase mb-3">
                {course.course}
              </p>
              <h3
                className="font-serif text-parchment font-light mb-6"
                style={{ fontSize: "1.75rem" }}
              >
                {course.title}
              </h3>
              <ul className="space-y-3">
                {course.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span style={{ color: "#CBA35C", fontSize: "10px", marginTop: "6px" }}>◆</span>
                    <span
                      className="font-sans text-parchment/60 text-sm"
                      style={{ lineHeight: "1.7" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-16 p-8"
          style={{ border: "0.5px solid rgba(203,163,92,0.15)", backgroundColor: "rgba(203,163,92,0.04)" }}
        >
          <p className="font-sans text-parchment/40 text-xs tracking-widest uppercase mb-2">
            Please Note
          </p>
          <p className="font-sans text-parchment/60 text-sm" style={{ lineHeight: "1.7" }}>
            Dietary accommodations are available. When completing your RSVP, please note any allergies or dietary preferences.
          </p>
        </div>
      </div>
    </section>
  );
}