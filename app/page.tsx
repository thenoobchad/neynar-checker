"use client";

import Image from "next/image"; // if you're using Next.js - remove if not
import { useMiniApp } from "@neynar/react";
import { useEffect, useState, useTransition } from "react";
import { fetchNeynarScoreAndStat } from "@/lib/actions";
import { AlertCircle } from "lucide-react";

interface StateType {
	username: string;
	followingCount: number;
	followersCount: number;
}

export default function Home() {
	// single source of truth from the SDK hook
	const { isSDKLoaded, actions, context } = useMiniApp();

	// local UI state (used in the JSX to avoid 'declared but never used' warnings)
	const [score, setScore] = useState<number | null>(null);
	const [stats, setStats] = useState<StateType | null>(null);

	const [isError, setIsError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();

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

	
	// example fetch function — guard SDK + user, simulate a request (replace with real SDK call)
	const fetchScoreAndStats = async () => {
		// if (!isSDKLoaded || !currentUser?.fid) {
		// 	alert("User not authenticated yet");
		// 	return;
		// }
	

		startTransition(async () => {
			const result = await fetchNeynarScoreAndStat();

			if (result.success && result.score && result.stats) {
				setScore(result.score);
				setStats(result.stats);
				setIsError(null);
			} else {
				setIsError(result.error!);
				setScore(null);
				setStats(null);
			}
		});

	
	};

	

	return (
		<main className="flex min-h-screen flex-col mx-auto max-w-4xl font-medo w-full ">
			<nav className="py-4 flex justify-between my-3 px-4 mx-4 bg-[#0052FF] outline outline-[#D6EB67]">
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

			<div className="py-4 flex flex-col justify-between my-3  mx-4   outline-zinc-300">
				<p className="text-xl font-semibold font-medo flex flex-wrap mb-8 leading-4.8">
					neynar score is a quality metric (0-1) that reflects user behavior on
					Farcaster. It&apos;s updated weekly and helps identify high-quality
					accounts. It&apos;s not proof of humanity but measures account value
					to the network.
				</p>

				{error && (
					<div className="w-full flex justify-center">
						<p
							className=" text-lg bg-red-200 text-red-400 justify-center flex  p-4 w-fit text-center"
							role="alert">
							{error}
							<span>
								<AlertCircle />
							</span>
						</p>
					</div>
				)}
			</div>

			{/* show fetched values so linter won't complain they are unused */}
			<div className="mx-4">
				{stats && (
					<div className="text-lg font-extrabold">
						<p>Score: {score ?? "-"}</p>
						<ul className="whitespace-pre-wrap">
							<li>user: {stats?.username}</li>
							<li>followers: {stats?.followersCount}</li>
							<li>following: {stats?.followingCount}</li>
						</ul>
					</div>
				)}
			</div>

			<div className="flex justify-center my-10">
				<button
					onClick={fetchScoreAndStats}
					disabled={isLoading || isPending}
					className="text-lg font-pixel bg-[#D6EB67] text-zinc-700 px-5 py-3 w-2/3 disabled:opacity-50">
					{isLoading || isPending ? "Loading…" : "START HERE"}
				</button>
			</div>
		</main>
	);
}
