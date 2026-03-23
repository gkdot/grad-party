import floralDivider from "@/assets/floral-divider.png";

const Footer = () => {
  return (
    <footer className="py-16 px-6 text-center">
      <img
        src={floralDivider}
        alt="Floral decoration"
        loading="lazy"
        width={1920}
        height={512}
        className="max-w-md mx-auto mb-10 opacity-60"
      />
      <p className="font-display text-2xl italic text-primary mb-3">
        We can't wait to celebrate with you!
      </p>
      <p className="font-body text-sm text-muted-foreground tracking-wider">
        #GradParty2026
      </p>
    </footer>
  );
};

export default Footer;
