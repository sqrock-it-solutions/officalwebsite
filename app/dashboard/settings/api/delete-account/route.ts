import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { confirmText } = await req.json();

    if (confirmText !== "DELETE") {
      return NextResponse.json(
        { message: 'Please type "DELETE" to confirm' },
        { status: 400 },
      );
    }

    // Delete user (cascade will delete related records)
    await db.delete(user).where(eq(user.id, session.user.id));

    // Sign out
    await auth.api.signOut({ headers: await headers() });

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete account error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to delete account" },
      { status: 500 },
    );
  }
}