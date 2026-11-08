import { Link } from "@tanstack/react-router"


export function About() {
	return (
		<div className="mx-24 py-5 leading-normal">
			<div className="text-left">
				<h4 className="text-normal font-press pb-3 tracking-tighter">A little about me</h4>
				<p>컴퓨터 공학과 사이버보안 전반에 걸쳐 공부하며 진로를 탐색하는 사이버보안전공 학생입니다.</p>
				<p>Cybersecurity student interedsted in security, software development, and understanding how systems work.</p>
			</div>

			<Link 
				to="/about"
				className="flex flex-row my-2 ml-auto gap-2 items-center justify-end">
				<p>view all</p>
				<img src="/icons/pixel-arrow.svg" className="w-4 h-4" />
			</Link>


		</div>

	)
}