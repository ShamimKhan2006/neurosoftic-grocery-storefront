import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("firebaseToken")?.value;

  console.log("Proxy:", request.nextUrl.pathname);
  console.log("Token:", token ? "Found" : "Not Found");

  if (!token) {
    const loginUrl = new URL("/auth/signin", request.url);

    loginUrl.searchParams.set(
      "redirect",
      request.nextUrl.pathname
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/products",
    "/products/:path*",
    "/dashboard/:path*",
  ],
};