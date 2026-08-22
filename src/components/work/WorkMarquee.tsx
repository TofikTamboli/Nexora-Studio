import React from "react";
import type { WorkProject } from "./workData";
import { WorkCard } from "./WorkCard";

interface WorkMarqueeProps {
  projects: WorkProject[];
  direction: "left" | "right";
  rowLabel: string;
}

export const WorkMarquee: React.FC<WorkMarqueeProps> = ({
  projects,
  direction,
  rowLabel,
}) => {
  return (
    <div
      className={`work-marquee work-marquee--${direction}`}
      aria-label={rowLabel}
    >
      <div className="work-marquee-viewport">
        <div className="work-marquee-track">
          <div className="work-marquee-group">
            {projects.map((project) => (
              <WorkCard
                key={project.id}
                project={project}
              />
            ))}
          </div>

          <div
            className="work-marquee-group"
            aria-hidden="true"
          >
            {projects.map((project) => (
              <WorkCard
                key={`${project.id}-duplicate`}
                project={project}
                duplicate
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
