"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-primary-600"></div>
      </div>
    );
  }

  if (!session || (session.user)?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  useEffect(() => {
    fetchDashboardData();
  }, [activeTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      if (activeTab === "overview") {
        const ordersRes = await fetch("/api/orders");
        const ordersData = await ordersRes.json();

        const productsRes = await fetch("/api/products?take=1000");
        const productsData = await productsRes.json();

        if (ordersData.data) {
          const totalRevenue = (ordersData.data).reduce(
            (sum, order) => sum + order.totalPrice,
            0
          );
          setStats({
            totalUsers: 0,
            totalOrders: ordersData.data.length,
            totalProducts: productsData.data.length,
            totalRevenue,
          });
          setOrders(ordersData.data);
        }
      } else if (activeTab === "products") {
        const res = await fetch("/api/products?take=1000");
        const data = await res.json();
        setProducts(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Panel Administrateur
          </h1>
          <p className="text-gray-600 mt-2">Gestion du site KONGO ART FOURNITURES</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">
                    Commandes
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {stats.totalOrders}
                  </p>
                </div>
                <div className="text-4xl">📦</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">
                    Produits
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {stats.totalProducts}
                  </p>
                </div>
                <div className="text-4xl">🛍️</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">
                    Revenus
                  </p>
                  <p className="text-3xl font-bold text-green-primary-600 mt-2">
                    ${stats.totalRevenue.toFixed(2)}
                  </p>
                </div>
                <div className="text-4xl">💰</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">
                    Utilisateurs
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {stats.totalUsers}
                  </p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-semibold transition ${
              activeTab === "overview"
                ? "text-green-primary-600 border-b-2 border-green-primary-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Aperçu
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 font-semibold transition ${
              activeTab === "orders"
                ? "text-green-primary-600 border-b-2 border-green-primary-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Commandes
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 font-semibold transition ${
              activeTab === "products"
                ? "text-green-primary-600 border-b-2 border-green-primary-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Produits
          </button>
        </div>

        {/* Orders Table */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Toutes les Commandes
              </h2>
            </div>
            {loading ? (
              <div className="p-8 text-center">Chargement...</div>
            ) : orders.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Aucune commande
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Montant
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {order.id.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="text-gray-800 font-semibold">
                            {order.user.name}
                          </div>
                          <div className="text-gray-600 text-xs">
                            {order.user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-green-primary-600">
                          ${order.totalPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === "DELIVERED"
                                ? "bg-green-100 text-green-800"
                                : order.status === "SHIPPED"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <Link href={`/admin/orders/${order.id}`}>
                            <button className="text-green-primary-600 hover:text-green-primary-700 font-semibold">
                              Détails
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Products Table */}
        {activeTab === "products" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Tous les Produits
              </h2>
              <Link href="/admin/products/new">
                <button className="px-4 py-2 bg-green-primary-600 text-white rounded-lg hover:bg-green-primary-700 transition">
                  + Nouveau Produit
                </button>
              </Link>
            </div>
            {loading ? (
              <div className="p-8 text-center">Chargement...</div>
            ) : products.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Aucun produit
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Prix
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-green-primary-600 font-semibold">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              product.stock > 10
                                ? "bg-green-100 text-green-800"
                                : product.stock > 0
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm space-x-2">
                          <Link href={`/admin/products/${product.id}`}>
                            <button className="text-green-primary-600 hover:text-green-primary-700 font-semibold inline-block mr-2">
                              Modifier
                            </button>
                          </Link>
                          <button className="text-red-600 hover:text-red-700 font-semibold">
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
