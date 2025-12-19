"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

import Hero from "@/components/Hero";
import Partenaire from "@/components/Partenaire";
import Offers from "@/components/Offers";
import About from "@/components/About";
import Agenda from "@/components/Agenda";
import Athletes from "@/components/Athletes";
import Contact from "@/components/Contact";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
};

export default function Home() {
  const heroRef = useRef(null);
  const partenaireRef = useRef(null);
  const offersRef = useRef(null);
  const AboutRef = useRef(null);
  const agendaRef = useRef(null);
  const athletesRef = useRef(null);
  const contactRef = useRef(null);

  const heroInView = useInView(heroRef, { once: false });
  const partenaireInView = useInView(partenaireRef, { once: false });
  const offersInView = useInView(offersRef, { once: false });
  const AboutInView = useInView(AboutRef, { once: false });
  const agendaInView = useInView(agendaRef, { once: false });
  const athletesInView = useInView(athletesRef, { once: false });
  const contactInView = useInView(contactRef, { once: false });

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
          ref={AboutRef}
          initial="hidden"
          animate={AboutInView ? "visible" : "hidden"}
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