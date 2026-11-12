
import { useParams } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { projects } from "../data/projects";

export function ProjectDetailPage() {
  const { projectId } = useParams({
    from: "/projects/$projectId",
  });

  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return <div className="mt-20 text-center">프로젝트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-6 mt-20 mb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-press mb-4">
          {project.title}
        </h1>

        <p className="text-sm mb-3">
          {project.startDate} - {project.completionDate}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tagline.map((tag) => (
            <span
              key={tag}
              className="text-[13px] font-mono border rounded-3xl py-[1px] px-[9px] bg-[#6b6375] text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <hr className="mb-8" />

      <article className="prose max-w-none">
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </article>
    </div>
  );
}
