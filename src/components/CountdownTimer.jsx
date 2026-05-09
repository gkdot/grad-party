import { useState, useEffect } from "react";

// Event date: Saturday, May 23, 2026 at 4:00 PM
const EVENT_DATE = new Date("2026-05-23T16:00:00");

function pad(n) {
  return String(n).padStart(2, "0");
}

function getTimeLeft() {
  const now = new Date();
  const diff = EVENT_DATE - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const Unit = ({ value, label }) => (
  <div className="flex flex-col items-center gap-2">
    <span
      className="font-serif text-parchment tabular-nums"
      style={{
        fontSize: "clamp(1.8rem, 4vw, 3rem)",
        fontWeight: 300,
        letterSpacing: "0.06em",
        lineHeight: 1,
        color: "#F2EFE9",
      }}
    >
      {pad(value)}
    </span>
    <span
      className="font-sans uppercase tracking-[0.25em]"
      style={{ fontSize: "8px", color: "rgba(203,163,92,0.6)" }}
    >
      {label}
    </span>
  </div>
);

const Separator = () => (
  <span
    className="font-serif text-parchment/20 self-start"
    style={{ fontSize: "1.5rem", fontWeight: 300, marginTop: "2px" }}
  >
    :
  </span>
);

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return (
      <div
        className="flex items-center justify-center px-8 py-4"
        style={{ border: "0.5px solid rgba(203,163,92,0.2)" }}
      >
        <p
          className="font-sans text-brass tracking-[0.3em] text-xs uppercase"
        >
          The Evening Has Arrived
        </p>
      </div>
    );
  }

  return (
    <div
      className="inline-flex flex-col items-center gap-4 px-8 py-6"
      style={{ border: "0.5px solid rgba(203,163,92,0.18)" }}
    >
      <p
        className="font-sans uppercase tracking-[0.3em]"
        style={{ fontSize: "8px", color: "rgba(203,163,92,0.5)" }}
      >
        Commences In
      </p>
      <div className="flex items-center gap-4">
        <Unit value={timeLeft.days} label="Days" />
        <Separator />
        <Unit value={timeLeft.hours} label="Hours" />
        <Separator />
        <Unit value={timeLeft.minutes} label="Min" />
        <Separator />
        <Unit value={timeLeft.seconds} label="Sec" />
      </div>
    </div>
  );
}