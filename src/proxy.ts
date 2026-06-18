import { withSoupedAuth } from "@souped-tools/auth-nextjs/proxy";
import { NextResponse } from "next/server";

const passthrough = () => NextResponse.next();

// Auth runs on every request that matches `config.matcher` below.
//
// Default convention:
//   - `/`                  → public landing
//   - `/app/:path*`        → authenticated app
//   - `/api/auth/*`        → OAuth endpoints (public, must NOT be matched
//                             — covering them would loop the login flow)
//   - `/api/<anything>`    → authenticated by default
//
// If you want to expose extra public API routes, add them to the negative
// lookahead, e.g. `/api/((?!auth|public).*)`. If you want a different
// app prefix (`/dashboard`, `/admin`, …), swap `/app` for that segment.
//
// The Souped auth-scaffolder agent tunes this matcher when it wires
// per-route protection — only edit it manually if you know what you want.
export const proxy = withSoupedAuth(passthrough);

export const config = {
  matcher: ["/app/:path*", "/api/((?!auth).*)"],
};
