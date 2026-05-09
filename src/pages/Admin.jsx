import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { rsvpAPI } from "@/api/firestore";
import CustomCursor from "@/components/CustomCursor";

const provider = new GoogleAuthProvider();

const actionBtn = (/** @type {string} */ color) => ({
  background: "transparent",
  border: "none",
  color,
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "9px",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  cursor: "pointer",
  padding: "2px 0",
  display: "block",
});

const inlineInput = {
  background: "transparent",
  border: "none",
  borderBottom: "0.5px solid rgba(203,163,92,0.35)",
  color: "#F2EFE9",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "12px",
  width: "100%",
  outline: "none",
  padding: "2px 0",
};

export default function Admin() {
  const [user, setUser] = useState(/** @type {import('firebase/auth').User | null} */ (null));
  const [rsvps, setRsvps] = useState(/** @type {Record<string, any>[]} */ ([]));
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [editingId, setEditingId] = useState(/** @type {string | null} */ (null));
  const [editForm, setEditForm] = useState(/** @type {Record<string, string>} */ ({}));
  const [deletingId, setDeletingId] = useState(/** @type {string | null} */ (null));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      try {
        if (firebaseUser) {
          const adminDoc = await getDoc(doc(db, "admins", firebaseUser.uid));
          if (adminDoc.exists()) {
            setIsAdmin(true);
            const data = await rsvpAPI.list();
            setRsvps(data);
          } else {
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Admin init error:", err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });
    return unsub;
  }, []);

  const handleSignIn = async () => {
    setSigningIn(true);
    try {
      await signInWithPopup(auth, provider);
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setRsvps([]);
    setIsAdmin(false);
  };

  const handleEdit = (/** @type {Record<string, any>} */ rsvp) => {
    setEditingId(rsvp.id);
    setEditForm({
      name: rsvp.name || "",
      email: rsvp.email || "",
      guests: String(rsvp.guests || 1),
      dietary: rsvp.dietary || "",
      message: rsvp.message || "",
    });
    setDeletingId(null);
  };

  const handleEditSave = async (/** @type {string} */ id) => {
    setSaving(true);
    try {
      const updated = {
        name: editForm.name,
        email: editForm.email,
        guests: parseInt(editForm.guests) || 1,
        dietary: editForm.dietary,
        message: editForm.message,
      };
      await rsvpAPI.update(id, updated);
      setRsvps(rsvps.map((r) => (r.id === id ? { ...r, ...updated } : r)));
      setEditingId(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async (/** @type {string} */ id) => {
    await rsvpAPI.remove(id);
    setRsvps(rsvps.filter((r) => r.id !== id));
    setDeletingId(null);
  };

  const totalGuests = rsvps.reduce((sum, r) => sum + (r.guests || 1), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A0A0B" }}>
        <CustomCursor />
        <div className="w-6 h-6 border border-brass rounded-full border-t-transparent animate-spin" style={{ borderColor: "#CBA35C", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A0A0B" }}>
        <CustomCursor />
        <div className="text-center" style={{ border: "0.5px solid rgba(203,163,92,0.3)", padding: "60px 80px" }}>
          <p className="font-sans tracking-[0.35em] text-xs uppercase mb-8" style={{ color: "#CBA35C" }}>
            Admin
          </p>
          <button
            onClick={handleSignIn}
            disabled={signingIn}
            style={{
              background: "transparent",
              border: "0.5px solid #CBA35C",
              color: "#CBA35C",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              padding: "16px 40px",
              cursor: signingIn ? "not-allowed" : "pointer",
              opacity: signingIn ? 0.5 : 1,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#CBA35C"; e.currentTarget.style.color = "#0A0A0B"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#CBA35C"; }}
          >
            {signingIn ? "Signing in…" : "Sign in with Google"}
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A0A0B" }}>
        <CustomCursor />
        <div className="text-center" style={{ border: "0.5px solid rgba(203,163,92,0.3)", padding: "60px" }}>
          <p className="font-sans text-parchment/40 tracking-[0.3em] text-xs uppercase mb-6">
            Access Restricted
          </p>
          <button onClick={handleSignOut} style={actionBtn("rgba(203,163,92,0.4)")}>
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0A0B", fontFamily: "'Montserrat', sans-serif" }}>
      <CustomCursor />
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p style={{ color: "#CBA35C", letterSpacing: "0.35em", fontSize: "10px", textTransform: "uppercase", marginBottom: "12px" }}>
              Admin
            </p>
            <h1
              className="font-serif"
              style={{ color: "#F2EFE9", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, letterSpacing: "0.04em" }}
            >
              Guest Registry
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" style={{ color: "rgba(203,163,92,0.5)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
              ← Return to Site
            </a>
            <button onClick={handleSignOut} style={actionBtn("rgba(203,163,92,0.4)")}>
              Sign out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Total RSVPs", value: rsvps.length },
            { label: "Total Guests", value: totalGuests },
            { label: "With Dietary Notes", value: rsvps.filter((r) => r.dietary).length },
            { label: "Left Messages", value: rsvps.filter((r) => r.message).length },
          ].map((stat, i) => (
            <div key={i} style={{ border: "0.5px solid rgba(203,163,92,0.2)", padding: "28px 24px" }}>
              <p className="font-serif" style={{ color: "#CBA35C", fontSize: "2.5rem", fontWeight: 300, lineHeight: 1, marginBottom: "8px" }}>
                {stat.value}
              </p>
              <p style={{ color: "rgba(242,239,233,0.4)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ border: "0.5px solid rgba(203,163,92,0.15)", overflow: "hidden" }}>
          {/* Header */}
          <div
            className="grid grid-cols-12 gap-4 px-6 py-4"
            style={{ borderBottom: "0.5px solid rgba(203,163,92,0.2)", backgroundColor: "rgba(203,163,92,0.04)" }}
          >
            {[
              { label: "Name", col: "span 2" },
              { label: "Email", col: "span 2" },
              { label: "Guests", col: "span 1" },
              { label: "Dietary", col: "span 1" },
              { label: "Message", col: "span 3" },
              { label: "Date", col: "span 1" },
              { label: "", col: "span 2" },
            ].map(({ label, col }) => (
              <div
                key={label}
                style={{ color: "rgba(203,163,92,0.6)", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", gridColumn: col }}
              >
                {label}
              </div>
            ))}
          </div>

          {rsvps.length === 0 ? (
            <div className="py-20 text-center">
              <p style={{ color: "rgba(242,239,233,0.2)", fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                No RSVPs yet
              </p>
            </div>
          ) : (
            rsvps.map((rsvp) => {
              const isEditing = editingId === rsvp.id;
              const isDeleting = deletingId === rsvp.id;

              return (
                <div
                  key={rsvp.id}
                  className="grid grid-cols-12 gap-4 px-6 py-5 transition-all duration-300"
                  style={{ borderBottom: "0.5px solid rgba(203,163,92,0.08)", backgroundColor: isEditing ? "rgba(203,163,92,0.06)" : "transparent" }}
                  onMouseEnter={(e) => { if (!isEditing) e.currentTarget.style.backgroundColor = "rgba(203,163,92,0.05)"; }}
                  onMouseLeave={(e) => { if (!isEditing) e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  {/* Name */}
                  <div style={{ gridColumn: "span 2" }}>
                    {isEditing ? (
                      <input style={inlineInput} value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                    ) : (
                      <p style={{ color: "#F2EFE9", fontSize: "13px", letterSpacing: "0.03em" }}>{rsvp.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div style={{ gridColumn: "span 2" }}>
                    {isEditing ? (
                      <input style={inlineInput} value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                    ) : (
                      <p style={{ color: "rgba(242,239,233,0.45)", fontSize: "12px" }}>{rsvp.email}</p>
                    )}
                  </div>

                  {/* Guests */}
                  <div style={{ gridColumn: "span 1" }}>
                    {isEditing ? (
                      <select
                        style={{ ...inlineInput, cursor: "pointer" }}
                        value={editForm.guests}
                        onChange={(e) => setEditForm({ ...editForm, guests: e.target.value })}
                      >
                        {[1, 2, 3, 4].map((n) => (
                          <option key={n} value={n} style={{ backgroundColor: "#0A0A0B" }}>{n}</option>
                        ))}
                      </select>
                    ) : (
                      <span style={{ display: "inline-block", border: "0.5px solid rgba(203,163,92,0.4)", color: "#CBA35C", fontSize: "11px", padding: "2px 10px", letterSpacing: "0.1em" }}>
                        {rsvp.guests || 1}
                      </span>
                    )}
                  </div>

                  {/* Dietary */}
                  <div style={{ gridColumn: "span 1" }}>
                    {isEditing ? (
                      <input style={inlineInput} value={editForm.dietary} onChange={(e) => setEditForm({ ...editForm, dietary: e.target.value })} />
                    ) : (
                      <p style={{ color: "rgba(242,239,233,0.4)", fontSize: "12px", lineHeight: "1.5" }}>
                        {rsvp.dietary || <span style={{ opacity: 0.3 }}>—</span>}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div style={{ gridColumn: "span 3" }}>
                    {isEditing ? (
                      <input style={inlineInput} value={editForm.message} onChange={(e) => setEditForm({ ...editForm, message: e.target.value })} />
                    ) : (
                      <p style={{ color: "rgba(242,239,233,0.4)", fontSize: "12px", lineHeight: "1.6", fontStyle: rsvp.message ? "italic" : "normal" }}>
                        {rsvp.message || <span style={{ opacity: 0.3 }}>—</span>}
                      </p>
                    )}
                  </div>

                  {/* Date */}
                  <div style={{ gridColumn: "span 1" }}>
                    <p style={{ color: "rgba(242,239,233,0.25)", fontSize: "10px", letterSpacing: "0.05em" }}>
                      {rsvp.created_date
                        ? (rsvp.created_date.toDate?.() ?? new Date(rsvp.created_date)).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                        : "—"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
                    {isEditing ? (
                      <>
                        <button onClick={() => handleEditSave(rsvp.id)} disabled={saving} style={actionBtn("#CBA35C")}>
                          {saving ? "Saving…" : "Save"}
                        </button>
                        <button onClick={() => setEditingId(null)} style={actionBtn("rgba(242,239,233,0.3)")}>
                          Cancel
                        </button>
                      </>
                    ) : isDeleting ? (
                      <>
                        <button onClick={() => handleDeleteConfirm(rsvp.id)} style={actionBtn("rgba(220,80,80,0.8)")}>
                          Confirm
                        </button>
                        <button onClick={() => setDeletingId(null)} style={actionBtn("rgba(242,239,233,0.3)")}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(rsvp)} style={actionBtn("rgba(203,163,92,0.45)")}>
                          Edit
                        </button>
                        <button onClick={() => { setDeletingId(rsvp.id); setEditingId(null); }} style={actionBtn("rgba(242,239,233,0.2)")}>
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
