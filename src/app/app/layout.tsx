import type { Metadata } from "next";
import { SoupedProvider } from "@souped-tools/auth-nextjs/client";
import { getCurrentSession } from "@/lib/auth";
import { NotificationBell } from "@/components/notifications/notification-bell";
import { Toaster } from "@/components/ui/sonner";

// Defense-in-depth: never let authenticated pages be indexed. The proxy
// (src/proxy.ts) already gates access at the edge, but tagging the layout
// keeps any crawler that bypasses the proxy (preview deploys, leaked
// links) from indexing app state.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "App",
};

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getCurrentSession();
  return (
    <SoupedProvider user={session}>
      <header className="flex items-center justify-end border-b px-4 py-2">
        {/*
          TODO(notify): the bell is only alive if the app actually emits
          notifications. It shows "No notifications" forever unless a
          `notify("<key>", ...)` call is wired at a real event point
          (signup, payment, invite, …) — see src/lib/notifications/notify.ts
          and the workflow catalog in src/lib/notifications/workflows.ts.
          Before shipping, close the loop one way or the other:
            • has notifiable events → wire notify(...) at each event, or
            • no notifiable events  → remove this <NotificationBell /> (and,
              if nothing uses them, the notifications stack) so users don't
              see a permanently empty bell.
          The souped-notify skill's Notify audit (souped SKILL.md §6.7) makes
          this an explicit decision, not something to walk past.
        */}
        <NotificationBell />
      </header>
      <main>{children}</main>
      <Toaster />
    </SoupedProvider>
  );
}
