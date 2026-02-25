"use client";
import React from "react";

export default function AdminPanelClient({ users }: { users: any[] }) {
  const [loadingId, setLoadingId] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [emailMode, setEmailMode] = React.useState<"single" | "all">("single");
  const [recipientUserId, setRecipientUserId] = React.useState<string>(users[0]?.id || "");
  const [emailSubject, setEmailSubject] = React.useState("");
  const [emailBody, setEmailBody] = React.useState("");
  const [sendingEmail, setSendingEmail] = React.useState(false);

  async function setRole(userId: string, role: string) {
    setLoadingId(userId);
    try {
      await fetch("/api/admin/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role }),
      });
      setMessage(`Rôle mis à jour : ${role}`);
      setError(null);
      // optional: refresh after short delay so admin sees message
      setTimeout(() => window.location.reload(), 900);
    } finally {
      setLoadingId(null);
    }
  }

  async function sendAdminEmail() {
    setSendingEmail(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: emailMode,
          userId: emailMode === "single" ? recipientUserId : undefined,
          subject: emailSubject,
          message: emailBody,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || "Erreur envoi email");
        return;
      }
      setMessage(`Email envoyé (${data.count || 0} destinataire(s))`);
      setEmailSubject("");
      setEmailBody("");
    } catch (err) {
      setError("Erreur envoi email");
    } finally {
      setSendingEmail(false);
    }
  }

  return (
    <div>
      <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: 16, marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>📧 Envoi d'emails</h3>
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="radio"
              name="emailMode"
              checked={emailMode === "single"}
              onChange={() => setEmailMode("single")}
            />
            Privé
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="radio"
              name="emailMode"
              checked={emailMode === "all"}
              onChange={() => setEmailMode("all")}
            />
            Collectif
          </label>
        </div>

        {emailMode === "single" && (
          <select
            value={recipientUserId}
            onChange={(event) => setRecipientUserId(event.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 10, borderRadius: 6, border: "1px solid #cbd5e0" }}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </select>
        )}

        <input
          value={emailSubject}
          onChange={(event) => setEmailSubject(event.target.value)}
          placeholder="Sujet"
          style={{ width: "100%", padding: 8, marginBottom: 10, borderRadius: 6, border: "1px solid #cbd5e0" }}
        />

        <textarea
          value={emailBody}
          onChange={(event) => setEmailBody(event.target.value)}
          placeholder="Message"
          rows={4}
          style={{ width: "100%", padding: 8, marginBottom: 10, borderRadius: 6, border: "1px solid #cbd5e0" }}
        />

        <button
          onClick={sendAdminEmail}
          disabled={sendingEmail || !emailSubject || !emailBody || (emailMode === "single" && !recipientUserId)}
          style={{
            padding: "8px 14px",
            background: "#2b6cb0",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: "bold",
            opacity: sendingEmail ? 0.7 : 1,
          }}
        >
          {sendingEmail ? "Envoi..." : "Envoyer le mail"}
        </button>
      </div>

      {message && (
        <div style={{ background: '#e6fffa', color: '#22543d', padding: 12, borderRadius: 6, marginBottom: 12, border: '1px solid #b2f5ea' }}>{message}</div>
      )}
      {error && (
        <div style={{ background: '#fff5f5', color: '#742a2a', padding: 12, borderRadius: 6, marginBottom: 12, border: '1px solid #feb2b2' }}>{error}</div>
      )}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
      <thead>
        <tr style={{ background: '#f7fafc', borderBottom: '2px solid #cbd5e0' }}>
          <th style={{ textAlign: "left", padding: 15, fontWeight: 'bold' }}>Email</th>
          <th style={{ padding: 15, fontWeight: 'bold' }}>Nom</th>
          <th style={{ padding: 15, fontWeight: 'bold' }}>Rôle</th>
          <th style={{ padding: 15, fontWeight: 'bold' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
            <td style={{ padding: 15 }}>{u.email}</td>
            <td style={{ padding: 15 }}>{u.name || "-"}</td>
            <td style={{ padding: 15 }}>
              <span style={{ 
                padding: '4px 8px', 
                borderRadius: 4, 
                background: u.role === 'ADMIN' ? '#c6f6d5' : u.role === 'VENDOR' ? '#bee3f8' : '#f0f4f8',
                color: u.role === 'ADMIN' ? '#22543d' : u.role === 'VENDOR' ? '#1e3a8a' : '#2d3748',
                fontWeight: 'bold',
                fontSize: 12
              }}>
                {u.role}
              </span>
            </td>
            <td style={{ padding: 15 }}>
              <button 
                aria-label={`Make ${u.email} admin`}
                disabled={loadingId === u.id || u.role === "ADMIN"} 
                onClick={async ()=>{
                  try{
                    await setRole(u.id, "ADMIN");
                  }catch(err){
                    setError('Erreur lors de la mise à jour');
                  }
                }}
                style={{ 
                  padding: '6px 12px', 
                  marginRight: 8, 
                  background: u.role === "ADMIN" ? '#ccc' : '#48bb78',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  cursor: u.role === "ADMIN" ? 'not-allowed' : 'pointer',
                  fontSize: 12,
                  fontWeight: 'bold'
                }}>
                Admin
              </button>
              <button 
                aria-label={`Make ${u.email} vendor`}
                disabled={loadingId === u.id || u.role === "VENDOR"} 
                onClick={async ()=>{
                  try{
                    await setRole(u.id, "VENDOR");
                  }catch(err){
                    setError('Erreur lors de la mise à jour');
                  }
                }}
                style={{ 
                  padding: '6px 12px', 
                  marginRight: 8, 
                  background: u.role === "VENDOR" ? '#ccc' : '#3182ce',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  cursor: u.role === "VENDOR" ? 'not-allowed' : 'pointer',
                  fontSize: 12,
                  fontWeight: 'bold'
                }}>
                Vendeur
              </button>
              <button 
                aria-label={`Make ${u.email} user`}
                disabled={loadingId === u.id || u.role === "USER"} 
                onClick={async ()=>{
                  try{
                    await setRole(u.id, "USER");
                  }catch(err){
                    setError('Erreur lors de la mise à jour');
                  }
                }}
                style={{ 
                  padding: '6px 12px', 
                  background: u.role === "USER" ? '#ccc' : '#718096',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  cursor: u.role === "USER" ? 'not-allowed' : 'pointer',
                  fontSize: 12,
                  fontWeight: 'bold'
                }}>
                Utilisateur
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
