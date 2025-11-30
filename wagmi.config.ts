import { http, createConfig } from "wagmi";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";
import { base } from "wagmi/chains";


export const wagmiConfig = createConfig({
    chains: [base],
    transports: { [base.id]: http() },
    connectors:[farcasterMiniApp()]
})