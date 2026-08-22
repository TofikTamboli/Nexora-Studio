import React from "react";
import { motion, type Variants } from "framer-motion";

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

interface AvailabilityCardProps {
  text: string;
  reducedMotion?: boolean;
  className?: string;
}

export const AvailabilityCard: React.FC<AvailabilityCardProps> = ({
  text,
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
        delay: reducedMotion ? 0 : 0.12,
        ease: EASE_BEZIER,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className={`availability-card ${className}`}
    >
      <span className="availability-text">
        {text}
      </span>

      {/* Pulsing Status Dot (12px) */}
      <div className="relative flex items-center justify-center shrink-0 w-3.5 h-3.5">
        {reducedMotion ? (
          <div className="w-[12px] h-[12px] rounded-full bg-[#22c55e]" />
        ) : (
          <motion.div
            className="w-[12px] h-[12px] rounded-full bg-[#22c55e]"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [1, 0.65, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </motion.div>
  );
};
