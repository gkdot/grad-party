import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const details = [
  { label: 'Date', value: 'Saturday, May 23', sub: '2026' },
  { label: 'Time', value: '4:00 – 8:00 PM', sub: 'Cocktails at 5, Dinner at 6' },
  { label: 'Venue', value: 'The BVFRD Banquet Hall', sub: '9501 Old Burke Lake Road' },
  { label: 'Attire', value: 'Semi-Formal', sub: 'White encouraged' },
];

const VENUE_ADDRESS = '9501 Old Burke Lake Road, Burke, VA 22015';
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  VENUE_ADDRESS
)}&z=15&output=embed`;

const SectionDivider = ({ title }) => (
  <div className="flex items-center gap-6 mb-12">
    <div className="h-px flex-1 bg-border" />
    <p className="font-body text-xs tracking-[0.3em] uppercase text-accent">{title}</p>
    <div className="h-px flex-1 bg-border" />
  </div>
);

export default function EventDetails() {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    VENUE_ADDRESS
  )}`;

  return (
    <section id="details" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionDivider title="The Details" />
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-center text-foreground mb-14 tracking-wide">
            When &amp; Where
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-12">
          {details.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 text-center"
            >
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                {item.label}
              </p>
              <p className="font-display text-xl font-medium text-foreground mb-1">
                {item.value}
              </p>
              <p className="font-body text-xs text-muted-foreground">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-border overflow-hidden"
        >
          <div className="relative w-full h-64 md:h-80 bg-secondary/30">
            <iframe
              title="Venue Location"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.4) contrast(1.05)' }}
              loading="lazy"
              src={MAPS_EMBED_URL}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="bg-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <p className="font-body text-xs tracking-wide text-muted-foreground">
                {VENUE_ADDRESS}
              </p>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs tracking-[0.2em] uppercase text-accent border border-accent/40 px-6 py-2 hover:bg-accent hover:text-white transition-all duration-300 shrink-0"
            >
              Get Directions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}