"use client";

import Image from "next/image"; // if you're using Next.js - remove if not
import { useMiniApp } from "@neynar/react";
import { useEffect, useState, useTransition } from "react";
import { fetchNeynarScoreAndStat } from "@/lib/actions";
import {
	AlertCircle,
	CurlyBraces,
	Fingerprint,
	Hourglass,
	MousePointer,
	Pointer,
	Touchpad,
} from "lucide-react";

interface StateType {
	username: string;
	followingCount: number;
	followersCount: number;
	status: string;
	pfp: string;
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

	const fetchScoreAndStats = async () => {
		// if (!isSDKLoaded || !currentUser?.fid) {
		// 	alert("User not authenticated yet");
		// 	return;
		// }

		startTransition(async () => {
			const result = await fetchNeynarScoreAndStat(currentUser?.fid || 0);

			// helper: convert SDK "UserProfileBio" (object) into a plain string safely
			const normalizeStatus = (s: unknown): string => {
				if (!s) return "";
				if (typeof s === "string") return s;
				// common SDK shape: { text: string } or { content: string } — adapt if needed
				if (typeof s === "object" && s !== null) {
					// try common fields then fallback to JSON
					const asRecord = s as Record<string, unknown>;
					const candidate = asRecord.text ?? asRecord.content ?? asRecord.value;
					if (typeof candidate === "string") return candidate;
					// if object has a meaningful toString implementation, use it
					const maybeToString = (asRecord as { toString?: () => string }).toString;
					if (typeof maybeToString === "function") {
						try {
							const str = maybeToString.call(asRecord);
							if (str && str !== "[object Object]") return str;
						} catch {}
					}
					return JSON.stringify(asRecord);
				}
				return String(s);
			};

			if (
				result.success &&
				result.score &&
				result.stats &&
				result.stats.username
			) {
				const safeStats = {
					username: result.stats.username,
					followingCount: result.stats.followingCount,
					followersCount: result.stats.followersCount,
					// normalize the SDK bio -> string to satisfy StateType.status
					status: normalizeStatus(result.stats.status),
					pfp: result.stats.pfp,
				} as StateType;

				setScore(result.score);
				setStats(safeStats);
				setIsError(null);
			} else {
				setIsError(result.error ?? "Unknown error");
				setScore(null);
				setStats(null);
			}
		});
	};

	return (
		<main className="flex h-screen flex-col mx-auto max-w-4xl font-medo w-full ">
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

				{!error && (
					<div className="w-full flex justify-center ">
						<p
							className=" text-lg bg-red-200 text-red-400 justify-center flex  p-4 w-fit text-center gap-2 items-center"
							role="alert">
							{error}
							<span>
								<AlertCircle />
							</span>
						</p>
					</div>
				)}
			</div>

			<div className="mx-4 flex flex-col items-center justify-center mb-6 bg-white py-4 outline outline-zinc-300 text-black/70">
				{stats && (
					<div className="text-xl font-extrabold flex gap-4 items-center">
						<img src={stats.pfp} alt="pfp" className="h-33 w-33 rounded-full" />
						<div>
							<p className="text-2xl animate-pulse">Score: {score}</p>
							<ul className="whitespace-pre-wrap">
								<li>user: {stats?.username}</li>
								<li>followers: {stats?.followersCount}</li>
								<li>following: {stats?.followingCount}</li>
								<li>{stats.status}</li>
							</ul>
						</div>
					</div>
				)}
			</div>

			<div className="flex justify-center my-10">
				<button
					onClick={fetchScoreAndStats}
					disabled={isLoading || isPending}
					className="text-lg font-pixel bg-[#D6EB67] text-zinc-700 px-5 py-3 w-2/3 disabled:opacity-50 flex justify-center items-center gap-3">
					{isLoading || isPending ? "LOADING…" : `CHECK SCORE`}
					{!isPending ? <Pointer /> : <Hourglass />}
				</button>
			</div>
		</main>
	);
}
