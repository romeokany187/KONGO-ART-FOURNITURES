"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("security");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const response = await fetch("/api/notifications");
      const data = await response.json();
      if (response.ok && Array.isArray(data.data)) {
        setNotifications(data.data);
      }
    } catch (error) {
      console.error("Error loading notifications", error);
    }
  };

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

  useEffect(() => {
    if (activeTab === "notifications") {
      loadNotifications();
    }
  }, [activeTab]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/user/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          twoFactorEnabled,
          emailNotifications,
        }),
      });

      if (response.ok) {
        alert("Paramètres mis à jour avec succès");
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

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Paramètres
          </h1>
          <p className="text-gray-600 mt-2">
            Gérez vos préférences et votre sécurité
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("security")}
              className={`flex-1 px-6 py-4 font-semibold text-center transition ${
                activeTab === "security"
                  ? "text-green-primary-600 border-b-2 border-green-primary-600 bg-green-primary-50"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              🔒 Sécurité
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex-1 px-6 py-4 font-semibold text-center transition ${
                activeTab === "notifications"
                  ? "text-green-primary-600 border-b-2 border-green-primary-600 bg-green-primary-50"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              🔔 Notifications
            </button>
            <button
              onClick={() => setActiveTab("session")}
              className={`flex-1 px-6 py-4 font-semibold text-center transition ${
                activeTab === "session"
                  ? "text-green-primary-600 border-b-2 border-green-primary-600 bg-green-primary-50"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              👤 Session
            </button>
          </div>

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="px-6 py-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Paramètres de Sécurité
              </h2>

              <div className="space-y-6">
                {/* Two Factor Authentication */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Authentification à Deux Facteurs (2FA)
                      </h3>
                      <p className="text-gray-600 text-sm mt-2">
                        Sécurisez votre compte avec une vérification supplémentaire
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={twoFactorEnabled}
                        onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-primary-600"></div>
                    </label>
                  </div>
                </div>

                {/* Password Change */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Changer le Mot de Passe
                  </h3>
                  <button className="px-4 py-2 border border-green-primary-600 text-green-primary-600 rounded-lg hover:bg-green-primary-50 transition font-semibold">
                    Mettre à Jour le Mot de Passe
                  </button>
                </div>

                {/* Active Sessions */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Sessions Actives
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 font-semibold">
                      Appareil Actuel
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Chrome sur macOS
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Connecté récemment
                    </p>
                  </div>
                  <button className="mt-4 px-4 py-2 text-red-600 hover:text-red-700 font-semibold">
                    Déconnecter tous les autres appareils
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Historique des notifications</h3>
                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-600">Aucune notification pour le moment.</p>
                  ) : (
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                          <p className="text-sm font-semibold text-gray-800">{notification.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.createdAt).toLocaleString("fr-FR")}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="mt-8 px-6 py-2 bg-green-primary-600 text-white rounded-lg hover:bg-green-primary-700 transition disabled:opacity-50"
              >
                {saving ? "Enregistrement..." : "Enregistrer les Modifications"}
              </button>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="px-6 py-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Préférences de Notifications
              </h2>

              <div className="space-y-6">
                {/* Email Notifications */}
                <div className="border border-gray-200 rounded-lg p-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Emails de Commande
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Recevoir des notifications pour vos commandes
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-primary-600"></div>
                  </label>
                </div>

                {/* Newsletter */}
                <div className="border border-gray-200 rounded-lg p-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">Newsletter</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Recevoir les dernières offres et actualités
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-primary-600"></div>
                  </label>
                </div>

                {/* Promotion Emails */}
                <div className="border border-gray-200 rounded-lg p-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Emails Promotionnels
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Recevez nos offres spéciales et réductions
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-primary-600"></div>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="mt-8 px-6 py-2 bg-green-primary-600 text-white rounded-lg hover:bg-green-primary-700 transition disabled:opacity-50"
              >
                {saving ? "Enregistrement..." : "Enregistrer les Préférences"}
              </button>
            </div>
          )}

          {/* Session Tab */}
          {activeTab === "session" && (
            <div className="px-6 py-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Gestion de la Session
              </h2>

              <div className="space-y-6">
                {/* Current User Info */}
                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Informations de Compte
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-600 text-sm">Email</p>
                      <p className="text-gray-800 font-semibold mt-1">
                        {session?.user?.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Connecté depuis</p>
                      <p className="text-gray-800 font-semibold mt-1">
                        Google OAuth
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logout */}
                <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                  <h3 className="font-semibold text-red-800 mb-2">
                    Déconnexion
                  </h3>
                  <p className="text-red-700 text-sm mb-4">
                    Vous serez déconnecté de votre compte
                  </p>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                  >
                    Se Déconnecter
                  </button>
                </div>

                {/* Delete Account */}
                <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                  <h3 className="font-semibold text-red-800 mb-2">
                    Supprimer le Compte
                  </h3>
                  <p className="text-red-700 text-sm mb-4">
                    Cette action est irréversible. Toutes vos données seront supprimées.
                  </p>
                  <button className="px-6 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-100 transition font-semibold">
                    Supprimer le Compte
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
