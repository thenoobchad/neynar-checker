"use client";
import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";
import { useMiniApp } from "@neynar/react";
import { useEffect, useState, useTransition } from "react";
import { fetchNeynarScoreAndStat, fetchUsersByUsername } from "@/lib/actions";
import { AlertCircle, Hourglass, Pointer, Search } from "lucide-react";

interface StateType {
	username: string;
	followingCount: number;
	followersCount: number;
	status: string;
	pfp: string;
}
type User = {
	fid: number;
	username: string;
};

export default function Home() {
	// single source of truth from the SDK hook
	const { isSDKLoaded, actions, context } = useMiniApp();

	// local UI state (used in the JSX to avoid 'declared but never used' warnings)
	const [query, setQuery] = useState("");
	const [users, setUsers] = useState<User[] | null>([]);
	const [score, setScore] = useState<number | null>(null);
	const [stats, setStats] = useState<StateType | null>({
		username: "",
		followingCount: 0,
		followersCount: 0, 		status: "Web 3 guru",
		pfp: "",
	});

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
		if (!isSDKLoaded || !currentUser?.fid) {
			alert("User not authenticated yet");
			return;
		}

		startTransition(async () => {
			const result = await fetchNeynarScoreAndStat(currentUser?.fid || 0);

			const normalizeStatus = (s: unknown): string => {
				if (!s) return "";
				if (typeof s === "string") return s;

				if (typeof s === "object" && s !== null) {
					// try common fields then fallback to JSON
					const asRecord = s as Record<string, unknown>;
					const candidate = asRecord.text ?? asRecord.content ?? asRecord.value;
					if (typeof candidate === "string") return candidate;
					// if object has a meaningful toString implementation, use it
					const maybeToString = (asRecord as { toString?: () => string })
						.toString;
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

	
	

	useEffect(() => {
		const fetchUsers = async () => {
			const res = await fetchUsersByUsername(query);

			if (res?.success) {
				setUsers(res.data);
			}
		};

		if (query.length > 0) fetchUsers();
	}, [query]);

	return (
		<main className="flex h-screen flex-col mx-auto max-w-4xl font-medo w-full ">
			<nav className="py-4 flex justify-between my-3 px-4 mx-4 bg-[#0052FF] outline outline-[#D6EB67] gap-4">
				<form
					
					className="flex items-center bg-amber-50 px-2 py-2 rounded-full w-2/3 justify-between pl-4 relative">
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						type="text"
						placeholder="Search by name..."
						className="bg-transparent outline-none text-black text-[19px]"
					/>
					{users && users.length > 0 && (
						<div className="bg-white absolute w-3/4 top-13 rounded  text-zinc-800 p-2">
							<span className="text-zinc-500">Search results...</span>
							<ul>
								{users.map((user, i) => (
									<li
										key={user.fid}
										className="text-lg hover:bg-blue-200 p-1"
										>
										{user.username}
									</li>
								))}
							</ul>
						</div>
					)}

					<button>
						<Search
							color="white"
							className="bg-[#0052FF] h-8 w-8 p-1 rounded-full"
						/>
					</button>
				</form>

				{/* USER META DATA */}
				<div className="flex gap-3 items-center justify-center">
					{currentUser?.pfpUrl ? (
						<img
							src={currentUser.pfpUrl}
							alt="avatar"
							className="rounded-full h-9 w-9 object-cover"
						/>
					) : (
						<div className="h-9 w-9 rounded-full bg-white" />
					)}
					<div className="flex flex-col items-start justify-center">
						<h4 className="font-extrabold text-2xl leading-6 whitespace-nowrap">
							{currentUser?.displayName ?? currentUser?.username ?? "Unknown"}
						</h4>
						<p className="text-md text-zinc-300 leading-3.5 font-semibold whitespace-nowrap">
							fid: {currentUser?.fid ?? "-"}
						</p>
					</div>
				</div>
			</nav>

			<div className="py-4 flex flex-col justify-between my-3  mx-4   outline-zinc-300">
				<p className="text-xl font-semibold font-medo flex flex-wrap mb-8 leading-4.8 p-4 bg-white/90 text-[#0052FF]">
					Neynar score is a quality metric (0-1) that reflects user behavior on
					Farcaster. It&apos;s updated weekly and helps identify high-quality
					accounts. It&apos;s not proof of humanity but measures account value
					to the network.
				</p>

				{error && (
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

			{stats?.username && (
				<div className="mx-4 flex flex-col items-center justify-center mb-6 bg-white/90 py-4 outline outline-zinc-300 text-black/70 px-4">
					<div className="text-xl font-extrabold flex gap-4 items-center">
						<img src={stats.pfp} alt="pfp" className="h-33 w-33 rounded-full" />
						<div>
							<p className="text-2xl animate-pulse">Score: {score}</p>
							<ul className="whitespace-pre-wrap">
								<li>
									<span className="text-zinc-600">user:</span>
									{stats?.username}
								</li>
								<li>
									<span className="text-zinc-600">followers:</span>{" "}
									{stats?.followersCount}
								</li>
								<li>
									<span className="text-zinc-600">following:</span>{" "}
									{stats?.followingCount}
								</li>
								<li>{stats.status}</li>
							</ul>
						</div>
					</div>
				</div>
			)}

			<div className="flex justify-center my-4 mt-auto ">
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
