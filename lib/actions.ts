"use server"

import { NeynarAPIClient } from "@neynar/nodejs-sdk"
import { revalidatePath } from "next/cache"

const neynarClient = new NeynarAPIClient({
    apiKey: process.env.NEYNAR_API_KEY!,
})

export async function fetchNeynarScoreAndStat() {
    // if (!fid) {
    //     throw new Error("Fid is required")
    // }

    try {
        const userData = await neynarClient.fetchBulkUsers({ fids: [1120583] })
        const user = userData.users[0]
        console.log("This is the",user.profile)
        if(!user) {
            throw new Error("User not found")
        }

        const scoreData = { score: user.score }


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