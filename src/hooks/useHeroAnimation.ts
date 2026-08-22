import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface UseHeroAnimationOptions {
  containerRef: RefObject<HTMLElement | null>;
  reducedMotion: boolean;
  isReady: boolean;
}

export function useHeroAnimation({
  containerRef,
  reducedMotion,
  isReady,
}: UseHeroAnimationOptions) {
  useGSAP(
    () => {
      if (reducedMotion || !isReady || !containerRef.current) {
        return;
      }

      // GSAP ScrollTrigger hook reserved for future extended scroll sections
    },
    {
      scope: containerRef,
      dependencies: [reducedMotion, isReady],
    }
  );
}
