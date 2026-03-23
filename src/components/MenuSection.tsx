const courses = [
  {
    category: "Appetizers",
    items: [
      { name: "Burrata & Heirloom Tomato", desc: "with basil oil and flaky sea salt" },
      { name: "Shrimp Cocktail", desc: "with zesty horseradish sauce" },
      { name: "Bruschetta Trio", desc: "classic tomato, mushroom truffle, ricotta & honey" },
    ],
  },
  {
    category: "Entrées",
    items: [
      { name: "Herb-Crusted Salmon", desc: "lemon dill sauce, roasted asparagus" },
      { name: "Grilled Filet Mignon", desc: "garlic mashed potatoes, seasonal vegetables" },
      { name: "Wild Mushroom Risotto", desc: "parmesan, truffle oil (vegetarian)" },
    ],
  },
  {
    category: "Desserts",
    items: [
      { name: "Graduation Cake", desc: "vanilla bean with buttercream" },
      { name: "Crème Brûlée", desc: "classic French custard" },
      { name: "Seasonal Fruit Tart", desc: "almond cream, fresh berries" },
    ],
  },
];

const MenuSection = () => {
  return (
    <section id="menu" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="section-heading">Dining</p>
        <h2 className="section-title">The Menu</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div key={course.category} className="text-center">
              <h3 className="font-display text-lg tracking-wider uppercase text-primary mb-6 pb-3 border-b border-border">
                {course.category}
              </h3>
              <div className="space-y-6">
                {course.items.map((item) => (
                  <div key={item.name}>
                    <p className="font-display text-base font-medium text-foreground mb-1">
                      {item.name}
                    </p>
                    <p className="font-body text-sm text-muted-foreground italic">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center font-body text-sm text-muted-foreground mt-12">
          A full bar and non-alcoholic beverages will be available throughout the evening.
          <br />
          Please note any dietary restrictions in your RSVP.
        </p>
      </div>
    </section>
  );
};

export default MenuSection;
