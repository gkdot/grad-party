import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [expanded, setExpanded] = useState(false);
  const isMobile = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  if (isMobile) return null;

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const expand = () => setExpanded(true);
    const shrink = () => setExpanded(false);

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-cursor-expand]").forEach((el) => {
      el.addEventListener("mouseenter", expand);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${expanded ? "expanded" : ""}`}
      style={{ left: pos.x, top: pos.y }}
    />
  );
}