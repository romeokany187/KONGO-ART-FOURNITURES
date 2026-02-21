"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      if (data.data) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "SHIPPED":
        return "bg-blue-100 text-blue-800";
      case "PROCESSING":
        return "bg-purple-100 text-purple-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Mes Commandes
          </h1>
          <p className="text-gray-600 mt-2">
            Historique et suivi de vos commandes
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement de vos commandes...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">
              Vous n'avez pas encore de commandes
            </p>
              <Link href="/produits">
              <button className="px-6 py-2 bg-green-primary-600 text-white rounded-lg hover:bg-green-primary-700 transition">
                Explorer nos Produits
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition"
              >
                <div
                  className="px-6 py-4 cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    setSelectedOrder(selectedOrder?.id === order.id ? null : order)
                  }
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600">
                        Commande #{order.id.slice(0, 8)}
                      </h3>
                      <p className="text-gray-800 font-semibold mt-1">
                        ${order.totalPrice.toFixed(2)}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                      </p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      <p className="text-gray-600 text-sm mt-2">
                        {order.items.length} article
                        {order.items.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expanded Order Details */}
                {selectedOrder?.id === order.id && (
                  <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Détails de la Commande
                    </h4>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-sm text-gray-700"
                        >
                          <span>
                            {item.product.name} x {item.quantity}
                          </span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                      <span className="font-semibold text-gray-800">
                        Total:
                      </span>
                      <span className="font-bold text-green-primary-600">
                        ${order.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
