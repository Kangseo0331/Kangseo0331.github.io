import { createFileRoute, Link } from "@tanstack/react-router";
import { getPostById } from "../../lib/posts";
import { categories } from "../../data/categories";
import { MarkdownContent } from "../../components/markdown/MarkdownContent";

export const Route = createFileRoute("/posts/$postId")({
  component: PostDetailPage,
});

function PostDetailPage() {
  const { postId } = Route.useParams();

  const post = getPostById(postId);

  if (!post) {
    return (
      <main className="mx-40 my-20">
        <h1 className="text-2xl">게시글을 찾을 수 없습니다.</h1>
      </main>
    );
  }

  const category = categories.find(
    (item) => item.id === post.category
  );

  return (
    <main className="mx-40 my-16">
      <article>
        <header className="border-b pb-8 mb-10">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-5">
            {category && (
              <Link
                to="/categories/$categoryId"
                params={{ categoryId: category.id }}
                className="hover:underline"
              >
                {category.title}
              </Link>
            )}
            <span>·</span>
            <time>{post.date}</time>
          </div>

          <h1 className="text-3xl font-bold leading-relaxed">
            {post.title}
          </h1>

          {post.description && (
            <p className="mt-4 text-gray-500">
              {post.description}
            </p>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-500 border rounded-full px-3 py-1"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <MarkdownContent content={post.content} />
      </article>

      <div className="border-t mt-16 pt-8">
        {category && (
          <Link
            to="/categories/$categoryId"
            params={{ categoryId: category.id }}
            className="text-sm text-gray-500 hover:underline"
          >
            ← {category.title} 목록으로 돌아가기
          </Link>
        )}
      </div>
    </main>
  );
}