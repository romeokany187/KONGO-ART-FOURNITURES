"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Quels sont vos délais de livraison?",
      answer:
        "Nos délais standard sont de 5 à 10 jours ouvrables. Pour les commandes spéciales, nous vous fournirons une estimation précise.",
    },
    {
      question: "Acceptez-vous les retours?",
      answer:
        "Oui, nous acceptons les retours dans les 30 jours suivant la livraison, sous certaines conditions. Veuillez vérifier nos conditions de retour.",
    },
    {
      question: "Proposez-vous un service de livraison gratuite?",
      answer:
        "La livraison gratuite est offerte pour les commandes supérieures à 500$. Sinon, des frais de livraison s'appliquent selon la distance.",
    },
    {
      question: "Pouvez-vous fabriquer des meubles sur mesure?",
      answer:
        "Absolutement! Nous proposons des services de fabrication sur mesure. Contactez notre équipe de design pour discuter de votre projet.",
    },
    {
      question: "Offrez-vous des garanties sur vos produits?",
      answer:
        "Oui, tous nos meubles sont couverts par une garantie de 2 ans contre les défauts de fabrication.",
    },
    {
      question: "Quel est votre horaire d'ouverture?",
      answer:
        "Nous sommes ouverts du lundi au vendredi de 9h à 18h, et le samedi de 10h à 16h.",
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
            Aide & assistance
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">FAQ</h1>
          <p className="text-green-primary-100 text-lg max-w-3xl mx-auto">
            Les réponses rapides aux questions les plus fréquentes sur nos services et nos commandes.
          </p>
        </div>
      </motion.section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-200 rounded-2xl p-5 mb-8 shadow-sm"
        >
          <label htmlFor="faq-search" className="block text-sm font-semibold text-gray-700 mb-2">
            Rechercher une question
          </label>
          <input
            id="faq-search"
            type="text"
            placeholder="Ex: livraison, retour, garantie..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
              >
                <h3 className="font-bold text-gray-800">{faq.question}</h3>
                <span className="text-green-primary-600 text-2xl font-bold">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 py-4 bg-gray-50 border-t border-gray-200"
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl bg-gradient-to-r from-green-primary-600 to-green-primary-700 text-white p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Tu n'as pas trouve ta reponse ?</h2>
          <p className="text-green-100 mb-6">
            Ecris-nous directement et notre equipe t'accompagne dans les plus brefs delais.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-green-primary-700 font-bold hover:bg-green-50 transition"
          >
            Contacter le support
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
