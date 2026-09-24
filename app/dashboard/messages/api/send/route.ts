import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { projectMessages, userProjects } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { projectId, message } = await req.json();

    if (!projectId || !message?.trim()) {
      return NextResponse.json(
        { message: "Project and message required" },
        { status: 400 },
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { message: "Message too long (max 5000 characters)" },
        { status: 400 },
      );
    }

    // Verify ownership
    const [project] = await db
      .select()
      .from(userProjects)
      .where(
        and(
          eq(userProjects.id, projectId),
          eq(userProjects.userId, userId),
        ),
      )
      .limit(1);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 },
      );
    }

    // Insert message
    const [newMessage] = await db
      .insert(projectMessages)
      .values({
        projectId,
        senderId: userId,
        message: message.trim(),
      })
      .returning();

    // Update project timestamp
    await db
      .update(userProjects)
      .set({ updatedAt: new Date() })
      .where(eq(userProjects.id, projectId));

    return NextResponse.json(
      { success: true, message: newMessage },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Send message error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to send" },
      { status: 500 },
    );
  }
}