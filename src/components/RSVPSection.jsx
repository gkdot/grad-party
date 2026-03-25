import { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle } from 'lucide-react';

const SectionDivider = ({ title }) => (
  <div className="flex items-center gap-6 mb-12">
    <div className="h-px flex-1 bg-border" />
    <p className="font-body text-xs tracking-[0.3em] uppercase text-accent">{title}</p>
    <div className="h-px flex-1 bg-border" />
  </div>
);

export default function RSVPSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [form, setForm] = useState({
    guest_name: '',
    email: '',
    phone: '',
    attendance: '',
    plus_one: false,
    plus_one_name: '',
    dietary_restrictions: 'none',
    dietary_notes: '',
    message: '',
  });

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { ...form };

      if (!data.plus_one) delete data.plus_one_name;
      if (data.dietary_restrictions === 'none') delete data.dietary_notes;

      await api.rsvps.create(data);

      setSubmittedName(form.guest_name);
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit RSVP:', error);
      alert(error.message || 'Failed to submit RSVP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionDivider title="Kindly Reply" />
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-center text-foreground mb-4 tracking-wide">
            RSVP
          </h2>
          <p className="font-serif text-center text-muted-foreground italic mb-14">
            Please respond by June 1, 2026
          </p>
        </motion.div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-accent mx-auto mb-5" strokeWidth={1} />
            <h3 className="font-display text-3xl font-medium text-foreground mb-2">
              {form.attendance === 'attending' ? "We'll See You There!" : 'Thank You for Responding'}
            </h3>
            <p className="font-serif italic text-muted-foreground">
              Response received for <em>{submittedName}</em>
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-white border border-border p-8 md:p-10"
          >
            <div className="space-y-2">
              <Label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">Full Name *</Label>
              <Input
                required
                value={form.guest_name}
                onChange={(e) => updateField('guest_name', e.target.value)}
                placeholder="Your full name"
                className="rounded-none border-0 border-b border-input bg-transparent px-0 font-serif focus-visible:ring-0 focus-visible:border-accent"
              />
            </div>

            <div className="space-y-2">
              <div>
                <Label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">Phone Number *</Label>
                <Input
                  required
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="Your phone number"
                  className="rounded-none border-0 border-b border-input bg-transparent px-0 font-serif focus-visible:ring-0 focus-visible:border-accent"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">Email *</Label>
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="your@email.com"
                  className="rounded-none border-0 border-b border-input bg-transparent px-0 font-serif focus-visible:ring-0 focus-visible:border-accent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">Will You Attend? *</Label>
              <Select value={form.attendance} onValueChange={(v) => updateField('attendance', v)}>
                <SelectTrigger className="rounded-none border-0 border-b border-input bg-transparent px-0 font-serif focus:ring-0">
                  <SelectValue placeholder="Select your response" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="attending">Yes</SelectItem>
                  <SelectItem value="not_attending">No</SelectItem>
                  <SelectItem value="maybe">Still deciding</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {form.attendance && form.attendance !== 'not_attending' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <Label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">Bringing a Guest?</Label>
                  <Switch checked={form.plus_one} onCheckedChange={(v) => updateField('plus_one', v)} />
                </div>

                {form.plus_one && (
                  <div className="space-y-2">
                    <Label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">Guest's Name</Label>
                    <Input
                      value={form.plus_one_name}
                      onChange={(e) => updateField('plus_one_name', e.target.value)}
                      placeholder="Your guest's full name"
                      className="rounded-none border-0 border-b border-input bg-transparent px-0 font-serif focus-visible:ring-0 focus-visible:border-accent"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">Dietary Restrictions (Select Vegan If Fasting)</Label>
                  <Select
                    value={form.dietary_restrictions}
                    onValueChange={(v) => updateField('dietary_restrictions', v)}
                  >
                    <SelectTrigger className="rounded-none border-0 border-b border-input bg-transparent px-0 font-serif focus:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="gluten_free">Gluten-Free</SelectItem>
                      <SelectItem value="halal">Halal</SelectItem>
                      <SelectItem value="kosher">Kosher</SelectItem>
                      <SelectItem value="other">Other (please specify below)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {form.dietary_restrictions === 'other' && (
                  <div className="space-y-2">
                    <Label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">Please Specify</Label>
                    <Input
                      value={form.dietary_notes}
                      onChange={(e) => updateField('dietary_notes', e.target.value)}
                      className="rounded-none border-0 border-b border-input bg-transparent px-0 font-serif focus-visible:ring-0 focus-visible:border-accent"
                    />
                  </div>
                )}
              </motion.div>
            )}

            <div className="space-y-2">
              <Label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">A Note to the Graduate</Label>
              <Textarea
                value={form.message}
                onChange={(e) => updateField('message', e.target.value)}
                placeholder="Share your congratulations..."
                className="rounded-none border-0 border-b border-input bg-transparent px-0 font-serif focus-visible:ring-0 focus-visible:border-accent resize-none min-h-[80px]"
              />
            </div>

            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={loading || !form.attendance}
                className="font-body text-xs tracking-[0.25em] uppercase text-accent border border-accent/40 px-12 py-3 hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Response'}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}