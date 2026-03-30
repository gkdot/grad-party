import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TARGET_DATE = new Date('2026-05-23T16:00:00');

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  function getTimeLeft() {
    const diff = TARGET_DATE.getTime() - new Date().getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);
  return timeLeft;
}

const OrnamentalDivider = () => (
  <div className="flex items-center justify-center gap-4 my-8">
    <div className="h-px w-24 bg-accent/30" />
    <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="text-accent/50">
      <path d="M20 2 C14 2 8 8 8 10 C8 12 14 18 20 18 C26 18 32 12 32 10 C32 8 26 2 20 2Z" stroke="currentColor" strokeWidth="0.8" fill="none"/>
      <path d="M2 10 Q8 5 14 10 Q20 15 26 10 Q32 5 38 10" stroke="currentColor" strokeWidth="0.8" fill="none"/>
      <circle cx="20" cy="10" r="2" fill="currentColor" opacity="0.5"/>
    </svg>
    <div className="h-px w-24 bg-accent/30" />
  </div>
);

export default function Hero() {
  const countdown = useCountdown();

  return (
    <section id="home" className="bg-white pt-16 pb-0">
      {/* Ornamental header image */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex justify-center px-6 mb-10"
      >
        <img
          src="./celebration.png"
          alt="Celebration"
          className="max-w-xl object-scale-down"
        />
      </motion.div>

      {/* Title Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="text-center px-6 pb-16"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-6">
          Please Join Us to Celebrate
        </p>

        <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-[0.12em] uppercase text-foreground leading-none mb-4">
          Gigi's Graduation
        </h1>
        <h2 className="font-display text-2xl md:text-3xl font-light italic text-accent mb-6">
          Class of 2026
        </h2>

        <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2">
          May 23, 2026 · The BVFRD Banquet Hall · 4:00 PM
        </p>

        <OrnamentalDivider />

        {/* Countdown */}
        <div className="flex justify-center gap-8 md:gap-16">
          {[
            { value: countdown.days, label: 'Days' },
            { value: countdown.hours, label: 'Hours' },
            { value: countdown.minutes, label: 'Minutes' },
            { value: countdown.seconds, label: 'Seconds' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-display text-4xl md:text-5xl font-light text-accent">
                {String(item.value).padStart(2, '0')}
              </p>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="#rsvp"
            onClick={(e) => { e.preventDefault(); document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-block font-body text-xs tracking-[0.25em] uppercase text-accent border border-accent/40 px-10 py-3 hover:bg-accent hover:text-white transition-all duration-300"
          >
            RSVP
          </a>
        </div>
      </motion.div>
    </section>
  );
}