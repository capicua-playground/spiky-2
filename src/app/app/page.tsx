import { getCurrentSession } from "@/lib/auth";
import { AppHomeContent } from "./_components/app-home-content";

export default async function AppHome() {
  const session = await getCurrentSession();
  // The proxy guarantees a session by the time this renders, but
  // we still pass `email` defensively in case the proxy ever changes.
  return <AppHomeContent email={session?.email ?? null} />;
}
