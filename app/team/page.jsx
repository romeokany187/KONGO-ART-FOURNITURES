"use client";
import { motion } from "framer-motion";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

export default function TeamPage() {
  const { ref: headerRef, isInView: headerInView } = useInViewAnimation();

  const team = [
    {
      name: "Elkana Malik",
      role: "Fondateur & PDG",
      bio: "Visionnaire passionné par le design et la qualité",
      emoji: "👨‍💼",
    },
    {
      name: "Marie Dupont",
      role: "Directrice Design",
      bio: "Experte en création de mobilier contemporain",
      emoji: "👩‍💼",
    },
    {
      name: "Jean Bernard",
      role: "Chef Logistique",
      bio: "Spécialiste en gestion de chaîne d'approvisionnement",
      emoji: "👨‍💼",
    },
    {
      name: "Sophie Martin",
      role: "Responsable Client",
      bio: "Dédiée à la satisfaction de nos clients",
      emoji: "👩‍💼",
    },
    {
      name: "Paul Rousseau",
      role: "Responsable Production",
      bio: "Maître dans la fabrication et le contrôle qualité",
      emoji: "👨‍🔧",
    },
    {
      name: "Claire Laurent",
      role: "Responsable Marketing",
      bio: "Créative dans la promotion de nos produits",
      emoji: "👩‍💻",
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Notre Équipe</h1>
          <p className="text-green-primary-100 text-lg max-w-2xl mx-auto">
            Les talents et passion qui font fonctionner KONGO ART FOURNITURES
          </p>
        </div>
      </motion.section>

      {/* Team Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          ref={headerRef}
          initial="hidden"
          whileInView="visible"
          variants={{ visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800">
            Rencontrez notre équipe
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center"
            >
              <div className="text-6xl mb-4">{member.emoji}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {member.name}
              </h3>
              <p className="text-green-primary-600 font-semibold mb-3">
                {member.role}
              </p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
