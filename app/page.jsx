"use client";
import { motion } from "framer-motion";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { sectionVariants } from "@/utils/animationVariants";

import Hero from "@/components/Hero";
import Partenaire from "@/components/Partenaire";
import Offers from "@/components/Offers";
import About from "@/components/About";
import Agenda from "@/components/Agenda";
import Athletes from "@/components/Athletes";
import Contact from "@/components/Contact";

export default function Home() {
  // Utiliser le hook personnalisé pour chaque section
  const { ref: heroRef, isInView: heroInView } = useInViewAnimation();
  const { ref: agendaRef, isInView: agendaInView } = useInViewAnimation();
  const { ref: partenaireRef, isInView: partenaireInView } = useInViewAnimation();
  const { ref: offersRef, isInView: offersInView } = useInViewAnimation();
  const { ref: aboutRef, isInView: aboutInView } = useInViewAnimation();
  const { ref: athletesRef, isInView: athletesInView } = useInViewAnimation();
  const { ref: contactRef, isInView: contactInView } = useInViewAnimation();

  return (
    <main className="">
      <div className="xl:px-[10rem] lg:px-[5rem] md:px-[2rem] px-6">
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <Hero />
        </motion.div>
        
        <motion.div
          ref={agendaRef}
          initial="hidden"
          animate={agendaInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <Agenda />
        </motion.div>

        <motion.div
          ref={partenaireRef}
          initial="hidden"
          animate={partenaireInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <Partenaire />
        </motion.div>

        <motion.div
          ref={offersRef}
          initial="hidden"
          animate={offersInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <Offers />
        </motion.div>
        <motion.div
          ref={aboutRef}
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <About />
        </motion.div>
        
      </div>

      <motion.div
        ref={athletesRef}
        initial="hidden"
        animate={athletesInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <Athletes />
      </motion.div>

      <motion.div
        ref={contactRef}
        initial="hidden"
        animate={contactInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <Contact />
      </motion.div>
    </main>
  );
}