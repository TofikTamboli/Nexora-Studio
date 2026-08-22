import { useState, useEffect } from "react";
import { HeroShader } from "./components/HeroShader";
import { Header } from "./components/Header";
import { HeroStatement } from "./components/HeroStatement";
import { ImpactCard } from "./components/ImpactCard";
import { AvailabilityCard } from "./components/AvailabilityCard";
import { ProjectCTA } from "./components/ProjectCTA";
import { content } from "./content";
import { useReducedMotion } from "./hooks/useReducedMotion";

export default function App() {
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
    <main
      id="top"
      className="agency-hero"
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
        />

        <section className="hero-layout">
          <HeroStatement
            eyebrow={content.eyebrow}
            headline={content.headline}
            subheadline={content.subheadline}
            subheadlineDesktopLines={content.subheadlineDesktopLines}
            reducedMotion={reducedMotion}
          />

          <aside
            className="hero-right-column"
            aria-label="Agency highlights"
          >
            <ImpactCard
              headline={content.impactHeadline}
              description={content.impactDescription}
              reducedMotion={reducedMotion}
            />
            <AvailabilityCard
              text={content.availability}
              reducedMotion={reducedMotion}
            />
          </aside>
        </section>

        <ProjectCTA
          label={content.primaryCTA}
          href="#contact"
          reducedMotion={reducedMotion}
        />

        {/* Semantic anchor targets */}
        <div className="sr-only" aria-hidden="true">
          <div id="work">Work Section</div>
          <div id="services">Services Section</div>
          <div id="about">About Section</div>
          <div id="contact">Contact Section</div>
        </div>
      </div>
    </main>
  );
}
