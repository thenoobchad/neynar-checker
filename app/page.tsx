"use client"

import { Container, Share, Share2Icon } from "lucide-react";
import { useState } from "react";

export default function Home() {

  const [isViewed, setIsViewed] = useState(true)

  return (
		<main className="max-w-lg mx-auto p-2">
			<div className="h-full flex flex-col gap-4 justify-between">
				<div className="flex flex-col gap-4">
					<h4 className="bg-zinc-900 p-4 rounded-xl text-sm ">
						Check your Neynar User Quality Score
					</h4>

					<h4 className="bg-zinc-900 p-4 rounded-xl text-sm h-50">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
						dicta harum necessitatibus voluptas quidem quas asperiores
						consequatur facere pariatur voluptatum quod, aliquid, nulla
						inventore sint?
					</h4>
				</div>

				<div className="w-full flex gap-4 my-3 items-center justify-end flex-col h-full">
					<button className="bg-fuchsia-950 px-6 py-2.5 rounded-lg text-sm font-semibold  w-1/2">
						Check Score
					</button>

					{isViewed && (
						<button className="bg-zinc-900 px-6 py-2.5 rounded-lg text-sm font-semibold  w-1/2 flex justify-center gap-4">
							Share score<Share2Icon size={20} />
						</button>
					)}
				</div>
			</div>
		</main>
	);
}
