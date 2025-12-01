"use client"


import UserInfo from "@/components/user-info";
import { useMiniApp } from "@neynar/react";
import { useEffect } from "react";


export default function Home() {

    const { isSDKLoaded, actions, context } = useMiniApp();

    useEffect(() => {
        if (isSDKLoaded) {
            actions.ready()
        }
    }, [isSDKLoaded, actions])
    
    console.log("Context:", context);
	return (
		<main className="flex min-h-screen flex-col mx-auto max-w-4xl font-medo w-full ">
			<nav className="py-4 flex justify-between my-3 px-4 mx-4 bg-[#0052FF] outline outline-zinc-300 rounded">
				<div>
					<h4 className="text-2xl font-block ">CHECKER</h4>
				</div>

				{/* USER META DATA */}
				<div className="flex gap-4 items-center justify-center">
					<div className="h-9 w-9 rounded-full bg-white" />
					<div className="flex flex-col items-start justify-center">
						<h4 className=" font-extrabold  text-2xl leading-6">Mannie</h4>
						<p className="text-md text-zinc-300 leading-3.5 font-semibold">fid: 235343</p>
					</div>
				</div>
			</nav>
			<div className="mx-4">
				<p className="text-xl font-semibold font-medo">
					The neynar user score reveals the quality of a users engagment on the platform. it ranges from 0 - 1.
				</p>
			</div>
			<div className="flex justify-center my-10">
				<button className="text-lg font-pixel bg-[#D6EB67] text-zinc-700 px-5 py-3 w-2/3 rounded">
					START HERE
				</button>
			</div>

			
		</main>
	);
}
