"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CartPage() {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

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
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart");
      const data = await response.json();
      if (data.data) {
        setCart(data.data);
        const itemIds = data.data.items?.map((item) => item.id) || [];
        setSelectedIds((prev) => {
          if (!prev.length) return itemIds;
          const preserved = prev.filter((id) => itemIds.includes(id));
          return preserved.length ? preserved : itemIds;
        });
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (itemId) => {
    setUpdating(true);
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleCheckout = async () => {
    setUpdating(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemIds: selectedIds }),
      });

      if (response.ok) {
        alert("Commande créée avec succès!");
        fetchCart();
        redirect("/orders");
      } else {
        alert("Erreur lors de la création de la commande");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Erreur lors de la création de la commande");
    } finally {
      setUpdating(false);
    }
  };

  const selectedItems = cart?.items.filter((item) => selectedIds.includes(item.id)) || [];
  const subtotal =
    selectedItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ) || 0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Mon Panier
          </h1>
          <p className="text-gray-600 mt-2">
            Vérifiez et modifiez vos articles
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement de votre panier...</p>
          </div>
        ) : !cart || cart.items.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">Votre panier est vide</p>
            <Link href="/produits">
              <button className="px-6 py-2 bg-green-primary-600 text-white rounded-lg hover:bg-green-primary-700 transition">
                Continuer vos Achats
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">
                      Articles ({cart.items.length})
                    </h2>
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === cart.items.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds(cart.items.map((item) => item.id));
                          } else {
                            setSelectedIds([]);
                          }
                        }}
                      />
                      Tout sélectionner
                    </label>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="px-6 py-4 flex gap-4 hover:bg-gray-50"
                    >
                      <div className="flex items-start pt-1">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={(e) => {
                            setSelectedIds((prev) =>
                              e.target.checked
                                ? [...prev, item.id]
                                : prev.filter((id) => id !== item.id)
                            );
                          }}
                        />
                      </div>
                      {item.product.image && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {item.product.name}
                        </h3>
                        <p className="text-green-primary-600 font-semibold mt-1">
                          ${item.product.price.toFixed(2)}
                        </p>

                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={updating}
                            className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                          >
                            −
                          </button>
                          <span className="px-4 text-gray-700 font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={updating}
                            className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-gray-800">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={updating}
                          className="text-red-600 hover:text-red-700 text-sm font-semibold mt-2 disabled:opacity-50"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Résumé
                </h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Sous-total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Taxes (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between text-gray-800 font-bold">
                    <span>Total</span>
                    <span className="text-green-primary-600 text-lg">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={updating || selectedItems.length === 0}
                  className="w-full px-4 py-3 bg-green-primary-600 text-white rounded-lg hover:bg-green-primary-700 transition font-semibold disabled:opacity-50"
                >
                  {updating ? "Traitement..." : "Commander la sélection"}
                </button>

                <Link href="/produits" className="block mt-3">
                  <button className="w-full px-4 py-3 border border-green-primary-600 text-green-primary-600 rounded-lg hover:bg-green-primary-50 transition font-semibold">
                    Continuer les Achats
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
