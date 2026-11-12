import { useState } from "react";
import { ProjectList } from "../components/projects/ProjectList";
import { Pagination } from "../components/layout/pagination";
import { projects } from "../data/projects";

const ITEMS_PER_PAGE = 6;

export function project() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const currentProjects = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="flex flex-col items-center justify-center w-fit gap-4">
          <img src="/icons/pixel-apple2.svg" className="w-35 h-35" />
          <h4 className="text-normal font-press mb-2">Projects</h4>
        </div>
      </div>

      <ProjectList projects={currentProjects} />

			<div className="flex flex-row justify-center gap-2">
					<img src="/icons/pixel-dot.svg" className="w-4 h-4" />
					<img src="/icons/pixel-dot.svg" className="w-4 h-4" />
					<img src="/icons/pixel-dot.svg" className="w-4 h-4" />
			</div>

      <div className="mt-12 mb-20">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}