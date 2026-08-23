import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import type { WorkProject } from "./workData";
import { WorkCard } from "./WorkCard";

interface WorkMarqueeProps {
  projects: WorkProject[];
  direction: "left" | "right";
  rowLabel: string;
  reducedMotion?: boolean;
}

export const WorkMarquee: React.FC<WorkMarqueeProps> = ({
  projects,
  direction,
  rowLabel,
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Fill projects so logical group is substantially wider than viewport (minimum 6 items)
  const filledProjects = useMemo(() => {
    const minCount = Math.max(6, projects.length * 2);
    return Array.from(
      { length: minCount },
      (_, index) => projects[index % projects.length]
    );
  }, [projects]);

  useEffect(() => {
    if (reducedMotion) {
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }
      if (trackRef.current) {
        gsap.set(trackRef.current, { clearProps: "transform,x" });
      }
      return;
    }

    const track = trackRef.current;
    const firstGroup = firstGroupRef.current;
    const container = containerRef.current;

    if (!track || !firstGroup || !container) {
      return;
    }

    const updateMarquee = () => {
      // Only run marquee on desktop/tablet (>= 768px)
      if (window.innerWidth < 768) {
        if (tweenRef.current) {
          tweenRef.current.kill();
          tweenRef.current = null;
        }
        gsap.set(track, { clearProps: "transform,x" });
        return;
      }

      const firstGroupWidth = firstGroup.getBoundingClientRect().width;
      if (firstGroupWidth <= 0) return;

      const trackStyle = window.getComputedStyle(track);
      const gap = parseFloat(trackStyle.columnGap || trackStyle.gap) || 16;
      const distance = firstGroupWidth + gap;

      if (tweenRef.current) {
        tweenRef.current.kill();
      }

      const isLeft = direction === "left";
      const startX = isLeft ? 0 : -distance;
      const endX = isLeft ? -distance : 0;
      const duration = isLeft ? 38 : 42;

      tweenRef.current = gsap.fromTo(
        track,
        { x: startX },
        {
          x: endX,
          duration,
          ease: "none",
          repeat: -1,
        }
      );
    };

    // Initial update
    updateMarquee();

    // ResizeObserver on container to recalculate if card dimensions or viewport changes
    const resizeObserver = new ResizeObserver(() => {
      updateMarquee();
    });

    resizeObserver.observe(container);
    resizeObserver.observe(firstGroup);

    // Font ready & window load re-calculations
    if ("fonts" in document) {
      document.fonts.ready.then(updateMarquee).catch(() => {});
    }

    const handleWindowResize = () => {
      updateMarquee();
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleWindowResize);
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }
    };
  }, [direction, reducedMotion, filledProjects]);

  const handlePointerEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  };

  const handlePointerLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 0.45,
        ease: "power2.out",
      });
    }
  };

  const handleFocusIn = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  };

  const handleFocusOut = (e: React.FocusEvent) => {
    // Only resume if focus leaves the complete marquee row
    if (
      containerRef.current &&
      !containerRef.current.contains(e.relatedTarget as Node)
    ) {
      if (tweenRef.current) {
        gsap.to(tweenRef.current, {
          timeScale: 1,
          duration: 0.45,
          ease: "power2.out",
        });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`work-marquee work-marquee--${direction}`}
      aria-label={rowLabel}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocusCapture={handleFocusIn}
      onBlurCapture={handleFocusOut}
    >
      <div className="work-track" ref={trackRef}>
        {/* Original Interactive Group */}
        <div className="work-project-group" ref={firstGroupRef}>
          {filledProjects.map((project, idx) => (
            <WorkCard
              key={`${project.id}-orig-${idx}`}
              project={project}
              interactive={true}
            />
          ))}
        </div>

        {/* Duplicated Decorative Group for Continuous Loop */}
        <div
          className="work-project-group work-project-group--duplicate"
          aria-hidden="true"
        >
          {filledProjects.map((project, idx) => (
            <WorkCard
              key={`${project.id}-dup-${idx}`}
              project={project}
              interactive={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
