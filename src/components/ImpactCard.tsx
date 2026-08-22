import React from "react";
import { motion, type Variants } from "framer-motion";

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

interface ImpactCardProps {
  headline: string;
  description: string;
  reducedMotion?: boolean;
  className?: string;
}

export const ImpactCard: React.FC<ImpactCardProps> = ({
  headline,
  description,
  reducedMotion = false,
  className = "",
}) => {
  const cardVariants: Variants = {
    hidden: {
      opacity: reducedMotion ? 1 : 0,
      x: reducedMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: reducedMotion ? 0 : 0.7,
        ease: EASE_BEZIER,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className={`impact-card ${className}`}
    >
      <div className="flex flex-col">
        <h2 className="impact-title whitespace-normal sm:whitespace-nowrap">
          {headline}
        </h2>
        <p className="impact-subtext">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
