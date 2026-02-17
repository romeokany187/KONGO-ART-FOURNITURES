"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-primary-600 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Bienvenue, {session.user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Gérez votre compte et vos commandes
          </p>
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-6">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={120}
                height={120}
                className="rounded-full"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {session.user?.name}
              </h2>
              <p className="text-gray-600 mb-4">{session.user?.email}</p>
              <div className="inline-block bg-green-primary-100 text-green-primary-700 px-4 py-2 rounded-lg font-semibold">
                {(session.user as any)?.role || "USER"}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mes Commandes */}
          <Link href="/orders">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Mes Commandes
              </h3>
              <p className="text-gray-600">
                Consultez l'historique de vos commandes
              </p>
            </div>
          </Link>

          {/* Mon Panier */}
          <Link href="/cart">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Mon Panier
              </h3>
              <p className="text-gray-600">
                Consultez et modifiez votre panier
              </p>
            </div>
          </Link>

          {/* Paramètres */}
          <Link href="/settings">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Paramètres
              </h3>
              <p className="text-gray-600">
                Gérez votre profil et préférences
              </p>
            </div>
          </Link>

          {/* Admin Panel (if admin) */}
          {(session.user as any)?.role === "ADMIN" && (
            <Link href="/admin">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer border-2 border-green-primary-600">
                <div className="text-4xl mb-4">🔐</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Panel Admin
                </h3>
                <p className="text-gray-600">
                  Gérez le site et les utilisateurs
                </p>
              </div>
            </Link>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Commandes Récentes
          </h2>
          <div className="text-center py-8 text-gray-500">
            <p>Aucune commande pour le moment</p>
            <Link href="/produits">
              <button className="mt-4 px-6 py-2 bg-green-primary-600 text-white rounded-lg hover:bg-green-primary-700 transition">
                Découvrir nos produits
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
