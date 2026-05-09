import { useLocation } from 'react-router-dom';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "#0A0A0B" }}>
      <div className="text-center" style={{ border: "0.5px solid rgba(203,163,92,0.3)", padding: "60px 80px" }}>
        <p className="font-sans tracking-[0.35em] text-xs uppercase mb-4" style={{ color: "#CBA35C" }}>
          404
        </p>
        <p className="font-sans tracking-[0.2em] text-xs uppercase mb-2" style={{ color: "rgba(242,239,233,0.3)" }}>
          Page not found
        </p>
        {pageName && (
          <p style={{ color: "rgba(242,239,233,0.2)", fontSize: "11px", letterSpacing: "0.1em", marginBottom: "32px" }}>
            "{pageName}" does not exist
          </p>
        )}
        <a
          href="/"
          style={{
            display: "inline-block",
            color: "rgba(203,163,92,0.5)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          ← Return home
        </a>
      </div>
    </div>
  );
}
