"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ContactPage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (event) => {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          email: session?.user?.email || form.email,
          name: form.name || session?.user?.name || "",
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        alert(data.error || "Erreur lors de l'envoi du message");
        return;
      }

      alert("Message envoyé avec succès");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi du message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Contactez-nous</h1>
        <p className="text-gray-600 mb-8">Envoyez votre message à notre équipe.</p>

        <form onSubmit={onSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              name="name"
              value={form.name}
              onChange={onChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              name="email"
              value={session?.user?.email || form.email}
              onChange={onChange}
              required={!session?.user?.email}
              disabled={!!session?.user?.email}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sujet</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              name="subject"
              value={form.subject}
              onChange={onChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <textarea
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              name="message"
              value={form.message}
              onChange={onChange}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full px-4 py-3 bg-green-primary-600 text-white rounded-lg hover:bg-green-primary-700 transition disabled:opacity-50"
          >
            {loading ? "Envoi..." : "Envoyer"}
          </button>
        </form>
      </div>
    </main>
  );
}