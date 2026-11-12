import { CategoryCard } from "./CategoryCard";
import type { Category } from "../../types/category";

interface CategoryGridProps {
    categories: Category[];
}

export function CategoryGrid({categories}:CategoryGridProps) {

    return (
        <ul className="grid grid-cols-2 gap-[15px] mx-40 my-6">
            {categories.map((category) =>(
                <li key={String(category.id)}>
                    <CategoryCard
                        key={String(category.id)}
                        category={category}
                    />
                </li>
            ))}
        </ul>
    )
}