
import { parse } from "yaml";
import type { Project } from "../types/project";

const projectFiles = import.meta.glob<string>(
  "/src/content/projects/*.md",
  {
    query: "?raw",
    import: "default",
    eager: true,
  }
);

export const projects: Project[] = Object.entries(projectFiles).map(
  ([path, rawContent]) => {
    const match = rawContent.match(
      /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/
    );

    if (!match) {
      throw new Error(`잘못된 Markdown 형식: ${path}`);
    }

    const [, frontmatter, content] = match;
    const metadata = parse(frontmatter);

    return {
      id: path.split("/").pop()!.replace(/\.md$/, ""),
      title: metadata.title,
      startDate: metadata.startDate,
      completionDate: metadata.completionDate ?? "",
      tagline: metadata.tagline ?? [],
      content,
    };
  }
);
