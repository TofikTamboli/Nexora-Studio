import React from "react";
import nexoraLogo from "../assets/nexora-studio-logo.png";

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "",
}) => {
  return (
    <a
      href="/"
      className={`brand-logo ${className}`}
      aria-label="Nexora Studio home"
    >
      <img
        src={nexoraLogo}
        alt="Nexora Studio"
        className="brand-logo-image"
        width="240"
        height="64"
        decoding="async"
        fetchPriority="high"
      />
    </a>
  );
};
