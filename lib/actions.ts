"use server"

import { NeynarAPIClient } from "@neynar/nodejs-sdk"
import { revalidatePath } from "next/cache"

const neynarClient = new NeynarAPIClient({
    apiKey: process.env.NEYNAR_API_KEY!,
})

export async function fetchNeynarScoreAndStat(fid: number) {
    if (!fid) {
        throw new Error("Fid is required")
    }

    try {
        const userData = await neynarClient.fetchBulkUsers({ fids: [fid] })
        const user = userData.users[0]

        if(!user) {
            throw new Error("User not found")
        }

        const scoreResponse = await fetch(`https://api.neynar.com/v2/farcaster/user/score/${user.fid}`, {
            method: 'GET',
            headers: {
                'api_key': process.env.NEYNAR_API_KEY!
            }
        })

        let scoreData = { score: 0.5 }
        if (scoreResponse.ok) {
            const scoreJson = await scoreResponse.json()
            scoreData = scoreJson || { score: 0.5 }
        } else {
            console.error(`Failed to fetch score: ${scoreResponse.status} ${scoreResponse.statusText}`)
        }

        return {
            success: true,
            score: scoreData.score,
            stats: {
                username: user.username,
                followingCount: user.following_count,
                followersCount: user.follower_count,
             
            },
        }
    } catch (error) {
        console.error("Error fetching Neynar score and stats:", error)
        return {
            success: false,
            error:'Failes to fetch data from neynar'
        }
    } finally {
        // Revalidate the path to update the UI
        revalidatePath("/")
    }
}