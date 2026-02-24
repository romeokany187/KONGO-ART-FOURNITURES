"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function OrderDetailsPage({ params }) {
  const { data: session, status } = useSession();
  const [order, setOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-primary-600"></div>
      </div>
    );
  }

  const role = (session?.user)?.role;
  if (!session || (role !== "ADMIN" && role !== "VENDOR")) {
    redirect("/dashboard");
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${params.id}`);
      const data = await response.json();
      if (data.data) {
        setOrder(data.data);
        setNewStatus(data.data.status);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    setUpdating(true);
    try {
      const response = await fetch(`/api/orders/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        alert("Statut mis à jour avec succès");
        fetchOrder();
      } else {
        alert("Erreur lors de la mise à jour");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Erreur lors de la mise à jour");
    } finally {
      setUpdating(false);
    }
  };

  const handleValidateOrder = async () => {
    setNewStatus("PROCESSING");
    setUpdating(true);
    try {
      const response = await fetch(`/api/orders/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "PROCESSING" }),
      });

      if (response.ok) {
        alert("Commande validée et notifications envoyées");
        fetchOrder();
      } else {
        const data = await response.json().catch(() => ({}));
        alert(data.error || "Erreur lors de la validation");
      }
    } catch (error) {
      console.error("Error validating order:", error);
      alert("Erreur lors de la validation");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-primary-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Commande non trouvée</p>
          <Link href="/admin">
            <button className="px-6 py-2 bg-green-primary-600 text-white rounded-lg hover:bg-green-primary-700">
              Retour au Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/admin">
              <button className="text-green-primary-600 hover:text-green-primary-700">
                ← Retour
              </button>
            </Link>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            Commande #{order.id.slice(0, 8)}
          </h1>
          <p className="text-gray-600 mt-2">
            {new Date(order.createdAt).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Informations Client
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 text-sm">Nom</p>
                  <p className="text-gray-800 font-semibold">
                    {order.user.name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Email</p>
                  <p className="text-gray-800 font-semibold">
                    {order.user.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Adresse de Livraison</p>
                  <p className="text-gray-800 font-semibold">
                    {order.shippingAddress || "Non spécifiée"}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Articles de la Commande
              </h2>
              <div className="divide-y divide-gray-200">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.product.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Quantité: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            {/* Status Update */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Mettre à Jour le Statut
              </h2>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-primary-600"
              >
                <option value="PENDING">En Attente</option>
                <option value="PROCESSING">En Traitement</option>
                <option value="SHIPPED">Expédiée</option>
                <option value="DELIVERED">Livrée</option>
                <option value="CANCELLED">Annulée</option>
                <option value="RETURNED">Retournée</option>
              </select>
              <button
                onClick={handleStatusUpdate}
                disabled={updating || newStatus === order.status}
                className="w-full px-4 py-2 bg-green-primary-600 text-white rounded-lg hover:bg-green-primary-700 transition disabled:opacity-50 font-semibold"
              >
                {updating ? "Mise à jour..." : "Mettre à Jour"}
              </button>
              {order.status === "PENDING" && (
                <button
                  onClick={handleValidateOrder}
                  disabled={updating}
                  className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-semibold"
                >
                  {updating ? "Validation..." : "Valider la commande"}
                </button>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Résumé</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Statut Actuel</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      order.status === "DELIVERED"
                        ? "bg-green-100 text-green-800"
                        : order.status === "SHIPPED"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "PROCESSING"
                        ? "bg-purple-100 text-purple-800"
                        : order.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Méthode de Paiement</span>
                  <span className="font-semibold">
                    {order.paymentMethod || "Non spécifiée"}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-semibold text-gray-800">Total</span>
                  <span className="text-lg font-bold text-green-primary-600">
                    ${order.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
