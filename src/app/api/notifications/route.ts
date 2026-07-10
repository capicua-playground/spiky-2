import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await getCurrentSession();
  if (!session?.sub) {
    return NextResponse.json({ items: [], unreadCount: 0 }, { status: 401 });
  }

  const since = new URL(request.url).searchParams.get("since");
  const sinceDate = since ? new Date(since) : null;
  const validSince = sinceDate && !Number.isNaN(sinceDate.getTime()) ? sinceDate : null;

  const [rows, unreadCount] = await Promise.all([
    db.notification.findMany({
      where: {
        userSub: session.sub,
        ...(validSince ? { createdAt: { gt: validSince } } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    db.notification.count({ where: { userSub: session.sub, readAt: null } }),
  ]);

  const items = rows.map((n) => ({
    id: n.id,
    workflowKey: n.workflowKey,
    title: n.title,
    body: n.body,
    readAt: n.readAt ? n.readAt.toISOString() : null,
    createdAt: n.createdAt.toISOString(),
  }));

  return NextResponse.json({ items, unreadCount });
}
