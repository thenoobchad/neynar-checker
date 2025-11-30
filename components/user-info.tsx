"use client";

import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect, useState } from "react";


interface UserData {
	name: string;
	fid: number;
	neynarScore: number;
}

export default function UserInfo() {
	const [userData, setUserData] = useState<UserData | null>(null);
	const [error, setError] = useState<string | null>(null);


	return (
		<div className="p-4 text-center">
			<h1 className="text-2xl font-bold">Your Farcaster Info</h1>
		</div>
	);
}
