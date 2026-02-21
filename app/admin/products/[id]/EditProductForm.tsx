"use client";

import React from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string | null;
  image?: string | null;
  stock?: number | null;
};

export default function EditProductForm({ product }: { product: Product }) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const data = new FormData(f);
    await fetch(`/api/admin/products/${product.id}`, {
      method: "PUT",
      body: data,
    });
    window.location.href = "/admin/products";
  }

  async function handleDelete() {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;
    await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
    window.location.href = "/admin/products";
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: 8 }}>
          Nom du produit *
        </label>
        <input
          name="name"
          defaultValue={product.name}
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
          Prix (€) *
        </label>
        <input
          name="price"
          type="number"
          step="0.01"
          defaultValue={product.price}
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
          Catégorie
        </label>
        <input
          name="category"
          defaultValue={product.category}
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
          defaultValue={product.description || ""}
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
          URL de l'image
        </label>
        <input
          name="image"
          defaultValue={product.image || ""}
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
          Image (upload)
        </label>
        <input name="imageFile" type="file" accept="image/*" style={{ width: "100%" }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: 8 }}>
          Stock
        </label>
        <input
          name="stock"
          type="number"
          defaultValue={product.stock || 0}
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
