import { useState, useEffect, useRef } from "react";

const faqs = [
  {
    q: "Is this event open to plus-ones?",
    a: "Each invited guest is welcome to bring one additional companion. Please indicate the total number of attendees in your RSVP so we may prepare accordingly.",
  },
  {
    q: "Where is the event being held?",
    a: "The celebration will take place at The Grand Hall, 1 University Avenue. Valet parking will be available from 5:00 PM. Rideshare drop-off is at the East Entrance.",
  },
  {
    q: "What is the RSVP deadline?",
    a: "We kindly request your confirmation no later than May 31st, 2025, so that we may finalize arrangements with our catering team.",
  },
  {
    q: "Will there be a vegetarian or vegan option?",
    a: "Absolutely. Our culinary team has prepared thoughtful alternatives for all dietary needs. Please indicate your requirements in the RSVP form.",
  },
  {
    q: "Is the venue accessible?",
    a: "Yes. The Grand Hall is fully accessible, with dedicated parking, elevator access, and staff on hand to assist guests with mobility needs.",
  },
  {
    q: "Can I bring children?",
    a: "This is an intimate adult evening celebration. We ask that arrangements be made for children, so that all guests may enjoy the evening fully.",
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