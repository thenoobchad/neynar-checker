"use client";

import Image from "next/image"; // if you're using Next.js - remove if not
import { useMiniApp } from "@neynar/react";
import { useEffect, useState } from "react";

export default function Home() {
	// single source of truth from the SDK hook
	const { isSDKLoaded, actions, context } = useMiniApp();

	// local UI state (used in the JSX to avoid 'declared but never used' warnings)
	const [score, setScore] = useState<number | null>(null);
	const [stats, setStats] = useState<Record<string, unknown> | null>(null);
	const [loading, setLoading] = useState(false);

	// derived values from SDK context
	const currentUser = context?.user ?? null;
	const isLoading = !isSDKLoaded;
	const error =
		isSDKLoaded && !currentUser
			? "No user found in context - ensure app is launched in Farcaster client"
			: null;

	// call actions.ready() as a side effect once the SDK is available
	useEffect(() => {
		if (!isSDKLoaded) return;
		// guard in case actions is null/undefined
		actions?.ready();
	}, [isSDKLoaded, actions]);

	// typed backend response
	type ScoreResponse = {
		score: number;
		stats: Record<string, unknown>;
	};

	// example fetch function — guard SDK + user, simulate a request (replace with real SDK call)
	const fetchScoreAndStats = async () => {
		if (!isSDKLoaded || !currentUser?.fid) {
			alert("User not authenticated yet");
			return;
		}

		setLoading(true);
		try {
			// Call your server API route (implement server-side SDK call there).
			const res = await fetch(
				`/api/neynar-score?fid=${encodeURIComponent(currentUser.fid)}`
			);
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = (await res.json()) as ScoreResponse;

			setScore(data.score);
			setStats(data.stats);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	console.log("Context:", context);

	return (
		<main className="flex min-h-screen flex-col mx-auto max-w-4xl font-medo w-full ">
			<nav className="py-4 flex justify-between my-3 px-4 mx-4 bg-[#0052FF] outline outline-zinc-300">
				<div>
					<h4 className="text-2xl font-block ">CHECKER</h4>
				</div>

				{/* USER META DATA */}
				<div className="flex gap-3 items-center justify-center">
					{currentUser?.pfpUrl ? (
						<Image
							src={currentUser.pfpUrl}
							alt="avatar"
							width={36}
							height={36}
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
				<p className="text-xl font-semibold font-medo flex flex-wrap">
					The neynar user score reveals the quality of a user&apos;s engagement
					on the platform. it ranges from 0 - 1.
				</p>

				{error && (
					<p
						className="mt-2 text-lg bg-red-200 text-red-400 p-4 w-fit text-center"
						role="alert">
						{error}
					</p>
				)}
			</div>

			<div className="flex justify-center my-10">
				<button
					onClick={fetchScoreAndStats}
					disabled={isLoading || loading}
					className="text-lg font-pixel bg-[#D6EB67] text-zinc-700 px-5 py-3 w-2/3 disabled:opacity-50">
					{isLoading || loading ? "Loading…" : "START HERE"}
				</button>
			</div>

			{/* show fetched values so linter won't complain they are unused */}
			<div className="mx-4">
				<p>Score: {score ?? "-"}</p>
				<pre className="whitespace-pre-wrap">
					{JSON.stringify(stats ?? {}, null, 2)}
				</pre>
			</div>
		</main>
	);
}
