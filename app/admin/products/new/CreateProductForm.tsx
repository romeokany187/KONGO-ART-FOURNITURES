"use client";

export default function CreateProductForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch('/api/admin/products', { 
        method: 'POST', 
        body: data 
      });
      
      if (response.ok) {
        window.location.href = '/admin/products';
      } else {
        alert('Erreur lors de la création du produit');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Erreur lors de la création du produit');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h1 style={{ marginTop: 0 }}>📦 Créer un produit</h1>
      <form id="create-product-form" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Nom du produit *</label>
          <input name="name" required style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Prix (€) *</label>
          <input name="price" type="number" step="0.01" required style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Catégorie</label>
          <input name="category" style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Description</label>
          <textarea name="description" rows={4} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>URL de l'image</label>
          <input name="image" style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Image (upload)</label>
          <input name="imageFile" type="file" accept="image/*" style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Stock</label>
          <input name="stock" type="number" defaultValue={0} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <button type="submit" style={{ padding: '10px 24px', background: '#48bb78', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', fontSize: 14 }}>✓ Créer le produit</button>
      </form>
    </div>
  );
}
