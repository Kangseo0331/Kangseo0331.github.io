import { Link } from "@tanstack/react-router";
import type { Project } from "../../types/project";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({project}: ProjectCardProps) {
    
	return(
		<div>
			<Link
				to="/projects/$projectId"
				params={{ projectId: String(project.id)}}
			>
				<div className="flex flex-col leading-realaxed">
					<div className="flex flex-row items-center gap-4 mb-2">
						<img src="/icons/pixel-apple3.svg" className="w-8 h-8" />
						<p className="text-[20px] font-mono">{project.title}</p>
					</div>
					<p className="">{project.startDate} - {project.completionDate}</p>
					<div className="flex gap-3 mt-1">
						{project.tagline.map((tag) => (
							<span className="border rounded-3xl py-[1px] px-[9px] bg-[#6b6375] text-white">{tag}</span>
						))}
					</div>
				</div>
			</Link>
		</div>
	)
}