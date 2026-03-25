import { motion } from 'framer-motion';

const menuCategories = [
  {
    title: 'Cocktail Hour',
    items: [
      'Champagne Toast on Arrival',
      'Signature "Class of 2026" Cocktail',
      'Artisan Cheese & Charcuterie Board',
      'Bruschetta Trio',
      'Smoked Salmon Canapés',
    ],
  },
  {
    title: 'Dinner',
    items: [
      'Garden Salad with Citrus Vinaigrette',
      'Herb-Crusted Filet Mignon',
      'Pan-Seared Atlantic Salmon',
      'Wild Mushroom Risotto (V)',
      'Roasted Seasonal Vegetables',
    ],
  },
  {
    title: 'Dessert',
    items: [
      'Graduation Cap Cake',
      'Mini Crème Brûlée',
      'Chocolate Truffles',
      'Fresh Fruit Tart',
      'Macarons Assortment',
    ],
  },
  {
    title: 'Beverages',
    items: [
      'Open Bar (Beer, Wine, Spirits)',
      'Non-Alcoholic Mocktails',
      'Sparkling Water & Juices',
      'Espresso & Cappuccino Station',
      'Hot Tea Selection',
    ],
  },
];

const SectionDivider = ({ title }) => (
  <div className="flex items-center gap-6 mb-12">
    <div className="h-px flex-1 bg-border" />
    <p className="font-body text-xs tracking-[0.3em] uppercase text-accent">{title}</p>
    <div className="h-px flex-1 bg-border" />
  </div>
);

export default function MenuSection() {
  return (
    <section id="menu" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionDivider title="Curated for You" />
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-center text-foreground mb-4 tracking-wide">
            The Menu
          </h2>
          <p className="font-serif text-center text-muted-foreground italic mb-14">
            An exquisite dining experience prepared by our award-winning culinary team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {menuCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10"
            >
              <p className="font-body text-xs tracking-[0.25em] uppercase text-accent mb-5">{cat.title}</p>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li key={item} className="font-serif text-foreground text-base flex items-start gap-3">
                    <span className="text-accent/40 mt-1 text-xs">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}