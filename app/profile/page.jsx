"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [saving, setSaving] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-primary-600"></div>
      </div>
    );
  }

  if (!session) {
    redirect("/auth/signin");
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        alert("Profil mis à jour avec succès");
        setIsEditing(false);
      } else {
        alert("Erreur lors de la mise à jour");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Mon Profil
          </h1>
          <p className="text-gray-600 mt-2">Gérez vos informations personnelles</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-green-primary-600 to-green-primary-700 px-6 py-8 text-white">
            <div className="flex items-center gap-6">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-20 h-20 rounded-full border-4 border-white"
                />
              )}
              <div>
                <h2 className="text-2xl font-bold">{session.user?.name}</h2>
                <p className="text-green-primary-50">{session.user?.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-6 py-8">
            {!isEditing ? (
              <>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Nom Complet
                    </label>
                    <p className="text-lg text-gray-800">{name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Email
                    </label>
                    <p className="text-lg text-gray-800">{email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Rôle
                    </label>
                    <span className="inline-block px-3 py-1 bg-green-primary-100 text-green-primary-800 rounded-full text-sm font-semibold">
                    {(session.user)?.role || "USER"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-8 px-6 py-2 bg-green-primary-600 text-white rounded-lg hover:bg-green-primary-700 transition"
                >
                  Modifier le Profil
                </button>
              </>
            ) : (
              <>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom Complet
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary-600"
                    />
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-green-primary-600 text-white rounded-lg hover:bg-green-primary-700 transition disabled:opacity-50"
                  >
                    {saving ? "Enregistrement..." : "Enregistrer"}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Annuler
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
