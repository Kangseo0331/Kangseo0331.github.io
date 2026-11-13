
import { parse } from "yaml";
import type { Post } from "../types/post";

// Markdown 파일 자동 수집
const postFiles = import.meta.glob("../content/posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

// Frontmatter와 Markdown 본문 분리
function parseMarkdown(rawContent: string) {
  const match = rawContent.match(
    /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/
  );

  if (!match) {
    return {
      data: {} as Record<string, unknown>,
      content: rawContent,
    };
  }

  const data = (parse(match[1]) ?? {}) as Record<string, unknown>;
  const content = rawContent.slice(match[0].length);

  return { data, content };
}

// 모든 게시글 데이터 생성
export const posts: Post[] = Object.entries(postFiles).map(
  ([path, rawContent]) => {
    const { data, content } = parseMarkdown(rawContent);

    const id = path.split("/").pop()!.replace(/\.md$/, "");

    return {
      id,
      title: String(data.title ?? ""),
      date: String(data.date ?? ""),
      category: String(data.category ?? ""),
      tags: Array.isArray(data.tags)
        ? data.tags.map(String)
        : [],
      description: String(data.description ?? ""),
      content,
    };
  }
);

// 날짜 내림차순 정렬
posts.sort((a, b) => b.date.localeCompare(a.date));

// 카테고리별 게시글 조회
export function getPostsByCategory(categoryId: string): Post[] {
  return posts.filter((post) => post.category === categoryId);
}

// ID로 게시글 조회
export function getPostById(postId: string): Post | undefined {
  return posts.find((post) => post.id === postId);
}
