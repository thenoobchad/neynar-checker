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
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <p>Context: </p>
			<UserInfo />
		</main>
	);
}
