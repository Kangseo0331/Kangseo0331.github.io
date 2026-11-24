import { Hero } from "../components/Hero";
import { CategoryGrid } from "../components/categories/CategoryGrid";
import { categories } from "../data/categories";
import { ProjectList } from "../components/projects/ProjectList";
import { projects } from "../data/projects";
import { Footer } from "../components/layout/Footer";
import { Link } from "@tanstack/react-router";

export function home() {
	return (
		<>
			<Hero/>
			<hr className="flex mx-auto my-10 border-grey-300 rounded w-80/100"/>

			<div className="flex flex-row justify-center gap-6 items-end">
				<img src="/icons/pixel-happy-cloud.svg" className="w-12 h-12" />
				<h4 className="text-normal pb-5 font-press">Categories</h4>
				<img src="/icons/pixel-cloud.svg" className="w-12 h-12" />
			</div>
			
			<CategoryGrid 
				categories={categories}
			/>


			<div className="flex felx-row justify-center gap-30 mb-20">

				<div className="flex flex-col items-center justify-center mt-20">
					<Link 
						to="/about"
						className="flex flex-col items-center justify-center w-fit gap-4"
					>
						<img src="/icons/pixel-man.svg" className="w-30 h-30" />
						<h4 className="text-normal font-press mb-2">About me</h4>
					</Link>
				</div>

				<div className="flex flex-col items-center justify-center mt-20">
					<Link 
						to="/projects"
						className="flex flex-col items-center justify-center w-fit gap-4"
					>
						<img src="/icons/pixel-apple2.svg" className="w-30 h-30" />
						<h4 className="text-normal font-press mb-2">Projects</h4>
					</Link>
				</div>
			</div>



			<hr className="mx-auto my-10 border-grey-300 rounded w-80/100"/>
			<Footer />


		</>
	)
}