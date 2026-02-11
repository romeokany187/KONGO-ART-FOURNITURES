"use client";
import { motion } from "framer-motion";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

export default function PartenairesPage() {
  const partners = [
    {
      name: "FurnitureCo",
      category: "Fournisseur",
      description: "Leader en matériaux de qualité supérieure",
      emoji: "🏭",
    },
    {
      name: "TransportExpress",
      category: "Logistique",
      description: "Livraison fiable et rapide",
      emoji: "🚚",
    },
    {
      name: "DesignHub",
      category: "Design",
      description: "Innovation en conception de meubles",
      emoji: "🎨",
    },
    {
      name: "TechSolutions",
      category: "Technologie",
      description: "Système de gestion moderne",
      emoji: "💻",
    },
    {
      name: "SustainableWood",
      category: "Matériaux",
      description: "Bois écologique et durable",
      emoji: "🌿",
    },
    {
      name: "QualityControl",
      category: "Qualité",
      description: "Certification et conformité",
      emoji: "✅",
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Partenaires</h1>
          <p className="text-green-primary-100 text-lg max-w-2xl mx-auto">
            Les entreprises de confiance qui contribuent à notre succès
          </p>
        </div>
      </motion.section>

      {/* Partners Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{ visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800">
            Nos partenaires stratégiques
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center"
            >
              <div className="text-5xl mb-4">{partner.emoji}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {partner.name}
              </h3>
              <p className="text-green-primary-600 font-semibold mb-3 text-sm">
                {partner.category}
              </p>
              <p className="text-gray-600 text-sm">{partner.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
