import { motion } from 'framer-motion';
import { Wine, UtensilsCrossed, Camera, GlassWater, GraduationCap, Sparkles } from 'lucide-react';

const events = [
  { time: '3:45 PM', title: 'Doors Open', description: 'Guests arrive and are welcomed with a glass of sparkling wine.', icon: GlassWater },
  { time: '4:00 PM', title: 'Cocktail Reception', description: 'Mingle and enjoy curated canapés and the signature Class of 2026 cocktail.', icon: Wine },
  { time: '4:45 PM', title: 'Champagne Toast', description: 'A celebratory toast to mark the achievement of our graduate.', icon: Sparkles },
  { time: '5:00 PM', title: 'Dinner is Served', description: 'Take your seats for a three-course dinner prepared by our culinary team.', icon: UtensilsCrossed },
  { time: '7:00 PM', title: 'Speeches & Toasts', description: "Heartfelt words from family and friends honoring the graduate's journey.", icon: GraduationCap },
  { time: '7:30 PM', title: 'Photo Booth Opens', description: 'Strike a pose with graduation-themed props and take home a memento.', icon: Camera },
];

const SectionDivider = ({ title }) => (
  <div className="flex items-center gap-6 mb-12">
    <div className="h-px flex-1 bg-border" />
    <p className="font-body text-xs tracking-[0.3em] uppercase text-accent">{title}</p>
    <div className="h-px flex-1 bg-border" />
  </div>
);

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionDivider title="The Evening" />
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-center text-foreground mb-4 tracking-wide">
            Day-Of Schedule
          </h2>
          <p className="font-serif text-center text-muted-foreground italic mb-16">
            A carefully curated evening from start to finish
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-0">
            {events.map((event, i) => {
              const isLeft = i % 2 === 0;
              const EventIcon = event.icon;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`relative flex items-start gap-6 md:gap-0 pb-12 group ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`
                      flex-1 pl-14 md:pl-0
                      ${isLeft
                        ? 'md:pr-14 md:text-right'
                        : 'md:pl-14 md:text-left'
                      }
                    `}
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block bg-white border border-border px-6 py-5 group-hover:border-accent/30 group-hover:shadow-sm transition-all duration-300"
                    >
                      <p className="font-body text-xs tracking-[0.2em] uppercase text-accent mb-1">{event.time}</p>
                      <p className="font-display text-lg font-medium text-foreground mb-1">{event.title}</p>
                      <p className="font-serif text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                    </motion.div>
                  </div>

                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-4 z-10">
                    <div className="w-14 h-14 bg-white border border-border flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-300">
                      <EventIcon className="w-5 h-5 text-accent/60 group-hover:text-accent transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}