
import type { Project } from "../../types/project";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
    projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
    return (
        <div className="mb-30">
            <ul className="flex flex-col text-left mx-20 mt-6 mb-30 leading-relaxed gap-4">
                {projects.map((project) => (
                    <li
                        key={String(project.id)}
                        className="border rounded-2xl p-10"
                    >
                        <ProjectCard project={project} />
                    </li>
                ))}
            </ul>

        </div>
    );
}