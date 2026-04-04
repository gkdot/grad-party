import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PartyPopper } from 'lucide-react';

export default function RSVPCallToAction() {
  return (
    <section className="py-24 px-6 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-8">
          <PartyPopper className="w-8 h-8 text-accent" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          Don't Miss Out!
        </h2>
        <p className="font-body text-white/60 mb-10 text-lg">
          RSVP by May 16, 2026 to secure your spot at the celebration of the year.
        </p>
        <Link to="/rsvp">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body text-base px-10 py-6 rounded-full shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:scale-105">
            RSVP Now
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}