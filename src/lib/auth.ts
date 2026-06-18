import { getSession } from "@souped-tools/auth-nextjs";

export type CurrentSession = Awaited<ReturnType<typeof getSession>>;

/**
 * Single entry point for reading the current user's session from server
 * components, server actions, and route handlers. Returns `null` if there
 * is no session.
 *
 * The Souped auth-scaffolder may later replace this file with a richer
 * helper that upserts a Prisma `User` row on every call (lazy sync) and
 * exposes `requireUser` / `requireRole`. Until that runs, this thin
 * wrapper is enough: the JWT in the session cookie already carries `sub`,
 * `email`, and `roles`.
 */
export async function getCurrentSession(): Promise<CurrentSession> {
  return getSession();
}
