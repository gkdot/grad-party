import { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
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
import { CheckCircle, Send, GraduationCap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RSVPPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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
    const data = { ...form };
    if (!data.plus_one) {
      delete data.plus_one_name;
    }
    if (data.dietary_restrictions === 'none') {
      delete data.dietary_notes;
    }
    await api.rsvps.create(data);
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen font-body">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-6 pt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              {form.attendance === 'attending' ? 'See You There!' : 'Thanks for Letting Us Know!'}
            </h2>
            <p className="font-body text-muted-foreground mb-2">
              {form.attendance === 'attending'
                ? "We're so excited to celebrate with you! You'll receive a confirmation email shortly."
                : form.attendance === 'maybe'
                  ? "We hope you can make it! Feel free to update your RSVP anytime."
                  : "We'll miss you! Thanks for responding."}
            </p>
            <p className="font-body text-sm text-muted-foreground">
              Response submitted for <strong>{form.guest_name}</strong>
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
              <GraduationCap className="w-7 h-7 text-accent" />
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-3">RSVP</h1>
            <p className="font-body text-muted-foreground">
              Please let us know if you can join the celebration · May 23, 2026
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-card rounded-2xl border border-border p-8"
          >
            {/* Name */}
            <div className="space-y-2">
              <Label className="font-body text-sm font-medium">Full Name *</Label>
              <Input
                required
                value={form.guest_name}
                onChange={(e) => updateField('guest_name', e.target.value)}
                placeholder="Your full name"
                className="rounded-xl h-12 font-body"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="font-body text-sm font-medium">Email *</Label>
              <Input
                required
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="your@email.com"
                className="rounded-xl h-12 font-body"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label className="font-body text-sm font-medium">Phone Number</Label>
              <Input
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="(optional)"
                className="rounded-xl h-12 font-body"
              />
            </div>

            {/* Attendance */}
            <div className="space-y-2">
              <Label className="font-body text-sm font-medium">Will you be attending? *</Label>
              <Select required value={form.attendance} onValueChange={(v) => updateField('attendance', v)}>
                <SelectTrigger className="rounded-xl h-12 font-body">
                  <SelectValue placeholder="Select your response" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="attending">Yes, I'll be there! 🎉</SelectItem>
                  <SelectItem value="maybe">Maybe, still deciding</SelectItem>
                  <SelectItem value="not_attending">Sorry, can't make it</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Plus One */}
            {form.attendance !== 'not_attending' && form.attendance && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                <div className="flex items-center justify-between py-3 px-4 bg-muted rounded-xl">
                  <Label className="font-body text-sm font-medium">Bringing a plus one?</Label>
                  <Switch checked={form.plus_one} onCheckedChange={(v) => updateField('plus_one', v)} />
                </div>
                {form.plus_one && (
                  <div className="space-y-2">
                    <Label className="font-body text-sm font-medium">Guest's Name</Label>
                    <Input
                      value={form.plus_one_name}
                      onChange={(e) => updateField('plus_one_name', e.target.value)}
                      placeholder="Your guest's full name"
                      className="rounded-xl h-12 font-body"
                    />
                  </div>
                )}
              </motion.div>
            )}

            {/* Dietary */}
            {form.attendance !== 'not_attending' && form.attendance && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-body text-sm font-medium">Dietary Restrictions</Label>
                  <Select value={form.dietary_restrictions} onValueChange={(v) => updateField('dietary_restrictions', v)}>
                    <SelectTrigger className="rounded-xl h-12 font-body">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="gluten_free">Gluten-Free</SelectItem>
                      <SelectItem value="halal">Halal</SelectItem>
                      <SelectItem value="kosher">Kosher</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {form.dietary_restrictions === 'other' && (
                  <div className="space-y-2">
                    <Label className="font-body text-sm font-medium">Please specify</Label>
                    <Input
                      value={form.dietary_notes}
                      onChange={(e) => updateField('dietary_notes', e.target.value)}
                      placeholder="Describe your dietary needs"
                      className="rounded-xl h-12 font-body"
                    />
                  </div>
                )}
              </motion.div>
            )}

            {/* Message */}
            <div className="space-y-2">
              <Label className="font-body text-sm font-medium">Message for the Graduate</Label>
              <Textarea
                value={form.message}
                onChange={(e) => updateField('message', e.target.value)}
                placeholder="Share your congratulations or a note..."
                className="rounded-xl font-body min-h-[100px] resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !form.attendance}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body text-base h-14 rounded-xl transition-all hover:shadow-lg"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit RSVP
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
      <Footer />
    </div>
  );
}