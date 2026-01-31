import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/projects/[id] - Get a single project
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session || !session.user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const project = await prisma.project.findUnique({
            where: {
                id,
                ownerId: session.user.id,
            },
            include: {
                files: true,
            },
        })

        if (!project) {
            return new NextResponse("Project not found", { status: 404 })
        }

        return NextResponse.json(project)
    } catch (error) {
        console.error("[PROJECT_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// PATCH /api/projects/[id] - Update a project
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session || !session.user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await req.json()
        const { name, description } = body

        const project = await prisma.project.update({
            where: {
                id,
                ownerId: session.user.id, // Ensure ownership
            },
            data: {
                name,
                description,
            },
        })

        return NextResponse.json(project)
    } catch (error) {
        console.error("[PROJECT_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session || !session.user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        await prisma.project.delete({
            where: {
                id,
                ownerId: session.user.id,
            },
        })

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.error("[PROJECT_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
