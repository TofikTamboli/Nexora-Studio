import React from "react";
import { topRowProjects, bottomRowProjects } from "./workData";
import { WorkMarquee } from "./WorkMarquee";

export const WorkSection: React.FC = () => {
  return (
    <section
      id="work"
      className="work-section"
      aria-labelledby="work-section-title"
    >
      <div className="work-section-container">
        <WorkMarquee
          projects={topRowProjects}
          direction="left"
          rowLabel="Featured projects"
        />

        <div className="work-divider">
          <span
            className="work-divider-line work-divider-line--left"
            aria-hidden="true"
          />

          <div className="work-divider-content">
            <span className="work-divider-label">
              [SELECTED PROJECTS / 2024—2026]
            </span>

            <h2 id="work-section-title">MY WORK</h2>
          </div>

          <span
            className="work-divider-line work-divider-line--right"
            aria-hidden="true"
          />
        </div>

        <WorkMarquee
          projects={bottomRowProjects}
          direction="right"
          rowLabel="Additional projects"
        />
      </div>
    </section>
  );
};
