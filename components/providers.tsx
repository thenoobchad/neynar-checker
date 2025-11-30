"use client"

import { MiniAppProvider } from "@neynar/react"
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/wagmi.config";


export default function Provider({ children }: { children: React.ReactNode }) {



    return (
			<WagmiProvider config={wagmiConfig}>
				<MiniAppProvider>{children}</MiniAppProvider>
			</WagmiProvider>
		);
}