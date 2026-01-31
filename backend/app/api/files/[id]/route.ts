import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/files/[id] - Get a single file
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
        const file = await prisma.file.findUnique({
            where: {
                id,
            },
            include: {
                project: true,
            },
        })

        if (!file || file.project.ownerId !== session.user.id) {
            return new NextResponse("File not found", { status: 404 })
        }

        return NextResponse.json(file)
    } catch (error) {
        console.error("[FILE_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// PATCH /api/files/[id] - Update a file (content/name)
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
        const { name, content } = body

        // Verify ownership via nested project query or fetching file first
        const file = await prisma.file.findUnique({
            where: { id },
            include: { project: true },
        })

        if (!file || file.project.ownerId !== session.user.id) {
            return new NextResponse("File not found", { status: 404 })
        }

        const updatedFile = await prisma.file.update({
            where: {
                id,
            },
            data: {
                name,
                content,
            },
        })

        return NextResponse.json(updatedFile)
    } catch (error) {
        console.error("[FILE_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// DELETE /api/files/[id] - Delete a file
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
        const file = await prisma.file.findUnique({
            where: { id },
            include: { project: true },
        })

        if (!file || file.project.ownerId !== session.user.id) {
            return new NextResponse("File not found", { status: 404 })
        }

        await prisma.file.delete({
            where: {
                id,
            },
        })

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.error("[FILE_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
