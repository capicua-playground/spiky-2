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
        <NotificationBell />
      </header>
      <main>{children}</main>
      <Toaster />
    </SoupedProvider>
  );
}
