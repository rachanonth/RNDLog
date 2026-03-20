import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secret = () =>
  new TextEncoder().encode(
    process.env.AUTH_SECRET ?? "fallback-dev-secret-change-in-prod"
  );

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let the login page through unconditionally
  if (pathname === "/admin/login") return NextResponse.next();

  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    await jwtVerify(token, secret());
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
    response.cookies.delete("admin_token");
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
