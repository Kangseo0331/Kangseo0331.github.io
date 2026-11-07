
import type { Project } from "../../types/project";
import { useState } from "react";
import { ProjectCard } from "./ProjectCard";


interface ProjectListProps {
    projects: Project[];
}

export function ProjectList({projects}:ProjectListProps) {
    const [categoryState, setProject] = useState(projects);

    return (
        <div className="mb-30">
            <ul className="flex flex-col text-left mx-15 mt-15 mb-30 leading-relaxed gap-4">
                {categoryState.map((project) =>(
                    <li 
                        key={String(project.id)}
                        className="border rounded-2xl p-10"
                    >
                        <ProjectCard
                            key={String(project.id)}
                            project={project}
                        />
                    </li>
                ))}
            </ul>

            <div className="flex flex-row justify-center gap-2">
                <img src="/icons/pixel-dot.svg" className="w-4 h-4"/>
                <img src="/icons/pixel-dot.svg" className="w-4 h-4"/>
                <img src="/icons/pixel-dot.svg" className="w-4 h-4"/>
            </div>
        </div>

    )
}