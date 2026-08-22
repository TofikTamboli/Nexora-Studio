import React from "react";
import { motion, type Variants } from "framer-motion";
import type { HeadlineConfig } from "../types";

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

interface HeroStatementProps {
  eyebrow: string;
  headline: HeadlineConfig;
  subheadline: string;
  subheadlineDesktopLines: string[];
  reducedMotion?: boolean;
}

export const HeroStatement: React.FC<HeroStatementProps> = ({
  eyebrow,
  headline,
  subheadline,
  subheadlineDesktopLines,
  reducedMotion = false,
}) => {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.09,
        delayChildren: reducedMotion ? 0 : 0.15,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: {
      y: reducedMotion ? 0 : 80,
      opacity: reducedMotion ? 1 : 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0 : 0.85,
        ease: EASE_BEZIER,
      },
    },
  };

  const subheadlineVariants: Variants = {
    hidden: {
      opacity: reducedMotion ? 1 : 0,
      y: reducedMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : 0.7,
        delay: reducedMotion ? 0 : 0.55,
        ease: EASE_BEZIER,
      },
    },
  };

  const eyebrowVariants: Variants = {
    hidden: {
      opacity: reducedMotion ? 1 : 0,
      y: reducedMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : 0.6,
        delay: reducedMotion ? 0 : 0.05,
        ease: EASE_BEZIER,
      },
    },
  };

  return (
    <section
      aria-label="Agency Overview"
      className="hero-statement"
    >
      {/* Eyebrow Label */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={eyebrowVariants}
        className="hero-eyebrow"
      >
        <span>{eyebrow}</span>
      </motion.div>

      {/* Screen Reader Accessible Single H1 */}
      <h1 className="sr-only">{headline.accessibleText}</h1>

      {/* Visual Headline (Desktop: 4 lines with reveal wrappers; Mobile: fluid wrap) */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        aria-hidden="true"
        className="hero-title"
      >
        {/* Desktop / Tablet Structured Lines */}
        <div className="hidden md:flex flex-col">
          {headline.desktopLines.map((line, index) => (
            <div
              key={index}
              className="overflow-hidden pb-1 -mb-1"
            >
              <motion.span
                variants={lineVariants}
                className="block font-sans font-normal text-[#090909] select-none"
              >
                {line}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Mobile Fluid Wrapping */}
        <div className="block md:hidden overflow-hidden">
          <motion.div
            variants={lineVariants}
            className="font-sans font-normal text-[#090909]"
          >
            {headline.accessibleText}
          </motion.div>
        </div>
      </motion.div>

      {/* Subheadline */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={subheadlineVariants}
        className="hero-subheadline"
      >
        {/* Desktop lines */}
        <p className="hidden sm:block font-sans font-normal">
          {subheadlineDesktopLines[0]}
          <br />
          {subheadlineDesktopLines[1]}
        </p>

        {/* Mobile fluid */}
        <p className="block sm:hidden font-sans font-normal text-[16px] sm:text-[18px]">
          {subheadline}
        </p>
      </motion.div>
    </section>
  );
};
