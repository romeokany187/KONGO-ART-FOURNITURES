"use client";
import { motion } from "framer-motion";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { fadeInVariants, slideInLeftVariants, slideInRightVariants } from "@/utils/animationVariants";

const ServiceCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 text-center group"
    >
      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

const services = [
  {
    icon: "🚚",
    title: "Livraison Premium",
    description: "Livraison rapide et sécurisée de vos meubles directement à domicile avec assurance complète.",
  },
  {
    icon: "🔧",
    title: "Maintenance & Réparation",
    description: "Service professionnel de maintenance et réparation pour assurer la longévité de vos meubles.",
  },
  {
    icon: "💡",
    title: "Consultation Gratuite",
    description: "Nos experts vous conseillent gratuitement pour choisir les meubles adaptés à vos besoins.",
  },
  {
    icon: "🎨",
    title: "Aménagement sur Mesure",
    description: "Conception personnalisée de votre espace avec solutions d'aménagement adaptées.",
  },
  {
    icon: "📦",
    title: "Emballage Sécurisé",
    description: "Emballage professionnel garantissant la protection de vos produits pendant le transport.",
  },
  {
    icon: "💳",
    title: "Options de Paiement",
    description: "Plusieurs modes de paiement flexibles pour votre commodité et sécurité.",
  },
];

export default function ServicesPage() {
  const { ref: headerRef, isInView: headerInView } = useInViewAnimation();
  const { ref: contentRef, isInView: contentInView } = useInViewAnimation();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-green-primary-600 to-green-primary-700 text-white py-16 px-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nos Services
          </h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Nous vous offrons une expérience complète avec des services de qualité pour tous vos besoins en mobilier
          </p>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={fadeInVariants}
          className="text-center mb-12"
        >
          <p className="text-green-primary-600 font-semibold text-sm uppercase tracking-widest">
            Nos services premium
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
            Tout ce dont vous avez besoin
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={contentRef}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            variants={fadeInVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Pourquoi nous choisir?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideInLeftVariants}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex gap-4">
                <span className="text-green-primary-600 text-2xl font-bold">✓</span>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Expertise reconnue</h3>
                  <p className="text-gray-600 text-sm">
                    Plus de 10 ans d'expérience dans le domaine du mobilier
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-green-primary-600 text-2xl font-bold">✓</span>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Qualité garantie</h3>
                  <p className="text-gray-600 text-sm">
                    Tous nos produits passent des contrôles de qualité rigoureux
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-green-primary-600 text-2xl font-bold">✓</span>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Support client 24/7</h3>
                  <p className="text-gray-600 text-sm">
                    Notre équipe est toujours disponible pour vous aider
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-green-primary-600 text-2xl font-bold">✓</span>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Prix compétitifs</h3>
                  <p className="text-gray-600 text-sm">
                    Meilleur rapport qualité-prix du marché
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideInRightVariants}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-primary-600 to-green-primary-700 text-white rounded-lg p-8 text-center"
            >
              <div className="space-y-4">
                <div>
                  <p className="text-4xl font-bold">500+</p>
                  <p className="text-green-100">Clients satisfaits</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">1000+</p>
                  <p className="text-green-100">Produits en stock</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">50+</p>
                  <p className="text-green-100">Villes desservies</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-primary-600 text-white py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Prêt à découvrir nos services?
          </h2>
          <p className="text-green-100 mb-8">
            Contactez-nous dès aujourd'hui pour une consultation gratuite
          </p>
          <button className="bg-white text-green-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-green-primary-50 transition-colors">
            Nous contacter
          </button>
        </motion.div>
      </section>
    </main>
  );
}
