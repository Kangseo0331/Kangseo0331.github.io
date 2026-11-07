import { About } from "../components/About";
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
			<hr className="mx-auto my-6 border-grey-300 rounded w-90/100"/>
			<About/>
			<hr className="mx-auto mt-6 mb-18 border-grey-300 rounded w-90/100"/>

			<div className="flex flex-row justify-center gap-6 items-end">
				<img src="/icons/pixel-happy-cloud.svg" className="w-12 h-12" />
				<h4 className="text-[20px] pb-5 font-press">Categories</h4>
				<img src="/icons/pixel-cloud.svg" className="w-12 h-12" />
			</div>
			
			<CategoryGrid 
				categories={categories}
			/>

			<div className="flex flex-col items-center justify-center mt-20">
				<Link 
					to="/projects"
					className="flex flex-col items-center justify-center w-fit gap-4"
				>
					<img src="/icons/pixel-apple2.svg" className="w-35 h-35" />
					<h4 className="text-[20px] font-medium font-press pb-4">Projects</h4>
				</Link>
			</div>


			<ProjectList
				projects={projects}
			/>

			<hr className="mx-auto mt-6 mb-6 border-grey-300 rounded w-90/100"/>
			<Footer />


		</>
	)
}