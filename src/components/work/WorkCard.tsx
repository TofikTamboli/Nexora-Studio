import React from "react";
import type { WorkProject } from "./workData";

interface WorkCardProps {
  project: WorkProject;
  duplicate?: boolean;
}

export const WorkCard: React.FC<WorkCardProps> = ({ project, duplicate = false }) => {
  return (
    <a
      href={project.href}
      className={`work-card work-card--${project.theme}`}
      tabIndex={duplicate ? -1 : 0}
      aria-hidden={duplicate ? true : undefined}
    >
      <img
        src={project.image}
        alt=""
        className="work-card-image"
        loading="lazy"
        decoding="async"
      />

      <span className="work-card-overlay" />

      <div className="work-card-top">
        <span>{project.number}</span>
        <span aria-hidden="true">↗</span>
      </div>

      <div className="work-card-details">
        <h3>{project.title}</h3>
        <p>{project.category}</p>
      </div>

      <span className="work-card-year">{project.year}</span>
    </a>
  );
};
