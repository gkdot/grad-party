import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#details', label: 'Details' },
  { href: '#menu', label: 'Menu' },
  { href: '#timeline', label: 'Schedule' },
  { href: '#faq', label: 'FAQ' },
  { href: '#rsvp', label: 'RSVP' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-center gap-10 py-4">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => scrollTo(e, link.href)}
            className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-accent transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between px-6 py-4">
        <span className="font-display text-lg font-medium text-accent italic">Grad 2026</span>
        <button onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border"
          >
            <div className="px-6 py-4 space-y-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="block font-body text-xs tracking-[0.2em] uppercase text-muted-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}