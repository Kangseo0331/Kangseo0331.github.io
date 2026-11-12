import matter from "gray-matter";
import type { Post } from "../types/post";

// Markdown 파일 자동 수집
const postFiles = import.meta.glob("../content/posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

// 모든 게시글 데이터 생성
export const posts: Post[] = Object.entries(postFiles).map(
  ([path, rawContent]) => {
    const { data, content } = matter(rawContent);

    // 파일명에서 확장자를 제거해 게시글 ID로 사용
    const id = path.split("/").pop()!.replace(/\.md$/, "");

    return {
      id,
      title: data.title ?? "",
      date: data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date ?? ""),
      category: data.category ?? "",
      tags: data.tags ?? [],
      description: data.description ?? "",
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