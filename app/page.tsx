"use client";

import { useMiniApp } from "@neynar/react";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
	// keep single source of truth from the SDK context
	const { isSDKLoaded, actions, context } = useMiniApp();

	// derive UI state instead of copying context into local state
	const currentUser = context?.user ?? null;
	const isLoading = !isSDKLoaded;
	const error =
		isSDKLoaded && !currentUser
			? "No user found in context - ensure app is launched in Farcaster client"
			: null;

	// call actions.ready() once when the SDK becomes available.
	// this effect does not set React state synchronously, avoiding cascading renders.
	useEffect(() => {
		if (!isSDKLoaded) return;
		actions.ready();
	}, [isSDKLoaded, actions]);

	console.log("Context:", context);

	return (
		<main className="flex min-h-screen flex-col mx-auto max-w-4xl font-medo w-full ">
			<nav className="py-4 flex justify-between my-3 px-4 mx-4 bg-[#0052FF] outline outline-zinc-300">
				<div>
					<h4 className="text-2xl font-block ">CHECKER</h4>
				</div>

				{/* USER META DATA */}
				<div className="flex gap-4 items-center justify-center">
					{currentUser?.pfpUrl ? (
                        <Image
                            height={19}
                            width={19}
							src={currentUser.pfpUrl}
							alt="avatar"
							className="rounded-full object-cover"
						/>
					) : (
						<div className="h-9 w-9 rounded-full bg-white" />
					)}
					<div className="flex flex-col items-start justify-center">
						<h4 className="font-extrabold text-2xl leading-6">
							{currentUser?.displayName ?? currentUser?.username ?? "Unknown"}
						</h4>
						<p className="text-md text-zinc-300 leading-3.5 font-semibold">
							fid: {currentUser?.fid ?? "-"}
						</p>
					</div>
				</div>
			</nav>

			<div className="mx-4 w-full flex flex-col justify-center items-center overflow-hidden">
				<p className="text-xl font-semibold font-medo flex">
					The neynar user score reveals the quality of a users engagement on the
					platform. it ranges from 0 - 1.
				</p>
				{error && (
					<p className="mt-2 text-lg bg-red-200 text-red-400 p-4 w-fit text-center" role="alert">
						{error}
					</p>
				)}
			</div>

			<div className="flex justify-center my-10">
				<button
					disabled={isLoading}
					className="text-lg font-pixel bg-[#D6EB67] text-zinc-700 px-5 py-3 w-2/3 disabled:opacity-50">
					{isLoading ? "Loading…" : "START HERE"}
				</button>
			</div>
		</main>
	);
}
