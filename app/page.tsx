
export default function Home() {

  return (
		<main className="max-w-lg mx-auto p-2">
			<div className="min-h-screen flex flex-col gap-4">
				<h4 className="bg-zinc-900 p-2 rounded-xl text-sm ">
					Check your Neynar User Quality Score
				</h4>

				<h4 className="bg-zinc-900 p-2 rounded-xl text-sm h-50">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dicta harum necessitatibus voluptas quidem quas asperiores consequatur facere pariatur voluptatum quod, aliquid, nulla inventore sint?
				</h4>

				<div className="w-full flex gap-2 my-3 items-end justify-center  h-full">
					<button className="bg-fuchsia-950 px-6 py-2.5 rounded-full text-sm font-semibold  w-1/2">
						Check Score
					</button>
				</div>
			</div>
		</main>
	);
}
