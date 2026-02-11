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
    margin: "-100px", // Déclenche l'animation avant que l'élément soit visible
    ...options 
  });

  return { ref, isInView };
};
