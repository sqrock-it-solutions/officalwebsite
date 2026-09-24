import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq, and, ne } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, image, email } = await req.json();

    // Validate
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { message: "Name must be at least 2 characters" },
        { status: 400 },
      );
    }

    // If email changed, check unique
    if (email && email !== session.user.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { message: "Invalid email address" },
          { status: 400 },
        );
      }

      const [existing] = await db
        .select()
        .from(user)
        .where(and(eq(user.email, email), ne(user.id, session.user.id)))
        .limit(1);

      if (existing) {
        return NextResponse.json(
          { message: "Email already in use" },
          { status: 409 },
        );
      }
    }

    // Update
    await db
      .update(user)
      .set({
        name: name.trim(),
        image: image || null,
        ...(email && { email }),
      })
      .where(eq(user.id, session.user.id));

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error: any) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to update profile" },
      { status: 500 },
    );
  }
}