"use client";
import { useState, useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { cartApi, productsApi } from "@/lib/api";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";

export default function ProduitsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [priceRange, setPriceRange] = useState(500);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [cartError, setCartError] = useState("");
  const { data: session } = useSession();

  useEffect(()=>{
    async function loadCart(){
      if (!session) return;
      try{
        const res = await cartApi.get();
        const items = res.data?.items || [];
        const count = items.reduce((s, it) => s + (it.quantity || 0), 0);
        setCartCount(count);
      }catch(err){
        console.error('Error fetching cart count', err);
      }
    }
    loadCart();
  },[session]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await productsApi.getAll();
        setProducts(res.products || []);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setProductsLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Filtrer et trier les produits
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtrer par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filtrer par prix
    filtered = filtered.filter((p) => p.price <= priceRange);

    // Trier
    switch (selectedSort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        // Simulation: trier par stock (les plus en stock sont les plus populaires)
        filtered.sort((a, b) => b.stock - a.stock);
        break;
      case "newest":
      default:
        // Les produits restent dans l'ordre initial
        break;
    }

    return filtered;
  }, [products, selectedCategory, selectedSort, priceRange]);

  const handleAddToCart = async (product) => {
    try {
      // If not authenticated, redirect to signin (client-side)
      if (!session) {
        window.location.href = '/auth/signin';
        return;
      }

      const res = await cartApi.addItem(product.id, 1);
      // res.data is the updated cart
      const items = res.data?.items || [];
      const count = items.reduce((s, it) => s + (it.quantity || 0), 0);
      setCartCount(count);
      setShowCartNotification(true);
      setTimeout(() => setShowCartNotification(false), 2000);
    } catch (err) {
      console.error('Add to cart error', err);
      const message = err?.message || "Erreur lors de l'ajout au panier";
      setCartError(message);
      setTimeout(() => setCartError(""), 2500);
      // If API returned unauthorized, redirect to signin
      try {
        if (err.message && err.message.toLowerCase().includes('unauthorized')) {
          window.location.href = '/auth/signin';
        }
      } catch (e) {}
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-green-primary-600 to-green-primary-700 text-white py-12 px-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Notre Catalogue de Produits
          </h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Découvrez notre sélection complète de meubles de qualité pour votre maison, bureau ou établissement
          </p>
        </div>
      </motion.section>

      {/* Notification du panier */}
      {showCartNotification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 bg-green-primary-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          ✓ Produit ajouté au panier!
        </motion.div>
      )}
      {cartError && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          {cartError}
        </motion.div>
      )}

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filtres */}
          <div className="lg:col-span-1">
            <ProductFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedSort={selectedSort}
              onSortChange={setSelectedSort}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
            />
          </div>

          {/* Produits */}
          <div className="lg:col-span-3">
            {/* Info */}
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""} trouvé{filteredProducts.length !== 1 ? "s" : ""}
              </h2>
              {cartCount > 0 && (
                <Link href="/cart">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-green-primary-600 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer"
                  >
                    Panier: {cartCount} article{cartCount !== 1 ? "s" : ""}
                  </motion.div>
                </Link>
              )}
            </div>

            {/* Grille de produits */}
            {productsLoading ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-primary-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Chargement des produits...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <p className="text-xl text-gray-600 mb-4">
                  Aucun produit ne correspond à vos critères
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange(500);
                  }}
                  className="bg-green-primary-600 text-white px-6 py-2 rounded-lg hover:bg-green-primary-700 transition"
                >
                  Réinitialiser les filtres
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
