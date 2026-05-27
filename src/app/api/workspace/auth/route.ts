import { NextResponse } from "next/server";

const COOKIE_NAME = "lex_workspace";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 dias

export async function POST(request: Request) {
  const secret = process.env.WORKSPACE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { erro: "Proteção do workspace não configurada (WORKSPACE_SECRET)." },
      { status: 503 }
    );
  }

  const body = (await request.json()) as { senha?: string };
  if (body.senha !== secret) {
    return NextResponse.json({ erro: "Senha incorreta." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return res;
}
