import { Link } from "@tanstack/react-router";
import type { Category } from "../../types/category";


interface CategoryCardProps {
    category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {

    return (
        <div className="border rounded-[90px] px-12 pt-10 pb-20 h-[256px]">
            <Link
                to="/categories/$categoryId"
                params={{ categoryId: String(category.id) }}
            >
                <div className="text-left leading-relaxed">
                    <h5 className="text-[38px] font-pixel">0{String(category.id)}</h5>
                    <p className="text-[18px] font-pixel">{category.title}</p>
                    <p>{category.description}</p>
                </div>


            </Link>


           
        </div>
    );
}