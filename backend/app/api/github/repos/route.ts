import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { Octokit } from "octokit"

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    // Retrieve access token from session/account (Requires configuring session to include accessToken)
    // For now, assume we can get it from the account in usage, but NextAuth session callback needs adjustment
    // Or query the Account model directly.

    // Actually, let's query the Account model to get the token for the user.
    // We can import prisma from lib.
    const { prisma } = await import("@/lib/prisma")

    const account = await prisma.account.findFirst({
        where: {
            userId: session.user.id,
            provider: "github"
        }
    })

    if (!account || !account.access_token) {
        return new NextResponse("GitHub account not linked", { status: 400 })
    }

    try {
        const octokit = new Octokit({
            auth: account.access_token,
        })

        const { data } = await octokit.request("GET /user/repos", {
            sort: "updated",
            direction: "desc",
            per_page: 30
        })

        return NextResponse.json(data)
    } catch (error) {
        console.error("[GITHUB_REPOS]", error)
        return new NextResponse("GitHub Error", { status: 500 })
    }
}
