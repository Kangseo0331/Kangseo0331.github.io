import { Link } from "@tanstack/react-router";
import type { Category } from "../../types/category";


interface CategoryCardProps {
    category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {

    return (
        <div className="border rounded-[60px] px-10 pt-4 pb-20 h-[160px]">
            <Link
                to="/categories/$categoryId"
                params={{ categoryId: String(category.id) }}
            >
                <div className="text-left leading-relaxed">
                    <h5 className="text-[30px] font-pixel">0{String(category.id)}</h5>
                    <p className="text-[15px] font-pixel">{category.title}</p>
                    <p className="text-[13px]">{category.description}</p>
                </div>

            </Link>


           
        </div>
    );
}