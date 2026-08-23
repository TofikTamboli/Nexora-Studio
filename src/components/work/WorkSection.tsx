import React, { useRef, useImperativeHandle, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { topRowProjects, bottomRowProjects } from "./workData";
import { WorkMarquee } from "./WorkMarquee";
import { MobileWorkMasonry } from "./MobileWorkMasonry";
import { useReducedMotion } from "../../hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const WorkSection = React.forwardRef<HTMLElement>((_props, forwardedRef) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useImperativeHandle(forwardedRef, () => sectionRef.current as HTMLElement);

  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Desktop entrance trigger on container
      if (window.innerWidth >= 768 && containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          {
            opacity: 0,
            y: 48,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="work-section"
      aria-labelledby="work-heading"
    >
      <div className="work-container" ref={containerRef}>
        {/* Desktop & Tablet Top Marquee Row */}
        <div className="work-section-desktop-top">
          <WorkMarquee
            projects={topRowProjects}
            direction="left"
            rowLabel="Featured projects top row"
            reducedMotion={reducedMotion}
          />
        </div>

        {/* Unified Accessible Heading with Faded Lines */}
        <div className="work-heading">
          <span
            aria-hidden="true"
            className="work-heading-line work-heading-line--left"
          />
          <h2 id="work-heading">MY WORK</h2>
          <span
            aria-hidden="true"
            className="work-heading-line work-heading-line--right"
          />
        </div>

        {/* Desktop & Tablet Bottom Marquee Row */}
        <div className="work-section-desktop-bottom">
          <WorkMarquee
            projects={bottomRowProjects}
            direction="right"
            rowLabel="Featured projects bottom row"
            reducedMotion={reducedMotion}
          />
        </div>

        {/* Mobile Pinterest-Style Masonry Grid */}
        <div className="work-section-mobile">
          <MobileWorkMasonry reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
});

WorkSection.displayName = "WorkSection";
