"use client";
import { motion } from "framer-motion";
import Link from "next/link";

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
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-green-primary-600 via-green-primary-700 to-emerald-700 text-white py-16 px-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="uppercase tracking-[0.25em] text-xs font-semibold text-green-100 mb-3">
            Ressources & conseils
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Notre Blog</h1>
          <p className="text-green-100 text-lg max-w-3xl mx-auto">
            Articles, guides pratiques et tendances pour aménager vos espaces avec élégance.
          </p>
        </div>
      </motion.section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden mb-10"
        >
          <div className="grid lg:grid-cols-2">
            <div className="bg-gradient-to-br from-green-primary-100 to-green-primary-50 min-h-[220px] flex items-center justify-center text-7xl">
              {articles[0].emoji}
            </div>
            <div className="p-8">
              <span className="inline-flex px-3 py-1 rounded-full bg-green-primary-50 text-green-primary-700 text-xs font-bold uppercase tracking-widest">
                Article en vedette
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 mb-3">
                {articles[0].title}
              </h2>
              <p className="text-gray-600 mb-4">{articles[0].excerpt}</p>
              <p className="text-sm text-gray-500 mb-6">{articles[0].date}</p>
              <button className="px-5 py-3 rounded-lg bg-green-primary-600 text-white font-semibold hover:bg-green-primary-700 transition">
                Lire l'article
              </button>
            </div>
          </div>
        </motion.article>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-green-primary-200 transition-all overflow-hidden cursor-pointer group"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Une question specifique ?</h3>
          <p className="text-gray-600 mb-6">
            Notre equipe peut vous conseiller gratuitement sur vos choix de meubles.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-green-primary-600 text-white font-bold hover:bg-green-primary-700 transition"
          >
            Decouvrir nos services
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
