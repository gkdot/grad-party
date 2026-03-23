import heroGrad from "@/assets/hero-grad.png";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-dusty-blue-light/30" />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <img
          src={heroGrad}
          alt="Graduation cap illustration"
          width={800}
          height={800}
          className="w-40 h-40 md:w-52 md:h-52 mx-auto mb-8 object-contain"
        />
        
        <p className="section-heading mb-6">You're Invited</p>
        
        <h1 className="font-display text-5xl md:text-7xl font-medium leading-tight mb-6 text-foreground">
          Graduation<br />
          <span className="italic text-primary">Celebration</span>
        </h1>
        
        <p className="font-body text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
          Join us as we celebrate this incredible milestone
        </p>
        
        <p className="font-display text-base tracking-widest uppercase text-primary mb-12">
          Saturday, June 14, 2026
        </p>
        
        <a
          href="#rsvp"
          className="inline-block bg-primary text-primary-foreground px-10 py-4 font-body text-sm tracking-widest uppercase rounded-sm hover:bg-dusty-blue-dark transition-colors duration-300"
        >
          RSVP Now
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="text-muted-foreground">
          <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="2" fill="currentColor" className="animate-pulse" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
