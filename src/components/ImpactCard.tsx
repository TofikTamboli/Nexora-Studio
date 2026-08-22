import React, { useRef, useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import showreelMp4 from "../assets/nexora-showreel.mp4";

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

interface ImpactCardProps {
  headline?: string;
  description?: string;
  reducedMotion?: boolean;
  canAnimate?: boolean;
  className?: string;
}

export const ImpactCard: React.FC<ImpactCardProps> = ({
  reducedMotion = false,
  canAnimate = true,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!canAnimate) return;
    videoRef.current?.play().catch(() => {
      // Autoplay might be handled/deferred by browser
    });
  }, [canAnimate]);

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
      animate={canAnimate ? "visible" : "hidden"}
      variants={cardVariants}
      className={`impact-video-card ${className}`}
    >
      <video
        ref={videoRef}
        className={`impact-video ${isReady ? "is-ready" : ""}`}
        onCanPlay={() => setIsReady(true)}
        autoPlay={!reducedMotion}
        muted
        loop={!reducedMotion}
        playsInline
        preload="metadata"
        aria-label="Nexora Studio creative showreel"
      >
        <source src={showreelMp4} type="video/mp4" />
        Your browser does not support this video.
      </video>
    </motion.div>
  );
};
