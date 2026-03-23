import { MapPin, Clock, CalendarDays } from "lucide-react";

const details = [
  {
    icon: CalendarDays,
    title: "Date",
    lines: ["Saturday, June 14, 2026"],
  },
  {
    icon: Clock,
    title: "Time",
    lines: ["5:00 PM – 10:00 PM", "Cocktail hour begins at 5:00"],
  },
  {
    icon: MapPin,
    title: "Venue",
    lines: ["The Grand Ballroom", "123 University Avenue", "New York, NY 10001"],
  },
];

const DetailsSection = () => {
  return (
    <section id="details" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="section-heading">The Event</p>
        <h2 className="section-title">Celebration Details</h2>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {details.map((detail) => (
            <div key={detail.title} className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-dusty-blue-light flex items-center justify-center">
                <detail.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg tracking-wider uppercase mb-3 text-foreground">
                {detail.title}
              </h3>
              {detail.lines.map((line, i) => (
                <p key={i} className="font-body text-muted-foreground text-sm leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
