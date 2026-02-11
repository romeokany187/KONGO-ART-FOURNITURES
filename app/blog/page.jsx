"use client";
import { motion } from "framer-motion";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

export default function BlogPage() {
  const articles = [
    {
      title: "Les tendances du mobilier 2026",
      excerpt: "Découvrez les styles et designs qui dominent cette année",
      date: "11 Février 2026",
      category: "Tendances",
      emoji: "🎨",
    },
    {
      title: "Comment choisir le bon mobilier pour votre espace",
      excerpt: "Guide complet pour sélectionner des meubles adaptés",
      date: "8 Février 2026",
      category: "Guide",
      emoji: "📐",
    },
    {
      title: "Mobilier durable: investir pour l'avenir",
      excerpt: "Pourquoi choisir des meubles écologiques et durables",
      date: "5 Février 2026",
      category: "Écologie",
      emoji: "🌱",
    },
    {
      title: "Aménagement intérieur: créer votre style personnel",
      excerpt: "Conseils pratiques pour un intérieur qui vous ressemble",
      date: "1 Février 2026",
      category: "Décoration",
      emoji: "✨",
    },
    {
      title: "Maintenance des meubles: nos meilleurs conseils",
      excerpt: "Comment entretenir vos meubles pour une longévité maximale",
      date: "28 Janvier 2026",
      category: "Maintenance",
      emoji: "🔧",
    },
    {
      title: "Histoires de clients: transformations remarquables",
      excerpt: "Découvrez comment nos clients ont transformé leurs espaces",
      date: "25 Janvier 2026",
      category: "Témoignages",
      emoji: "🌟",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-green-primary-600 to-green-primary-700 text-white py-16 px-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Notre Blog</h1>
          <p className="text-green-primary-100 text-lg max-w-2xl mx-auto">
            Articles, conseils et tendances autour du mobilier
          </p>
        </div>
      </motion.section>

      {/* Articles */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group"
            >
              <div className="bg-gradient-to-br from-green-primary-100 to-green-primary-50 h-40 flex items-center justify-center text-6xl">
                {article.emoji}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-green-primary-600 text-xs font-bold uppercase">
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-xs">{article.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-green-primary-600 transition">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                <button className="text-green-primary-600 font-semibold text-sm hover:text-green-primary-700 transition">
                  Lire la suite →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
