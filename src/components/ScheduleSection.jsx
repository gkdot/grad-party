import { useEffect, useRef } from "react";

const events = [
  { 
    time: "4:00 PM", 
    title: "Doors Open", 
    desc: "Guests arrive, snack on appetizers, and mingle. A long, relaxed welcome." 
  },

  { 
    time: "5:30 PM", 
    title: "Dinner Served", 
    desc: "Guests are seated and food is ready to serve. Accompanied by low, vibrant jazz." 
  },

  { 
    time: "6:45 PM", 
    title: "Toasts & Cake", 
    desc: "Heartfelt speeches from family and friends, closing with the graduate. Cake is cut immediately after." 
  },

  { 
    time: "7:15 PM", 
    title: "Traditional Ethiopian Coffee Ceremony", 
    desc: "Fresh coffee is roasted, brewed, and served in a traditional jebena ceremony with incense and conversation. Guests relax, reconnect, and transition into the evening celebration." 
  },

  { 
    time: "7:50 PM", 
    title: "Dessert & Late Bites", 
    desc: "Cake circulates alongside coffee and a light snack spread as guests ease out of dinner mode." 
  },

  { 
    time: "8:05 PM", 
    title: "Dancing Opens", 
    desc: "Music shifts energy and the dance floor opens for the rest of the night." 
  },

  { 
    time: "9:45 PM", 
    title: "Send-Off", 
    desc: "Everyone gets on the floor one final time." 
  },

  { 
    time: "10:00 PM", 
    title: "Farewell", 
    desc: "The evening draws to a close. Safe travels home!" 
  },
];

export default function ScheduleSection() {
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
    <section id="schedule" className="py-40 px-8 md:px-20 max-w-6xl mx-auto" ref={sectionRef}>
      <div className="mb-20">
        <p className="font-sans text-brass tracking-[0.35em] text-xs uppercase mb-4">
          The Evening
        </p>
        <h2
          className="font-serif text-parchment font-light"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "0.04em" }}
        >
          Schedule of Events
        </h2>
        <div style={{ width: "40px", height: "0.5px", backgroundColor: "#CBA35C", marginTop: "24px" }} />
      </div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div
          className="absolute left-24 top-0 bottom-0 hidden md:block"
          style={{ width: "0.5px", backgroundColor: "rgba(203,163,92,0.2)" }}
        />

        <div className="space-y-0">
          {events.map((event, i) => (
            <div
              key={i}
              className="relative flex flex-col md:flex-row gap-6 md:gap-12 py-10"
              style={{ borderBottom: "0.5px solid rgba(203,163,92,0.1)" }}
            >
              {/* Time */}
              <div className="md:w-24 flex-shrink-0">
                <span
                  className="font-sans font-medium"
                  style={{ color: "#CBA35C", fontSize: "13px", letterSpacing: "0.1em" }}
                >
                  {event.time}
                </span>
              </div>

              {/* Dot on timeline */}
              <div
                className="absolute left-24 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full hidden md:block"
                style={{ backgroundColor: "#CBA35C", boxShadow: "0 0 8px rgba(203,163,92,0.4)" }}
              />

              {/* Content */}
              <div className="flex-1 md:pl-8">
                <h3
                  className="font-serif text-parchment font-light mb-2"
                  style={{ fontSize: "1.5rem", letterSpacing: "0.03em" }}
                >
                  {event.title}
                </h3>
                <p className="font-sans text-parchment/50 text-sm leading-relaxed mb-3" style={{ lineHeight: "1.7" }}>
                  {event.desc}
                </p>
                <p className="font-sans text-brass/60 text-xs tracking-widest uppercase">
                  {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}