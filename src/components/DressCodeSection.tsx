const DressCodeSection = () => {
  return (
    <section id="dress-code" className="py-24 px-6 bg-dusty-blue-light/40">
      <div className="max-w-3xl mx-auto text-center">
        <p className="section-heading">What to Wear</p>
        <h2 className="section-title">Dress Code</h2>

        <div className="bg-card rounded-sm p-10 md:p-14 shadow-sm border border-border">
          <h3 className="font-display text-2xl italic text-primary mb-6">
            Semi-Formal / Garden Party
          </h3>
          <p className="font-body text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
            Think elegant but comfortable. Sundresses, jumpsuits, or cocktail attire for ladies. 
            Slacks with a button-down or blazer for gentlemen. We'll be indoors and outdoors, 
            so plan for both.
          </p>

          {/* Color palette */}
          <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-4">
            Suggested Color Palette
          </p>
          <div className="flex items-center justify-center gap-3">
            {[
              { color: "bg-primary", label: "Dusty Blue" },
              { color: "bg-cream", label: "Cream" },
              { color: "bg-sage", label: "Sage" },
              { color: "bg-gold", label: "Gold" },
              { color: "bg-foreground", label: "Navy" },
            ].map((swatch) => (
              <div key={swatch.label} className="text-center">
                <div
                  className={`w-10 h-10 rounded-full ${swatch.color} border border-border shadow-sm mx-auto mb-2`}
                />
                <span className="font-body text-xs text-muted-foreground">{swatch.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressCodeSection;
