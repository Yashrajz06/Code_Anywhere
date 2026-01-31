import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// POST /api/files - Create a new file in a project
export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await req.json()
        const { name, content, projectId } = body

        if (!name || !projectId) {
            return new NextResponse("Name and Project ID are required", { status: 400 })
        }

        // Verify project ownership
        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
                ownerId: session.user.id,
            },
        })

        if (!project) {
            return new NextResponse("Project not found", { status: 404 })
        }

        const file = await prisma.file.create({
            data: {
                name,
                content: content || "",
                projectId,
            },
        })

        return NextResponse.json(file)
    } catch (error) {
        console.error("[FILES_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
