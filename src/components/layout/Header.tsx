import { Link } from "@tanstack/react-router"

export function Header() {
  return (
		<header className="flex flex-row justify-between my-12 mx-18">
			<Link 
				to="/"
				className="flex flex-row">
				<img src="/icons/pixel-man.svg" className="w-7 h-7"	/>
				<h2>sumsum</h2>
			</Link>

			<Link 
				to="/projects"
				className="flex justify-between m-2 w-35"
			>
				<Link to="/about">About</Link>
				<button>Projects</button>
			</Link>
		</header>
  )
}