import { NextRequest, NextResponse } from "next/server";

const ACCESS_CODE = process.env.ACCESS_CODE ?? "xie";
const COOKIE_NAME = "lt_access";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export async function POST(request: NextRequest) {
  const { code } = await request.json();

  if (typeof code !== "string" || code !== ACCESS_CODE) {
    return NextResponse.json(
      { success: false, error: "Invalid code" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE_SECONDS,
    path: "/",
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}
