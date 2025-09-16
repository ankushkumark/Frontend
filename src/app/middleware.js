import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value || null;

  const { pathname } = req.nextUrl;

  if (!token && pathname !== "/login" && pathname !== "/signup") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
