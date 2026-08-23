import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface UseScrollTransitionOptions {
  heroRef: RefObject<HTMLElement | null>;
  workRef: RefObject<HTMLElement | null>;
  reducedMotion: boolean;
  isReady: boolean;
}

/**
 * Scroll-linked page transition between the hero and the work section.
 *
 * As the boundary between the two crosses the viewport:
 *  - the hero content drifts up and dims,
 *  - the extended hero shader zooms slightly for parallax depth,
 *  - the work panel lifts up over the shader (paired with its rounded top
 *    corners + upward shadow in CSS) — reading as a page turning over.
 *
 * Everything is scrubbed to the scroll position, so it plays forwards and
 * backwards as the user scrolls. Disabled entirely under reduced motion.
 */
export function useScrollTransition({
  heroRef,
  workRef,
  reducedMotion,
  isReady,
}: UseScrollTransitionOptions) {
  useGSAP(
    () => {
      if (reducedMotion || !isReady) {
        return;
      }

      const hero = heroRef.current;
      const work = workRef.current;

      if (!hero || !work) {
        return;
      }

      const content = hero.querySelector<HTMLElement>(".hero-content");
      const shader = hero.querySelector<HTMLElement>(".hero-shader-background");

      // Hero content drifts up and fades as the section is left behind.
      if (content) {
        gsap.to(content, {
          yPercent: -10,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "bottom 92%",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      // Extended shader zooms in slightly as the work panel rises to cover it.
      if (shader) {
        gsap.fromTo(
          shader,
          { scale: 1 },
          {
            scale: 1.12,
            ease: "none",
            scrollTrigger: {
              trigger: work,
              start: "top bottom",
              end: "top top",
              scrub: 0.6,
            },
          }
        );
      }

      // Work panel lifts up over the shader — the core page transition.
      gsap.fromTo(
        work,
        { yPercent: 8, scale: 0.965, autoAlpha: 0.55 },
        {
          yPercent: 0,
          scale: 1,
          autoAlpha: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: work,
            start: "top 95%",
            end: "top 52%",
            scrub: 0.8,
          },
        }
      );

      // Layout can shift as fonts / shader settle after the loader; recompute.
      ScrollTrigger.refresh();
    },
    {
      dependencies: [reducedMotion, isReady],
    }
  );

  // Recalculate trigger positions once everything (fonts, images) has loaded.
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);
}
