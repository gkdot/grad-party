import { useState, useEffect, useRef } from "react";

const faqs = [
  {
    q: "What is the dress code?",
    a: "Cocktail attire is recommended. Traditional cultural dress is warmly celebrated. Please refer to the Attire section for full guidance.",
  },
  {
    q: "What time should I arrive?",
    a: "Please refer to the schedule above for exact timing. We recommend arriving early to allow time for parking, greeting fellow guests, and being seated comfortably before the celebration begins.",
  },
  {
    q: "Is there parking available?",
    a: "Yes. The Banquet Hall offers a large self-park lot adjacent to the venue. There is other parking for overflow nearby, if needed. We recommend arriving early if you want to secure parking close to the entrance.",
  },
  {
    q: "Can I bring a plus one?",
    a: "Yes. When filling out the RSVP form, simply indicate that you\'ll be bringing a guest and provide their name(s).",
  },
  {
    q: "Will there be accommodations for dietary restrictions?",
    a: "Yes, we\'re happy to accommodate vegetarian, vegan, and gluten-free options. Please indicate your dietary requirements on the RSVP form and reach out as well if this is a medical necessity.",
  },
  {
    q: "Will there be music and dancing?",
    a: "Yes! the evening will feature a curated playlist to celebrate this milestone. Dancing is absolutely encouraged and we hope you will join us on the floor.",
  },
  {
    q: "When is the RSVP deadline?",
    a: "We kindly request your confirmation no later than May 16th, 2026, so that we may finalize arrangements promptly.",
  },
  {
    q: "Where is the event being held?",
    a: "The celebration will take place at The BVFRD Banquet Hall, 9501 Old Burke Lake Road.",
  },
  {
    q: "Is the venue accessible?",
    a: "Yes. The Banquet Hall is fully handicapped accessible as a single-story, ground-level facility with easy entrance and accessible bathrooms.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);
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
    <section id="faq" className="py-40 px-8 md:px-20 max-w-4xl mx-auto" ref={sectionRef}>
      <div className="mb-20">
        <p className="font-sans text-brass tracking-[0.35em] text-xs uppercase mb-4">
          Enquiries
        </p>
        <h2
          className="font-serif text-parchment font-light"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "0.04em" }}
        >
          Frequently Asked
        </h2>
        <div style={{ width: "40px", height: "0.5px", backgroundColor: "#CBA35C", marginTop: "24px" }} />
      </div>

      <div className="space-y-0">
        {faqs.map((faq, i) => (
          <div
            key={i}
            style={{ borderBottom: "0.5px solid rgba(203,163,92,0.15)" }}
          >
            <button
              className="w-full text-left py-7 flex items-center justify-between gap-6 group"
              onClick={() => setOpen(open === i ? null : i)}
              data-cursor-expand
            >
              <span
                className="font-serif text-parchment group-hover:text-brass transition-colors duration-300"
                style={{ fontSize: "1.15rem", fontWeight: 300, letterSpacing: "0.02em" }}
              >
                {faq.q}
              </span>
              <span
                className="flex-shrink-0 transition-transform duration-300"
                style={{
                  color: "#CBA35C",
                  fontSize: "18px",
                  transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </button>

            <div
              style={{
                overflow: "hidden",
                maxHeight: open === i ? "200px" : "0",
                transition: "max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <p
                className="font-sans text-parchment/55 text-sm pb-7"
                style={{ lineHeight: "1.9" }}
              >
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}