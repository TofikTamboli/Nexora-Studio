import React from "react";
import { motion, type Variants } from "framer-motion";

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

interface ProjectCTAProps {
  label: string;
  href?: string;
  reducedMotion?: boolean;
  canAnimate?: boolean;
  className?: string;
}

export const ProjectCTA: React.FC<ProjectCTAProps> = ({
  label,
  href = "#contact",
  reducedMotion = false,
  canAnimate = true,
  className = "",
}) => {
  const ctaVariants: Variants = {
    hidden: {
      opacity: reducedMotion ? 1 : 0,
      y: reducedMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : 0.6,
        delay: reducedMotion ? 0 : 0.4,
        ease: EASE_BEZIER,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={canAnimate ? "visible" : "hidden"}
      variants={ctaVariants}
      className="project-cta-wrapper w-full select-none"
    >
      <a
        href={href}
        className={`project-cta ${className}`}
        aria-label="Discuss your project with Nexora Studio"
      >
        <span className="project-cta-background" aria-hidden="true" />

        <span className="project-cta-content project-cta-content-base">
          <span>{label}</span>

          <span
            className="project-cta-arrow"
            aria-hidden="true"
          >
            →
          </span>
        </span>

        <span
          className="project-cta-content project-cta-content-inverse"
          aria-hidden="true"
        >
          <span>{label}</span>

          <span className="project-cta-arrow">
            →
          </span>
        </span>
      </a>
    </motion.div>
  );
};
