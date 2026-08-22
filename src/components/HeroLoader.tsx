import {
  useRef,
  useState,
  useEffect,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import nexoraLogo from "../assets/nexora-studio-logo.png";

gsap.registerPlugin(useGSAP);

type HeroLoaderProps = {
  onComplete: () => void;
};

export function HeroLoader({ onComplete }: HeroLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const loadingInterfaceRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(1);
  const [hasPlayed] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return sessionStorage.getItem("nexora-loader-played") === "true";
      } catch {
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    if (hasPlayed) {
      onComplete();
    }
  }, [hasPlayed, onComplete]);

  useGSAP(
    () => {
      if (hasPlayed) {
        return;
      }

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        document.body.classList.add("loader-active");
        const timeline = gsap.timeline({
          onComplete: () => {
            document.body.classList.remove("loader-active");
            try {
              sessionStorage.setItem("nexora-loader-played", "true");
            } catch {
              // Ignore session storage errors
            }
            onComplete();
          },
        });

        timeline
          .fromTo(
            logoRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.15, ease: "power2.out" }
          )
          .to({}, { duration: 0.15 })
          .to(
            loaderRef.current,
            {
              opacity: 0,
              duration: 0.2,
              ease: "power2.out",
              pointerEvents: "none",
            }
          )
          .set(loaderRef.current, { display: "none" });

        return () => {
          document.body.classList.remove("loader-active");
        };
      }

      const progressValue = {
        value: 1,
      };

      const timeline = gsap.timeline({
        defaults: {
          overwrite: "auto",
        },
        onComplete: () => {
          document.body.classList.remove("loader-active");
          try {
            sessionStorage.setItem("nexora-loader-played", "true");
          } catch {
            // Ignore session storage errors
          }
          onComplete();
        },
      });

      document.body.classList.add("loader-active");

      timeline
        // 1. Logo enters from below the viewport (0 - 1.1s)
        .fromTo(
          logoRef.current,
          {
            y: "100vh",
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power4.out",
          }
        )

        // 2. Logo remains fixed in the centre briefly (1.1 - 1.35s)
        .to({}, { duration: 0.25 })

        // 3. Loading bar and counter appear (1.35 - 1.70s)
        .fromTo(
          loadingInterfaceRef.current,
          {
            opacity: 0,
            y: 12,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          }
        )

        // 4. Percentage progresses from 1 to 100 (1.35 - 4.95s, duration 3.6s)
        .to(
          progressValue,
          {
            value: 100,
            duration: 3.6,
            ease: "power1.inOut",
            snap: {
              value: 1,
            },
            onUpdate: () => {
              setProgress(Math.round(progressValue.value));
            },
          },
          "<"
        )

        // 4b. Fill the loading line (duration 3.6s)
        .fromTo(
          progressFillRef.current,
          {
            scaleX: 0.01,
          },
          {
            scaleX: 1,
            duration: 3.6,
            ease: "power1.inOut",
          },
          "<"
        )

        // 5. Brief pause at 100% (4.95 - 5.15s, duration 0.2s)
        .to({}, { duration: 0.2 })

        // 6. Hide the loading interface (5.15 - 5.45s)
        .to(loadingInterfaceRef.current, {
          opacity: 0,
          y: -8,
          duration: 0.3,
          ease: "power2.in",
        })

        // 7. Logo travels from the centre to above the screen (5.15 - 6.15s)
        .to(
          logoRef.current,
          {
            y: "-100vh",
            opacity: 0,
            duration: 1,
            ease: "power3.inOut",
          },
          "<0.05"
        )

        // 8. Fade out the complete loader (5.85 - 6.30s)
        .to(
          loaderRef.current,
          {
            opacity: 0,
            duration: 0.45,
            ease: "power2.out",
            pointerEvents: "none",
          },
          "-=0.25"
        )

        // 9. Remove loader from the visual layout
        .set(loaderRef.current, {
          display: "none",
        });

      return () => {
        document.body.classList.remove("loader-active");
      };
    },
    {
      scope: loaderRef,
    }
  );

  if (hasPlayed) {
    return null;
  }

  return (
    <div
      ref={loaderRef}
      className="hero-loader"
      role="status"
      aria-label="Loading Nexora Studio"
    >
      <div className="hero-loader-logo-position">
        <img
          ref={logoRef}
          src={nexoraLogo}
          alt="Nexora Studio"
          className="hero-loader-logo"
          width="320"
          height="100"
          decoding="sync"
          fetchPriority="high"
        />
      </div>

      <div
        ref={loadingInterfaceRef}
        className="loader-interface"
      >
        <div className="loader-meta">
          <span>LOADING</span>

          <span aria-hidden="true">
            {String(progress).padStart(2, "0")}%
          </span>
        </div>

        <div
          className="loader-track"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Website loading progress"
        >
          <div
            ref={progressFillRef}
            className="loader-progress"
          />
        </div>
      </div>

      <span className="sr-only">
        Loading Nexora Studio website
      </span>
    </div>
  );
}
