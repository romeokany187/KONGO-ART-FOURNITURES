"use client";
import { motion } from "framer-motion";
import { sectionVariants } from "@/utils/animationVariants";

import HeroSection from "@/components/HeroSection";
import PartnersSection from "@/components/PartnersSection";
import OffersSection from "@/components/OffersSection";
import AboutSection from "@/components/AboutSection";
import HighlightsSection from "@/components/HighlightsSection";
import TeamSection from "@/components/TeamSection";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Home() {
  return (
    <main className="">
      <div className="xl:px-[10rem] lg:px-[5rem] md:px-[2rem] px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          variants={sectionVariants}
        >
          <HeroSection />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          variants={sectionVariants}
        >
          <HighlightsSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          variants={sectionVariants}
        >
          <PartnersSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          variants={sectionVariants}
        >
          <OffersSection />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          variants={sectionVariants}
        >
          <AboutSection />
        </motion.div>
        
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        variants={sectionVariants}
      >
        <TeamSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        variants={sectionVariants}
      >
        <NewsletterSignup />
      </motion.div>
    </main>
  );
}