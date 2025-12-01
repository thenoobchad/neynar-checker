

export const NavHeader = () => {
  return (
		<nav className="max-w-lg m-auto px-4 py-2 ">
			<div className="flex justify-between items-center py-5 bg-white text-zinc-800">
				<h4 className="text-2xl font-semibold font-block">NEYCHECKER</h4>

				<div className="flex gap-4 items-center">
					<div className="h-9 w-9 rounded-full bg-white" />
					<div>
						<h4 className="text-sm font-semibold">Mannie</h4>
						<p className="text-xs text-zinc-500">FID: 235343</p>
					</div>
				</div>
			</div>
		</nav>
	);
}
