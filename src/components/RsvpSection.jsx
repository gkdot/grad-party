import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { rsvpAPI } from "@/api/firestore";

export default function RsvpSection() {
  const [form, setForm] = useState({ name: "", email: "", guests: "1", dietary: "", location: "", message: "" });
  const [plusOneNames, setPlusOneNames] = useState(/** @type {string[]} */ ([]));
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    await rsvpAPI.create({
      name: form.name,
      email: form.email,
      guests: parseInt(form.guests) || 1,
      plusOneNames: plusOneNames.filter(Boolean),
      dietary: form.dietary,
      location: form.location,
      message: form.message,
      attending: true,
    });

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { to_name: form.name, to_email: form.email, guests: form.guests, dietary: form.dietary },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    ).catch(() => {});

    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle = {
    background: "transparent",
    border: "none",
    borderBottom: "0.5px solid rgba(203,163,92,0.5)",
    color: "#F2EFE9",
    padding: "14px 0",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "14px",
    letterSpacing: "0.05em",
    width: "100%",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  const labelStyle = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "10px",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "rgba(203,163,92,0.7)",
    display: "block",
    marginBottom: "4px",
  };

  return (
    <section
      id="rsvp"
      className="min-h-screen py-40 px-8 md:px-20 flex items-center relative"
      ref={sectionRef}
    >
      {/* Subtle bg */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(203,163,92,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto w-full">
        {!submitted ? (
          <>
            <div className="mb-16 text-center">
              <p className="font-sans text-brass tracking-[0.35em] text-xs uppercase mb-4">
                Confirm Your Attendance
              </p>
              <h2
                className="font-serif text-parchment font-light"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "0.04em" }}
              >
                RSVP
              </h2>
              <p className="font-sans text-brass tracking-[0.35em] text-xs uppercase mt-4 mb-12">
                By May 16th, 2026
              </p>
              <div style={{ width: "40px", height: "0.5px", backgroundColor: "#CBA35C", margin: "24px auto 0" }} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    style={inputStyle}
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input
                    style={inputStyle}
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label style={labelStyle}>Attending</label>
                  <select
                    style={{ ...inputStyle, cursor: "pointer" }}
                    value={form.guests}
                    onChange={(e) => {
                      const count = parseInt(e.target.value);
                      setForm({ ...form, guests: e.target.value });
                      setPlusOneNames((prev) => {
                        const next = [...prev];
                        next.length = count - 1;
                        return next.fill("", prev.length, count - 1);
                      });
                    }}
                  >
                    {[["1", "Just Me"], ["2", "Me + 1"], ["3", "Me + 2"], ["4", "Me + 3"]].map(([val, label]) => (
                      <option key={val} value={val} style={{ backgroundColor: "#0A0A0B", color: "#F2EFE9" }}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Dietary Requirements</label>
                  <input
                    style={inputStyle}
                    placeholder="Vegetarian, allergies, etc."
                    value={form.dietary}
                    onChange={(e) => setForm({ ...form, dietary: e.target.value })}
                  />
                </div>
              </div>

              {plusOneNames.length > 0 && (
                <div className="space-y-10">
                  {plusOneNames.map((name, i) => (
                    <div key={i}>
                      <label style={labelStyle}>Guest {i + 2} Name</label>
                      <input
                        style={inputStyle}
                        placeholder={`Plus one name`}
                        value={name}
                        onChange={(e) => {
                          const next = [...plusOneNames];
                          next[i] = e.target.value;
                          setPlusOneNames(next);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div>
                <label style={labelStyle}>Where are you coming from?</label>
                <input
                  style={inputStyle}
                  placeholder="City, state, or country"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>

              <div>
                <label style={labelStyle}>A Message to the Graduate</label>
                <textarea
                  style={{
                    ...inputStyle,
                    borderBottom: "none",
                    border: "0.5px solid rgba(203,163,92,0.3)",
                    padding: "16px",
                    resize: "none",
                    minHeight: "100px",
                  }}
                  placeholder="Share your congratulations or a memory..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              {error && (
                <p className="font-sans text-red-400 text-xs tracking-widest uppercase text-center">
                  {error}
                </p>
              )}

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  data-cursor-expand
                  style={{
                    background: "transparent",
                    border: "0.5px solid #CBA35C",
                    color: "#CBA35C",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    padding: "18px 48px",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.5 : 1,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#CBA35C";
                    e.target.style.color = "#0A0A0B";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#CBA35C";
                  }}
                >
                  {loading ? "Confirming..." : "Confirm Attendance"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="certificate-reveal text-center" style={{ border: "0.5px solid rgba(203,163,92,0.35)", padding: "60px 40px" }}>
            <p className="font-sans text-brass tracking-[0.4em] text-xs uppercase mb-8">
              Certificate of Attendance
            </p>
            <h2
              className="font-serif text-parchment font-light mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "0.04em" }}
            >
              Your place has been
              <br />
              <em style={{ color: "#CBA35C" }}>confirmed.</em>
            </h2>
            <div style={{ width: "40px", height: "0.5px", backgroundColor: "#CBA35C", margin: "0 auto 32px" }} />
            <p className="font-sans text-parchment/55 text-sm mb-10" style={{ lineHeight: "1.9" }}>
              Dear {form.name}, we are honored to reserve your seat.<br />
              A confirmation has been sent to {form.email}.
            </p>
            <div
              className="inline-block px-6 py-3"
              style={{ border: "0.5px solid rgba(203,163,92,0.2)" }}
            >
              <p className="font-sans text-parchment/40 text-xs tracking-widest uppercase">
                Saturday · May 23rd · 4:00 PM
              </p>
            </div>
            <p className="font-sans text-parchment/25 text-xs mt-12 tracking-[0.2em]">
              GIGI KUFFA'S GRADUATION · CLASS OF 2026
            </p>
          </div>
        )}
      </div>
    </section>
  );
}