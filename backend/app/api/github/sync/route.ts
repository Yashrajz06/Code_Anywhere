import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { Octokit } from "octokit"
import { prisma } from "@/lib/prisma"

// POST /api/github/sync - Create or push to a repo
export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

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
        const body = await req.json()
        const { projectId, repoName, description, isPrivate } = body

        // Get project files
        const project = await prisma.project.findUnique({
            where: { id: projectId, ownerId: session.user.id },
            include: { files: true }
        })

        if (!project) return new NextResponse("Project not found", { status: 404 })

        const octokit = new Octokit({
            auth: account.access_token,
        })

        // 1. Create Repo (if not exists logic handled by try/catch or explicitly?)
        // Basic implementation: Create new repo always for now, or check exist
        let repoUrl = ""

        try {
            const { data: repo } = await octokit.request("POST /user/repos", {
                name: repoName || project.name,
                description: description || project.description || "Created with Code Anywhere",
                private: isPrivate || false,
                auto_init: true
            })
            repoUrl = repo.html_url
        } catch (e: any) {
            // If repo exists, we might want to just commit to it?
            // For simple flow, just error or assume it needs to be unique
            if (e.status === 422) {
                // Repo exists
                // Logic to get existing repo owner/name
                // Assuming we own it:
                // repoUrl = ...
                // For MVP, just return error "Repo exists"
                return new NextResponse("Repository already exists. Please choose a different name.", { status: 422 })
            }
            throw e
        }

        // 2. Commit files
        // This is complex using API directly (Git Data API).
        // Simplified: Use creating a file PUT for each file (inefficient but works for small projects)
        // Or use GraphQL/Trees for batch.

        // Using simple loop for MVP
        const owner = (await octokit.request("GET /user")).data.login
        const repo = repoName || project.name

        for (const file of project.files) {
            try {
                await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                    owner,
                    repo,
                    path: file.name, // e.g., "src/main.ts" if path included, or just filename
                    message: `Update ${file.name}`,
                    content: Buffer.from(file.content).toString('base64'),
                    committer: {
                        name: session.user.name || "Code Anywhere User",
                        email: session.user.email || "user@example.com"
                    }
                })
            } catch (fileError) {
                console.error(`Failed to push file ${file.name}`, fileError)
            }
        }

        return NextResponse.json({ success: true, url: repoUrl })

    } catch (error) {
        console.error("[GITHUB_SYNC]", error)
        return new NextResponse("GitHub Sync Error", { status: 500 })
    }
}
