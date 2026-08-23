import React from "react";
import type { WorkProject } from "./workData";

interface WorkCardProps {
  project: WorkProject;
  interactive?: boolean;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  project,
  interactive = true,
}) => {
  return (
    <a
      href={interactive ? project.href : undefined}
      className={`work-card work-card--${project.theme}`}
      tabIndex={interactive ? 0 : -1}
      aria-hidden={!interactive ? true : undefined}
      role={interactive ? "link" : "presentation"}
    >
      <img
        src={project.image}
        alt={interactive ? project.altText : ""}
        className="work-card-image"
        loading="lazy"
        decoding="async"
      />

      <span className="work-card-overlay" aria-hidden="true" />

      <div className="work-card-content">
        <div className="work-card-top">
          <span className="work-card-number">{project.number}</span>
          <span className="work-card-year">{project.year}</span>
        </div>

        <div className="work-card-bottom">
          <div className="work-card-info">
            <h3 className="work-card-title">{project.title}</h3>
            <p className="work-card-category">{project.category}</p>
          </div>

          <div className="work-card-action" aria-hidden="true">
            <svg
              className="work-card-arrow"
              width="14"
              height="14"
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
          </div>
        </div>
      </div>
    </a>
  );
};
