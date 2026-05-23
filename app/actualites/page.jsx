"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ActualitesPage() {
  const news = [
    {
      title: "Nouvelle collection printemps 2026 disponible",
      description: "Découvrez nos nouveaux designs pour la saison printemps",
      date: "10 Février 2026",
      priority: "Annonce majeure",
      emoji: "🎉",
    },
    {
      title: "Expansion dans 5 nouvelles villes",
      description: "KONGO ART FOURNITURES s'étend vers de nouveaux marchés",
      date: "8 Février 2026",
      priority: "Actualité importante",
      emoji: "📍",
    },
    {
      title: "Certificat ISO 9001 obtenu",
      description: "Reconnaissance officielle de notre engagement qualité",
      date: "5 Février 2026",
      priority: "Accomplissement",
      emoji: "🏆",
    },
    {
      title: "Partenariat avec designer international",
      description: "Collaboration exclusif pour une ligne de mobilier premium",
      date: "1 Février 2026",
      priority: "Partenariat",
      emoji: "🤝",
    },
    {
      title: "Vente flash: jusqu'à 50% de réduction",
      description: "Profitez de nos offres exceptionnelles cette semaine",
      date: "29 Janvier 2026",
      priority: "Promotion",
      emoji: "💰",
    },
    {
      title: "Nouveaux points de vente officiels",
      description: "Visitez nos showrooms pour découvrir les produits",
      date: "25 Janvier 2026",
      priority: "Ouverture",
      emoji: "🏪",
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
            Centre d'information
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Actualités</h1>
          <p className="text-green-100 text-lg max-w-3xl mx-auto">
            Toutes les annonces importantes sur nos collections, nos ouvertures et nos collaborations.
          </p>
        </div>
      </motion.section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2 rounded-full bg-green-primary-600 text-white text-sm font-semibold">
              Toutes
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition">
              Partenariats
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition">
              Nouvelles collections
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition">
              Promos
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {news.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 hover:border-green-primary-200 shadow-sm hover:shadow-md transition-all p-6 flex gap-4 items-start"
            >
              <div className="text-4xl flex-shrink-0">{item.emoji}</div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {item.title}
                  </h3>
                  <span className="text-xs font-bold text-green-primary-600 bg-green-primary-50 px-3 py-1 rounded">
                    {item.priority}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{item.date}</span>
                  <button className="text-sm font-semibold text-green-primary-600 hover:text-green-primary-700 transition">
                    Voir le detail
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 rounded-2xl bg-gradient-to-r from-green-primary-600 to-green-primary-700 p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Recevoir nos nouvelles en priorité</h2>
          <p className="text-green-100 mb-6">
            Contacte notre équipe pour être notifié des offres, promotions et nouveaux produits.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-green-primary-700 font-bold hover:bg-green-50 transition"
          >
            Contacter l'equipe
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
