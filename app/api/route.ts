import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return NextResponse.json(await request.json())
}

// export const dynamic = "force-dynamic";