import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-white border-t border-border">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-display text-2xl font-semibold text-foreground tracking-wider mb-1">Class of 2026</p>
        <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
          May 23, 2026 · The BVFRD Banquet Hall
        </p>
        <div className="h-px w-24 bg-accent/20 mx-auto mb-6" />
        <Link to="/admin" className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground/50 hover:text-accent transition-colors">
          Admin
        </Link>
      </div>
    </footer>
  );
}