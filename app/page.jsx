"use client";
import { motion } from "framer-motion";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { sectionVariants } from "@/utils/animationVariants";

import HeroSection from "@/components/HeroSection";
import PartnersSection from "@/components/PartnersSection";
import OffersSection from "@/components/OffersSection";
import AboutSection from "@/components/AboutSection";
import HighlightsSection from "@/components/HighlightsSection";
import TeamSection from "@/components/TeamSection";
import NewsletterSignup from "@/components/NewsletterSignup";

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
          <HeroSection />
        </motion.div>
        
        <motion.div
          ref={agendaRef}
          initial="hidden"
          animate={agendaInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <HighlightsSection />
        </motion.div>

        <motion.div
          ref={partenaireRef}
          initial="hidden"
          animate={partenaireInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <PartnersSection />
        </motion.div>

        <motion.div
          ref={offersRef}
          initial="hidden"
          animate={offersInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <OffersSection />
        </motion.div>
        <motion.div
          ref={aboutRef}
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <AboutSection />
        </motion.div>
        
      </div>

      <motion.div
        ref={athletesRef}
        initial="hidden"
        animate={athletesInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <TeamSection />
      </motion.div>

      <motion.div
        ref={contactRef}
        initial="hidden"
        animate={contactInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <NewsletterSignup />
      </motion.div>
    </main>
  );
}