"use client";

import React from "react";

type EventData = {
  id: string;
  title: string;
  description?: string | null;
  location?: string | null;
  startAt: Date | string;
  endAt?: Date | string | null;
  published?: boolean;
};

function toLocalDateTime(value: Date | string | null | undefined) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 16);
}

export default function EditEventForm({ event }: { event: EventData }) {
  const startAtStr = toLocalDateTime(event.startAt);
  const endAtStr = toLocalDateTime(event.endAt || null);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const data = new FormData(f);
    const payload: Record<string, FormDataEntryValue> = {};
    data.forEach((v, k) => {
      payload[k] = v;
    });
    payload.published = data.get("published") === "on" ? "true" : "";

    const response = await fetch(`/api/admin/events/${event.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      setError(result.error || "Erreur lors de la mise à jour de l'événement");
      return;
    }

    window.location.href = "/admin/events";
  }

  async function handleDelete() {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) return;
    const response = await fetch(`/api/admin/events/${event.id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Erreur lors de la suppression de l'événement");
      return;
    }
    window.location.href = "/admin/events";
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{ marginBottom: 12, color: "#c53030", fontWeight: 600 }}>
          {error}
        </div>
      )}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: 8 }}>
          Titre *
        </label>
        <input
          name="title"
          defaultValue={event.title}
          required
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #cbd5e0",
            borderRadius: 6,
            fontSize: 14,
            boxSizing: "border-box",
          }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: 8 }}>
          Description
        </label>
        <textarea
          name="description"
          rows={4}
          defaultValue={event.description || ""}
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #cbd5e0",
            borderRadius: 6,
            fontSize: 14,
            boxSizing: "border-box",
          }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: 8 }}>
          Lieu
        </label>
        <input
          name="location"
          defaultValue={event.location || ""}
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #cbd5e0",
            borderRadius: 6,
            fontSize: 14,
            boxSizing: "border-box",
          }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: 8 }}>
          Date de début *
        </label>
        <input
          name="startAt"
          type="datetime-local"
          defaultValue={startAtStr}
          required
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #cbd5e0",
            borderRadius: 6,
            fontSize: 14,
            boxSizing: "border-box",
          }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: 8 }}>
          Date de fin
        </label>
        <input
          name="endAt"
          type="datetime-local"
          defaultValue={endAtStr}
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #cbd5e0",
            borderRadius: 6,
            fontSize: 14,
            boxSizing: "border-box",
          }}
        />
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <input name="published" type="checkbox" defaultChecked={Boolean(event.published)} />
        Publier cet événement
      </label>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          type="submit"
          style={{
            padding: "10px 24px",
            background: "#48bb78",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: 14,
          }}
        >
          ✓ Enregistrer
        </button>
        <button
          type="button"
          onClick={handleDelete}
          style={{
            padding: "10px 24px",
            background: "#f56565",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: 14,
          }}
        >
          🗑️ Supprimer
        </button>
      </div>
    </form>
  );
}
