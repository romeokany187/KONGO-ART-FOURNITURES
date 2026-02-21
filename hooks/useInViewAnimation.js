import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Hook personnalisé pour gérer les animations au scroll
 * @param {Object} options - Options pour useInView
 * @returns {Object} { ref, isInView }
 */
export const useInViewAnimation = (options = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, // Animation une seule fois
    margin: "0px 0px -100px 0px", // Déclenche l'animation avant que l'élément soit visible
    initial: true, // Évite un rendu caché avant la première mesure
    ...options 
  });

  return { ref, isInView };
};
