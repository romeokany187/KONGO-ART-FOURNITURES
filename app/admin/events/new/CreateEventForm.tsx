"use client";

import React from "react";

export default function CreateEventForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      title: data.get("title")?.toString() || "",
      description: data.get("description")?.toString() || "",
      location: data.get("location")?.toString() || "",
      startAt: data.get("startAt")?.toString() || "",
      endAt: data.get("endAt")?.toString() || "",
      published: data.get("published") === "on",
    };

    try {
      const response = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Erreur lors de la création de l'événement");
      }

      window.location.href = "/admin/events";
    } catch (err: any) {
      setError(err?.message || "Impossible de créer l'événement");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{ marginBottom: 12, color: "#c53030", fontWeight: 600 }}>
          {error}
        </div>
      )}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: 8 }}>Titre *</label>
        <input name="title" required style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e0", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: 8 }}>Description</label>
        <textarea name="description" rows={4} style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e0", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: 8 }}>Lieu</label>
        <input name="location" style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e0", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: 8 }}>Date de début *</label>
        <input name="startAt" type="datetime-local" required style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e0", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: 8 }}>Date de fin</label>
        <input name="endAt" type="datetime-local" style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e0", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <input name="published" type="checkbox" defaultChecked />
        Publier immédiatement
      </label>
      <button type="submit" disabled={submitting} style={{ padding: "10px 24px", background: "#48bb78", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: "bold", fontSize: 14, opacity: submitting ? 0.7 : 1 }}>
        {submitting ? "Création..." : "✓ Créer l'événement"}
      </button>
    </form>
  );
}
