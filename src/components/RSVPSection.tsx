import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const RSVPSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    guests: "1",
    attending: "",
    dietary: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.attending) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you! Your RSVP has been received.");
  };

  if (submitted) {
    return (
      <section id="rsvp" className="py-24 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-dusty-blue-light flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(210 30% 55%)" strokeWidth="1.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="font-display text-3xl mb-4 text-foreground">Thank You!</h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            We've received your RSVP and can't wait to celebrate with you.
            {form.attending === "no" && " We'll miss you — thank you for letting us know!"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 px-6">
      <div className="max-w-lg mx-auto">
        <p className="section-heading">Respond</p>
        <h2 className="section-title">RSVP</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">
              Full Name *
            </label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="font-body bg-card border-border focus:ring-primary"
            />
          </div>

          <div>
            <label className="block font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">
              Email *
            </label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="font-body bg-card border-border focus:ring-primary"
            />
          </div>

          <div>
            <label className="block font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">
              Will you be attending? *
            </label>
            <div className="flex gap-4">
              {[
                { value: "yes", label: "Joyfully Accept" },
                { value: "no", label: "Regretfully Decline" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, attending: option.value }))}
                  className={`flex-1 py-3 px-4 rounded-sm border font-body text-sm transition-all duration-300 ${
                    form.attending === option.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:border-primary"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {form.attending === "yes" && (
            <>
              <div>
                <label className="block font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Number of Guests
                </label>
                <Input
                  name="guests"
                  type="number"
                  min="1"
                  max="5"
                  value={form.guests}
                  onChange={handleChange}
                  className="font-body bg-card border-border focus:ring-primary w-24"
                />
              </div>

              <div>
                <label className="block font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Dietary Restrictions
                </label>
                <Input
                  name="dietary"
                  value={form.dietary}
                  onChange={handleChange}
                  placeholder="Vegetarian, gluten-free, etc."
                  className="font-body bg-card border-border focus:ring-primary"
                />
              </div>
            </>
          )}

          <div>
            <label className="block font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">
              Message (optional)
            </label>
            <Textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="A note for the graduate..."
              rows={3}
              className="font-body bg-card border-border focus:ring-primary resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-6 font-body text-sm tracking-widest uppercase rounded-sm hover:bg-dusty-blue-dark transition-colors duration-300"
          >
            Send RSVP
          </Button>
        </form>
      </div>
    </section>
  );
};

export default RSVPSection;
