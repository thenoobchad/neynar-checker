"use client"

import { Container, Share, Share2Icon } from "lucide-react";
import { resolve } from "path";
import { useState, useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function Home() {

	useEffect(() => {
		sdk.actions.ready();
	}, []);

  const [isViewed, setIsViewed] = useState(true)
  const [loading, setLoading] = useState(false)


  const onCheck = () => {
    console.log("AAAAAAAA")
    setLoading(true)
	new Promise(resolve => setTimeout(() => (setLoading(false)), 2000))

  }

  return (
		<main className="max-w-lg mx-auto p-2 h-full">
			<div className="h-full flex flex-col gap-4 justify-between">
				<div className="flex flex-col gap-4">
					<h4 className="bg-zinc-900 outline-1 outline-zinc-700 p-4 rounded-xl text-sm ">
						Check your Neynar User Quality Score
					</h4>

					<h4 className="bg-zinc-900 p-4 rounded-xl text-sm h-50 outline-1 outline-zinc-700 ">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
						dicta harum necessitatibus voluptas quidem quas asperiores
						consequatur facere pariatur voluptatum quod, aliquid, nulla
						inventore sint?
					</h4>
				</div>

				<div className="w-full flex gap-4 my-3 items-center justify-end h-full">
					<button
						disabled={loading}
						onClick={() => onCheck()}
						className={`${
							loading && "bg-zinc-900"
						} bg-fuchsia-950 px-6 py-2.5 rounded-lg text-md flex-1 font-semibold outline-1 outline-fuchsia-900 w-full`}>
						{loading ? "Checking..." : "Check Score"}
					</button>

					{isViewed && (
						<button
							className={`
            bg-zinc-900 px-6 py-2.5 rounded-lg text-md font-semibold flex justify-center gap-4 items-center-safe outline-1 outline-zinc-700 `}>
							Share score
							<Share2Icon size={20} />
						</button>
					)}
				</div>
			</div>
		</main>
	);
}
