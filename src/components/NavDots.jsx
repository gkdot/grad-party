import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Welcome" },
  { id: "schedule", label: "Schedule" },
  { id: "menu", label: "Menu" },
  { id: "dresscode", label: "Dress Code" },
  { id: "faq", label: "FAQ" },
  { id: "rsvp", label: "RSVP" },
];

export default function NavDots() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="nav-dot group"
          data-cursor-expand
        >
          <span className="nav-dot-label">{label}</span>
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width: active === id ? "8px" : "4px",
              height: active === id ? "8px" : "4px",
              backgroundColor: active === id ? "#CBA35C" : "rgba(203,163,92,0.4)",
              boxShadow: active === id ? "0 0 8px rgba(203,163,92,0.6)" : "none",
            }}
          />
        </button>
      ))}
    </nav>
  );
}