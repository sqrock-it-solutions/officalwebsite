import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { BuyClient } from "./components/buy-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceBuyPage({ params }: PageProps) {
  // ⬇️ Next.js 15+ me params Promise hai
  const { slug } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  const [service] = await db
    .select()
    .from(services)
    .where(eq(services.slug, slug))
    .limit(1);

  if (!service || !service.isActive) {
    notFound();
  }

  const price = parseFloat(service.standalonePrice || "0");
  if (price <= 0) {
    redirect("/dashboard/services");
  }

  return (
    <BuyClient
      service={{
        id: service.id,
        name: service.name,
        slug: service.slug,
        description: service.description,
        icon: service.icon,
        color: service.color,
        standalonePrice: service.standalonePrice!,
        deliveryDays: service.deliveryDays,
      }}
      user={{
        name: session.user.name,
        email: session.user.email,
      }}
    />
  );
}