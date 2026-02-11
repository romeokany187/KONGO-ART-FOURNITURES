"use client";
import { motion } from "framer-motion";

export default function EvenementsPage() {
  const events = [
    {
      title: "Grand Salon du Mobilier 2026",
      date: "15-17 Mars 2026",
      location: "Centre Expo Kinshasa",
      description: "Découvrez nos dernières collections et tendances",
      emoji: "🎪",
    },
    {
      title: "Atelier Design: Créer votre espace",
      date: "22 Février 2026",
      location: "Showroom KONGO",
      description: "Session interactive avec nos designers",
      emoji: "🎨",
    },
    {
      title: "Vente privée pour clients VIP",
      date: "14-16 Février 2026",
      location: "Flagship Store",
      description: "Accès exclusif à nos collections premium",
      emoji: "👑",
    },
    {
      title: "Conférence: Tendances 2026",
      date: "12 Février 2026",
      location: "En ligne",
      description: "Présentation des tendances du mobilier avec experts",
      emoji: "🎤",
    },
    {
      title: "Grand Ouverture Nouveau Showroom",
      date: "8 Février 2026",
      location: "Centre-Ville",
      description: "Célébration de l'ouverture avec réductions",
      emoji: "🎉",
    },
    {
      title: "Atelier Maintenance des Meubles",
      date: "1 Février 2026",
      location: "Showroom KAF",
      description: "Apprendre à entretenir vos meubles",
      emoji: "🔧",
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Événements</h1>
          <p className="text-green-primary-100 text-lg max-w-2xl mx-auto">
            Rejoignez-nous lors de nos événements exclusifs
          </p>
        </div>
      </motion.section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="bg-gradient-to-br from-green-primary-100 to-green-primary-50 h-32 flex items-center justify-center text-5xl">
                {event.emoji}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-green-primary-600 font-semibold">
                    📅 {event.date}
                  </p>
                  <p className="text-sm text-gray-600">
                    📍 {event.location}
                  </p>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {event.description}
                </p>
                <button className="w-full bg-green-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-green-primary-700 transition">
                  S'inscrire
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
