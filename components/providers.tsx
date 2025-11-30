"use client"

import { MiniAppProvider } from "@neynar/react"

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <MiniAppProvider>
            {children}
        </MiniAppProvider>
    )
}