import { svgSource } from "../../data/svgAttribution"

export function Footer() {

	return (
		<div className="flex flex-row mb-15 px-20 justify-start font-mono">
			<div className="flex flex-col text-left w-fit mr-30 gap-2">
				<p className="text-[20px]">Contact</p>
				<div className="leading-tight">
					<p className="text-[15px]">ksy063101@gmail.com</p>
					<a href="http://github.com/Kangseo0331" className="text-[15px]"> github.com/Kangseo0331</a>
				</div>
			</div>

			<details className="flex flex-col text-left gap-2">
				<summary className="flex coursor-point text-[20px] items-center">
					<span>Sources</span>
					<span> 
						<img src="icons/pixel-expandmore.svg" className="w-7 h-7" />
					</span>
				</summary>
				<ul className="text-[15px] leading-tight gap-[1px]">
					{svgSource.map((source) => (
						<li>{source}</li>
					))}

				</ul>
			</details>

		</div>


	)
}