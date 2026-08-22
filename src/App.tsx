import { useState, useEffect } from "react";
import { HeroLoader } from "./components/HeroLoader";
import { HeroShader } from "./components/HeroShader";
import { Header } from "./components/Header";
import { HeroStatement } from "./components/HeroStatement";
import { ImpactCard } from "./components/ImpactCard";
import { AvailabilityCard } from "./components/AvailabilityCard";
import { ProjectCTA } from "./components/ProjectCTA";
import { WorkSection } from "./components/work/WorkSection";
import { content } from "./content";
import { useReducedMotion } from "./hooks/useReducedMotion";

export default function App() {
  const [loaderComplete, setLoaderComplete] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return sessionStorage.getItem("nexora-loader-played") === "true";
      } catch {
        return false;
      }
    }
    return false;
  });
  const [fontsReady, setFontsReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready
        .then(() => setFontsReady(true))
        .catch(() => setFontsReady(true));
    } else {
      setFontsReady(true);
    }
  }, []);

  return (
    <>
      <HeroLoader onComplete={() => setLoaderComplete(true)} />

      <main
        id="top"
        className="agency-hero"
        data-loader-complete={loaderComplete}
        style={{ opacity: fontsReady ? 1 : 0, transition: "opacity 0.2s ease-in" }}
      >
        {/* Background: WebGPU Shader Canvas */}
        <HeroShader />

        {/* Foreground Content */}
        <div className="hero-content">
          <Header
            brand={content.brand}
            brandDescriptor={content.brandDescriptor}
            navigation={content.navigation}
            bookingCTA={content.bookingCTA}
            reducedMotion={reducedMotion}
            canAnimate={loaderComplete}
          />

          <section className="hero-layout">
            <HeroStatement
              headline={content.headline}
              subheadline={content.subheadline}
              subheadlineDesktopLines={content.subheadlineDesktopLines}
              reducedMotion={reducedMotion}
              canAnimate={loaderComplete}
            />

            <aside
              className="hero-right-column"
              aria-label="Agency highlights"
            >
              <ImpactCard
                headline={content.impactHeadline}
                description={content.impactDescription}
                reducedMotion={reducedMotion}
                canAnimate={loaderComplete}
              />
              <AvailabilityCard
                text={content.availability}
                reducedMotion={reducedMotion}
                canAnimate={loaderComplete}
              />
            </aside>
          </section>

          <ProjectCTA
            label={content.primaryCTA}
            href="#contact"
            reducedMotion={reducedMotion}
            canAnimate={loaderComplete}
          />

          {/* Semantic anchor targets */}
          <div className="sr-only" aria-hidden="true">
            <div id="services">Services Section</div>
            <div id="about">About Section</div>
            <div id="contact">Contact Section</div>
          </div>
        </div>
      </main>

      <WorkSection />
    </>
  );
}

