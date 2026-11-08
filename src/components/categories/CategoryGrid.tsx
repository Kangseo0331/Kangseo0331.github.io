import { CategoryCard } from "./CategoryCard";
import type { Category } from "../../types/category";
import { useState } from "react";

interface CategoryGridProps {
    categories: Category[];
}

export function CategoryGrid({categories}:CategoryGridProps) {
    const [categoryState] = useState(categories);

    return (
        <ul className="grid grid-cols-2 gap-[15px] mx-40 my-6">
            {categoryState.map((category) =>(
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