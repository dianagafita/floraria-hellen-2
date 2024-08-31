import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const url = request.nextUrl.clone();

  if (
    url.pathname.startsWith("/admin/request-password") ||
    url.pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;

  if (token) {
    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      return NextResponse.next();
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }

  url.pathname = "/admin/request-password";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
