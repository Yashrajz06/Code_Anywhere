import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/projects - List all projects for the logged-in user
export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const projects = await prisma.project.findMany({
            where: {
                ownerId: session.user.id,
            },
            orderBy: {
                updatedAt: "desc",
            },
        })

        return NextResponse.json(projects)
    } catch (error) {
        console.error("[PROJECTS_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// POST /api/projects - Create a new project
export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await req.json()
        const { name, description, language } = body

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        const project = await prisma.project.create({
            data: {
                name,
                description,
                language: language || "javascript",
                ownerId: session.user.id,
            },
        })

        return NextResponse.json(project)
    } catch (error) {
        console.error("[PROJECTS_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
