import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const loggedIn = req.cookies.get("logged_in")?.value === "true";
  const { pathname } = req.nextUrl;

  const publicPages = ["/login", "/register"];

  // Redirect logged-in users away from login/register
  if (publicPages.includes(pathname)) {
    if (loggedIn) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // Redirect not-logged-in users to login
  if (!loggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
