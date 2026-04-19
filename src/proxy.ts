import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "lt_access";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (request.cookies.get(COOKIE_NAME)?.value === "1") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = `?next=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - /login (the login page itself)
     * - /api/auth (the auth endpoint)
     * - /_next/static, /_next/image (build assets)
     * - favicon.ico, *.svg, robots.txt, sitemap.xml (static files)
     */
    "/((?!login|api/auth|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.svg$).*)",
  ],
};
