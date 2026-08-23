import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { allProjects } from "./workData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MobileWorkMasonryProps {
  reducedMotion?: boolean;
}

const aspectRatios = ["4 / 5", "1 / 1", "3 / 4", "4 / 3", "5 / 7", "1 / 1"];

export const MobileWorkMasonry: React.FC<MobileWorkMasonryProps> = ({
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") return;

    // Only run entrance scrollTrigger on mobile viewports
    if (window.innerWidth >= 768) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".mobile-project-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div className="mobile-work-wrapper" ref={containerRef}>
      <div className="mobile-work-grid">
        {allProjects.map((project, idx) => {
          const ratio = aspectRatios[idx % aspectRatios.length];
          return (
            <a
              key={project.id}
              href={project.href}
              className={`mobile-project-card mobile-project-card--${project.theme}`}
            >
              <div
                className="mobile-project-media"
                style={{ aspectRatio: ratio }}
              >
                <img
                  src={project.image}
                  alt={project.altText}
                  className="mobile-project-image"
                  loading="lazy"
                  decoding="async"
                />
                <span className="mobile-project-overlay" aria-hidden="true" />
                <span className="mobile-project-number">{project.number}</span>
              </div>

              <div className="mobile-project-footer">
                <div className="mobile-project-info">
                  <h3 className="mobile-project-title">{project.title}</h3>
                  <p className="mobile-project-category">{project.category}</p>
                </div>

                <div className="mobile-project-action" aria-hidden="true">
                  <span className="mobile-project-arrow-button">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
