"use client"


import UserInfo from "@/components/user-info";
import { useMiniApp } from "@neynar/react";
import { useEffect } from "react";


export default function Home() {

    const { isSDKLoaded, actions } = useMiniApp();

    useEffect(() => {
        if (isSDKLoaded) {
            actions.ready()
        }
    }, [isSDKLoaded, actions])
    
	return (
		<main className="flex min-h-screen flex-col mx-auto max-w-4xl font-medo w-full ">
			<nav className="py-4 flex justify-between my-3 px-4 mx-4 bg-[#0052FF] outline outline-zinc-300 rounded">
				<div>
					<h4 className="text-2xl font-block ">CHECKER</h4>
				</div>

				{/* USER META DATA */}
				<div className="flex gap-4 items-center justify-center">
					<div className="h-9 w-9 rounded-full bg-white" />
					<div className="flex flex-col items-center justify-center">
						<h4 className=" font-extrabold leading-2.5 text-xl">Mannie</h4>
						<p className="text-md text-zinc-100">fid: 235343</p>
					</div>
				</div>
			</nav>

			<p className="text-xl font-semibold font-medo">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
				laboriosam mollitia cupiditate ipsum modi porro ab eaque dolorum.
			</p>

			<p className="text-lg font-pixel bg-white text-zinc-700 px-5 py-2">
				START HERE
            </p>
            <UserInfo/>
		</main>
	);
}
