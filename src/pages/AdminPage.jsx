import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Download, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RSVPStats from '../components/admin/RSVPStats';
import RSVPTable from '../components/admin/RSVPTable';

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
        
    const checkSession = async () => {
      try {
        const data = await api.admin.session();
        if (!active) return;
        setAuthorized(Boolean(data.authorized));
      } catch {
        console.error("Admin session check failed:", error);
        if (!active) return;
        setAuthorized(false);
      } finally {
        if (active) setCheckingAuth(false);
      }
    };

    return () => {
      active = false;
    };
  }, []);

  const fetchRSVPs = async () => {
    setLoading(true);
    try {
      const data = await api.rsvps.list();
      setRsvps(data);
    } catch (err) {
      setError(err.message || 'Failed to load RSVPs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authorized) {
      fetchRSVPs();
    }
  }, [authorized]);

  const handleUnlock = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.admin.login(password);
      setAuthorized(true);
      setPassword('');
    } catch (err) {
      setError(err.message || 'Incorrect password.');
    }
  };

  if (checkingAuth) {
    return <div className="p-8">Checking access...</div>;
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <form onSubmit={handleUnlock} className="w-full max-w-sm border p-6 bg-white space-y-4">
          <h1 className="text-2xl font-semibold">Admin Access</h1>
          <p className="text-sm text-muted-foreground">Enter the passcode to view RSVPs.</p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passcode"
            className="w-full border px-3 py-2"
            required
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" className="w-full border px-3 py-2">
            Unlock
          </button>
        </form>
      </div>
    );
  }

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Status', 'Plus One', 'Plus One Name', 'Dietary', 'Message', 'Date'];
    const rows = rsvps.map((r) => [
      r.guest_name,
      r.email,
      r.phone || '',
      r.attendance,
      r.plus_one ? 'Yes' : 'No',
      r.plus_one_name || '',
      r.dietary_restrictions || 'none',
      r.message || '',
      r.created_date,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((v) => `"${String(v ?? '').replaceAll('"', '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsvps.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="w-7 h-7 text-accent" />
                <h1 className="text-3xl font-bold text-foreground">RSVP Dashboard</h1>
              </div>
              <p className="font-body text-muted-foreground">Manage your guest list and track responses</p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={fetchRSVPs} className="rounded-xl font-body gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              <Button variant="outline" onClick={exportCSV} className="rounded-xl font-body gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-4 border-border border-t-accent rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              <RSVPStats rsvps={rsvps} />
              <RSVPTable rsvps={rsvps} onRefresh={fetchRSVPs} />
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}