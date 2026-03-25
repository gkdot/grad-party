import { Users, UserCheck, UserX, HelpCircle } from 'lucide-react';

export default function RSVPStats({ rsvps }) {
  const attending = rsvps.filter((r) => r.attendance === 'attending');
  const notAttending = rsvps.filter((r) => r.attendance === 'not_attending');
  const maybe = rsvps.filter((r) => r.attendance === 'maybe');
  const plusOnes = rsvps.filter((r) => r.plus_one).length;
  const totalGuests = attending.length + plusOnes;

  const stats = [
    { label: 'Total RSVPs', value: rsvps.length, icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Attending', value: `${attending.length} (+${plusOnes})`, icon: UserCheck, color: 'bg-green-50 text-green-600' },
    { label: 'Maybe', value: maybe.length, icon: HelpCircle, color: 'bg-amber-50 text-amber-600' },
    { label: 'Declined', value: notAttending.length, icon: UserX, color: 'bg-red-50 text-red-600' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card rounded-2xl border border-border p-5">
          <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="font-body text-xs text-muted-foreground mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}