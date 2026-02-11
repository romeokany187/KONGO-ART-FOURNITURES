"use client";
import { motion } from "framer-motion";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { fadeInVariants, slideInLeftVariants, slideInRightVariants } from "@/utils/animationVariants";

const TeamMember = ({ name, role, image, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="text-center"
  >
    <div className="bg-gradient-to-br from-green-primary-600 to-green-primary-700 rounded-lg h-48 mb-4 flex items-center justify-center text-white text-6xl">
      {image}
    </div>
    <h3 className="font-bold text-lg text-gray-800">{name}</h3>
    <p className="text-green-primary-600 text-sm">{role}</p>
  </motion.div>
);

export default function AProposPage() {
  const { ref: missionRef, isInView: missionInView } = useInViewAnimation();
  const { ref: visionRef, isInView: visionInView } = useInViewAnimation();

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
            À Propos de Nous
          </h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Découvrez l'histoire et la passion qui animent KIVU ART & CONFORT
          </p>
        </div>
      </motion.section>

      {/* Notre Histoire */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={slideInLeftVariants}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-green-primary-600 to-green-primary-700 rounded-lg h-96 flex items-center justify-center text-white text-8xl">
              📖
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={slideInRightVariants}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-green-primary-600 font-semibold uppercase text-sm tracking-widest">
              Notre Histoire
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Une passion pour le confort et la qualité
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Fondée en 2014, KIVU ART & CONFORT est née d'une vision simple : 
              proposer des meubles de qualité supérieure qui allient esthétique, confort et durabilité.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Au fil des années, nous avons gagné la confiance de plus de 500 clients satisfaits 
              en offrant un service exceptionnel et des produits soigneusement sélectionnés.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Aujourd'hui, nous desservons plus de 50 villes avec un engagement inébranlable 
              envers l'excellence et la satisfaction de nos clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              ref={missionRef}
              initial="hidden"
              animate={missionInView ? "visible" : "hidden"}
              variants={fadeInVariants}
              className="bg-gradient-to-br from-green-primary-50 to-green-primary-100 rounded-lg p-8 border-l-4 border-green-primary-600"
            >
              <p className="text-green-primary-600 font-bold uppercase text-sm tracking-widest mb-3">
                Notre Mission
              </p>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Transformer vos espaces
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Fournir des solutions de mobilier innovantes et durables qui transforment 
                vos espaces de vie et de travail en environnements confortables, fonctionnels et inspirants.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              ref={visionRef}
              initial="hidden"
              animate={visionInView ? "visible" : "hidden"}
              variants={fadeInVariants}
              className="bg-gradient-to-br from-green-primary-600 to-green-primary-700 text-white rounded-lg p-8"
            >
              <p className="font-bold uppercase text-sm tracking-widest mb-3 text-green-100">
                Notre Vision
              </p>
              <h3 className="text-2xl font-bold mb-4">
                Leader régional incontournable
              </h3>
              <p className="text-green-100 leading-relaxed">
                Devenir la référence régionale en matière de qualité, de service et d'innovation 
                dans l'industrie du mobilier.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-green-primary-600 font-semibold uppercase text-sm tracking-widest">
            Nos Valeurs
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
            Ce qui nous guide
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "⭐",
              title: "Excellence",
              description: "Nous recherchons constamment la perfection dans chaque détail",
            },
            {
              icon: "🤝",
              title: "Intégrité",
              description: "L'honnêteté et la transparence sont au cœur de nos relations",
            },
            {
              icon: "♻️",
              title: "Durabilité",
              description: "Responsabilité envers l'environnement et les générations futures",
            },
            {
              icon: "💡",
              title: "Innovation",
              description: "Créativité et amélioration constante pour mieux servir",
            },
            {
              icon: "❤️",
              title: "Passion",
              description: "L'amour de ce que nous faisons transparaît dans nos produits",
            },
            {
              icon: "🎯",
              title: "Professionnalisme",
              description: "Excellence et expertise dans tout ce que nous entreprrenons",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
            >
              <p className="text-4xl mb-4">{value.icon}</p>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-green-primary-600 font-semibold uppercase text-sm tracking-widest">
              Notre Équipe
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              Les talents derrière KIVU
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            <TeamMember name="Elkana Malik" role="Fondateur & PDG" image="👨‍💼" delay={0} />
            <TeamMember name="Marie Dupont" role="Directrice Design" image="👩‍💼" delay={0.1} />
            <TeamMember name="Jean Bernard" role="Chef Logistique" image="👨‍💼" delay={0.2} />
            <TeamMember name="Sophie Martin" role="Responsable Client" image="👩‍💼" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-green-primary-600 to-green-primary-700 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10+", label: "Années d'expérience" },
              { number: "500+", label: "Clients satisfaits" },
              { number: "1000+", label: "Produits disponibles" },
              { number: "50+", label: "Villes desservies" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl font-bold">{stat.number}</p>
                <p className="text-green-100 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Rejoignez notre communauté
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez pourquoi tant de clients nous font confiance et trouvez le mobilier parfait pour votre espace
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
              Explorer nos produits
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors">
              Nous contacter
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
