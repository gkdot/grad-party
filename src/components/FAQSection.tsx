import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Can I bring a plus one?",
    a: "Absolutely! Please indicate your guest's name when you RSVP so we can prepare their place setting.",
  },
  {
    q: "Is there parking available?",
    a: "Yes, complimentary valet parking is available at the venue. There is also a public parking garage one block east.",
  },
  {
    q: "Will there be vegetarian or vegan options?",
    a: "Yes! Our menu includes vegetarian options, and we're happy to accommodate vegan and other dietary needs. Please note any restrictions in your RSVP.",
  },
  {
    q: "What time should I arrive?",
    a: "Cocktail hour begins at 5:00 PM. We recommend arriving between 4:45 and 5:15 PM to get settled before dinner is served at 6:30.",
  },
  {
    q: "Is this an indoor or outdoor event?",
    a: "Both! Cocktails will be served on the garden terrace, and dinner will be in the ballroom. We recommend comfortable shoes.",
  },
  {
    q: "Can I take photos and share on social media?",
    a: 'We love it! Feel free to capture the moment. Use the hashtag #GradParty2026 so we can find your photos.',
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 px-6 bg-dusty-blue-light/40">
      <div className="max-w-2xl mx-auto">
        <p className="section-heading">Questions</p>
        <h2 className="section-title">Frequently Asked</h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
              <AccordionTrigger className="font-display text-left text-base py-5 hover:text-primary hover:no-underline transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
