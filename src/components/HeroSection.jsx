import { useEffect, useRef } from "react";
import CountdownTimer from "@/components/CountdownTimer";

export default function HeroSection() {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("track-in");
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex flex-col"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-right"
        style={{
          backgroundImage: "url('/hero.jpg')",
            // "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80')",
          filter: "brightness(0.35)",
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian/80" />

      {/* Hairline border frame */}
      <div
        className="absolute inset-8 pointer-events-none"
        style={{ border: "0.5px solid rgba(203,163,92,0.25)" }}
      />

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
      <div className="relative z-10 text-center px-8 max-w-4xl">
        <p
          className="font-sans text-brass tracking-[0.4em] text-xs uppercase mb-8"
          style={{ letterSpacing: "0.4em" }}
        >
          You are cordially invited to celebrate
        </p>

        <h1
          ref={titleRef}
          className="font-serif text-parchment mb-6"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "0.06em",
          }}
        >
          Gigi Kuffa's
          <br />
          <em style={{ color: "#CBA35C" }}>Graduation</em>
        </h1>

        <p
          className="font-sans text-parchment/60 tracking-[0.3em] text-xs uppercase mb-4"
        >
          Class of 2026 · Commencement Celebration
        </p>

        <div
          className="mx-auto my-8"
          style={{ width: "60px", height: "0.5px", backgroundColor: "#CBA35C" }}
        />

        <p className="font-serif text-parchment/70 text-xl font-light italic">
          Saturday, May 23rd at 4:00 in the Afternoon 
        </p>
        <p className="font-serif text-parchment/70 text-xl font-light italic mb-10">
          The BVFRD Banuqet Hall, 9501 Old Burke Lake Road
        </p>

        <CountdownTimer />

        <div className="mt-10">
          <a
            href="#rsvp"
            data-cursor-expand
            style={{
              background: "transparent",
              border: "0.5px solid #CBA35C",
              color: "#CBA35C",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              padding: "14px 36px",
              display: "inline-block",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#CBA35C";
              e.currentTarget.style.color = "#0A0A0B";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#CBA35C";
            }}
          >
            RSVP Now
          </a>
        </div>
      </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex flex-col items-center gap-3 pb-12">
        <span className="font-sans text-parchment/40 tracking-[0.25em] text-[10px] uppercase">
          Or Scroll
        </span>
        <div className="pulse-slow">
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <path
              d="M8 0v20M1 13l7 7 7-7"
              stroke="#CBA35C"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}