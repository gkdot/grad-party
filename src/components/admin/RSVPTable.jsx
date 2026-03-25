import { useState } from 'react';
import { Trash2, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import moment from 'moment';

const statusBadge = {
  attending: 'bg-green-100 text-green-700 border-green-200',
  not_attending: 'bg-red-100 text-red-700 border-red-200',
  maybe: 'bg-amber-100 text-amber-700 border-amber-200',
};

const statusLabel = {
  attending: 'Attending',
  not_attending: 'Declined',
  maybe: 'Maybe',
};

const dietaryLabel = {
  none: 'None',
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  gluten_free: 'Gluten-Free',
  halal: 'Halal',
  kosher: 'Kosher',
  other: 'Other',
};

export default function RSVPTable({ rsvps, onRefresh }) {
  const [filter, setFilter] = useState('all');
  const [selectedRSVP, setSelectedRSVP] = useState(null);

  const filtered = filter === 'all' ? rsvps : rsvps.filter((r) => r.attendance === filter);

  const handleDelete = async (id) => {
    try {
      await api.rsvps.delete(id);
      onRefresh();
    } catch (error) {
      console.error('Failed to delete RSVP:', error);
      alert(error.message || 'Failed to delete RSVP.');
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48 rounded-xl font-body">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Responses</SelectItem>
            <SelectItem value="attending">Attending</SelectItem>
            <SelectItem value="maybe">Maybe</SelectItem>
            <SelectItem value="not_attending">Declined</SelectItem>
          </SelectContent>
        </Select>
        <span className="font-body text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'guest' : 'guests'}
        </span>
      </div>

      <div className="hidden md:block bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Guest</th>
              <th className="text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Status</th>
              <th className="text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Plus One</th>
              <th className="text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Diet</th>
              <th className="text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Date</th>
              <th className="text-right font-body text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((rsvp) => (
              <tr key={rsvp.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-body text-sm font-medium text-foreground">{rsvp.guest_name}</p>
                  <p className="font-body text-xs text-muted-foreground">{rsvp.email}</p>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className={`font-body text-xs ${statusBadge[rsvp.attendance]}`}>
                    {statusLabel[rsvp.attendance]}
                  </Badge>
                </td>
                <td className="px-6 py-4 font-body text-sm text-muted-foreground">
                  {rsvp.plus_one ? rsvp.plus_one_name || 'Yes' : '—'}
                </td>
                <td className="px-6 py-4 font-body text-sm text-muted-foreground">
                  {dietaryLabel[rsvp.dietary_restrictions] || '—'}
                </td>
                <td className="px-6 py-4 font-body text-xs text-muted-foreground">
                  {moment(rsvp.created_date).format('MMM D, h:mm A')}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {rsvp.message && (
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setSelectedRSVP(rsvp)}>
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    )}
                    <a href={`mailto:${rsvp.email}`}>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </a>
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleDelete(rsvp.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="font-body text-muted-foreground">No RSVPs yet</p>
          </div>
        )}
      </div>

      <div className="md:hidden space-y-3">
        {filtered.map((rsvp) => (
          <div key={rsvp.id} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-body text-sm font-medium text-foreground">{rsvp.guest_name}</p>
                <p className="font-body text-xs text-muted-foreground">{rsvp.email}</p>
              </div>
              <Badge variant="outline" className={`font-body text-xs ${statusBadge[rsvp.attendance]}`}>
                {statusLabel[rsvp.attendance]}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground font-body mb-3">
              {rsvp.plus_one && <span>+1: {rsvp.plus_one_name || 'Yes'}</span>}
              <span>{dietaryLabel[rsvp.dietary_restrictions]}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-body text-xs text-muted-foreground">{moment(rsvp.created_date).fromNow()}</span>
              <div className="flex gap-1">
                {rsvp.message && (
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setSelectedRSVP(rsvp)}>
                    <MessageSquare className="w-3.5 h-3.5" />
                  </Button>
                )}
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleDelete(rsvp.id)}>
                  <Trash2 className="w-3.5 h-3.5 text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="font-body text-muted-foreground">No RSVPs yet</p>
          </div>
        )}
      </div>

      <Dialog open={!!selectedRSVP} onOpenChange={() => setSelectedRSVP(null)}>
        <DialogContent className="rounded-2xl font-body">
          <DialogHeader>
            <DialogTitle>Message from {selectedRSVP?.guest_name}</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground leading-relaxed">{selectedRSVP?.message}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}