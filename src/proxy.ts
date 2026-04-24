import { withSoupedAuth } from "@souped-tools/auth-nextjs/proxy";
import { NextResponse } from "next/server";

const authEnabled = process.env.SOUPED_AUTH_ENABLED === "true";

const passthrough = () => NextResponse.next();

// When SOUPED_AUTH_ENABLED=false (default in the boilerplate), the proxy is
// pure passthrough — every route is public. To turn on Souped login, set the
// flag to "true" in your env and fill the SOUPED_* credentials. See AGENTS.md.
export const proxy = authEnabled ? withSoupedAuth(passthrough) : passthrough;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
