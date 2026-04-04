import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is the dress code?',
    answer: 'The dress code is Semi-Formal, otherwise known as Cocktail Attire. In other words, elegant but comfortable. For men, this could be a suit, a jacket or a button-up shirt and a tie with dress paints. For women, this could be a longer cocktail dress or dressy separates, like a blouse with dress pants.',
  },
  {
    question: 'Is there parking available?',
    answer: 'Yes! The Banquet Hall offers a large self-park lot adjacent to the venue. There is other parking for overflow nearby, if needed. We recommend arriving early if you want to secure parking close to the entrance.',
  },
  {
    question: 'Can I bring guests?',
    answer: 'Absolutely! When filling out the RSVP form, simply indicate that you\'ll be bringing a guest and provide their name(s).',
  },
  {
    question: 'Will there be accommodations for dietary restrictions?',
    answer: 'Yes, we\'re happy to accommodate vegetarian, vegan, and gluten-free options. Please indicate your dietary requirements on the RSVP form and reach out as well if this is a medical necessity.',
  },
  {
    question: 'What time should I arrive?',
    answer: 'Doors open at 3:45 PM with the cocktail reception starting at 4:00 PM. We\'ll have a champagne toast at 5:30 PM, so we recommend arriving on time!',
  },
  // {
  //   question: 'Will there be music and dancing?',
  //   answer: 'Yes! We have a live DJ starting after dinner around 8:30 PM. The dance floor will be open until 11:00 PM, plus a photo booth with graduation-themed props.',
  // },
  {
    question: 'When is the RSVP deadline?',
    answer: 'Please RSVP by May 16, 2026 so we can finalize the guest count and seating arrangements.',
  },
];

const SectionDivider = ({ title }) => (
  <div className="flex items-center gap-6 mb-12">
    <div className="h-px flex-1 bg-border" />
    <p className="font-body text-xs tracking-[0.3em] uppercase text-accent">{title}</p>
    <div className="h-px flex-1 bg-border" />
  </div>
);

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionDivider title="Need to Know" />
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-center text-foreground mb-4 tracking-wide">
            FAQ
          </h2>
          <p className="font-serif text-center text-muted-foreground italic mb-14">
            Everything you need to know about the celebration
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <Accordion type="single" collapsible className="space-y-0 divide-y divide-border border-t border-b border-border">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-0">
                <AccordionTrigger className="font-body text-sm tracking-wide text-foreground py-5 hover:no-underline hover:text-accent transition-colors text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-serif text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}