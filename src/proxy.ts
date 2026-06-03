import { withSoupedAuth } from "@souped-tools/auth-nextjs/proxy";
import { NextResponse } from "next/server";

const passthrough = () => NextResponse.next();

// Auth wraps every request that matches `config.matcher` below. With matcher: []
// (the boilerplate default), the proxy doesn't run anywhere and every route is
// public — useful while you're still wiring credentials or designing routes.
//
// To turn auth on, populate matcher. Examples:
//   - protect specific routes:   ["/admin/:path*", "/api/admin/:path*"]
//   - protect everything except static assets:
//     ["/((?!_next/static|_next/image|favicon.ico).*)"]
//
// Be careful with the second pattern: covering /api/auth/* puts the OAuth
// callback itself behind login and creates a redirect loop.
//
// If you scaffolded this app via the Souped orchestrator and asked for auth,
// the auth-scaffolder agent fills `matcher` for you — don't edit it before
// the agent runs.
export const proxy = withSoupedAuth(passthrough);

export const config = {
  matcher: [],
};
