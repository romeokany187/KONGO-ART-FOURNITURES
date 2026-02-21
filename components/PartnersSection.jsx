"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const PartnersSection = () => {
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
    <div className="lg:p-6 mt-14 flex flex-col gap-10">
      <div className="flex flex-col gap-4 justify-center lg:items-center md:items-center items-start lg:text-center md:text-center text-left">
        <p className="text-sm text-green-primary-600 font-medium">
          NOS PARTENAIRES
        </p>
        <h1 className="lg:text-4xl text-2xl font-extrabold text-gray-800">
          Nos partenaires stratégiques
        </h1>
        <p className="text-justify">
          Les entreprises de confiance qui contribuent à notre succès et nous aident à offrir la meilleure qualité de service.
        </p>
      </div>

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

      <div className="flex justify-center mt-8">
        <Link href="/partenaires">
          <button
            className="lg:p-3 px-12 py-3 text-sm font-medium text-base-secondary border border-green-primary-600 
            bg-green-primary-600 rounded-lg transition hover:bg-base-secondary hover:text-green-primary-600"
          >
            Voir tous les partenaires
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PartnersSection;
