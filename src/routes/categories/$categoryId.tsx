import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "../../data/categories";
import { getPostsByCategory } from "../../lib/posts";

export const Route = createFileRoute("/categories/$categoryId")({
  component: CategoryPage,
});

function CategoryPage() {
  const { categoryId } = Route.useParams();

  const category = categories.find(
    (item) => item.id === categoryId
  );

  const categoryPosts = getPostsByCategory(categoryId);

  if (!category) {
    return <main className="px-40 py-20">존재하지 않는 카테고리입니다.</main>;
  }

  return (
    <main className="mx-40 my-16">
      <header className="mb-12">
        <p className="text-sm text-gray-500">
          CATEGORY {String(category.number).padStart(2, "0")}
        </p>
        <h1 className="text-4xl font-pixel mt-3">
          {category.title}
        </h1>
        <p className="mt-3 text-gray-500">
          {category.description}
        </p>
      </header>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Posts</h2>
          <span className="text-sm text-gray-500">
            {categoryPosts.length} posts
          </span>
        </div>

        {categoryPosts.length === 0 ? (
          <p className="py-10 text-gray-500">
            아직 작성된 게시글이 없습니다.
          </p>
        ) : (
          <ul className="divide-y">
            {categoryPosts.map((post) => (
              <li key={post.id} className="py-6">
                <Link
                  to="/posts/$postId"
                  params={{ postId: post.id }}
                  className="block group"
                >
                  <p className="text-sm text-gray-500">
                    {post.date}
                  </p>

                  <h3 className="text-xl mt-2 group-hover:underline">
                    {post.title}
                  </h3>

                  {post.description && (
                    <p className="text-sm text-gray-600 mt-2">
                      {post.description}
                    </p>
                  )}

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
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
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}