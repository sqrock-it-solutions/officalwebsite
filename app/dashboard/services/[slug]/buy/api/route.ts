import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  try {
    const [service] = await db
      .select()
      .from(services)
      .where(eq(services.slug, slug))
      .limit(1);

    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 },
      );
    }

    if (!service.isActive) {
      return NextResponse.json(
        { message: "Service is not available" },
        { status: 400 },
      );
    }

    return NextResponse.json({ service });
  } catch (error: any) {
    console.error("Service GET error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch" },
      { status: 500 },
    );
  }
}