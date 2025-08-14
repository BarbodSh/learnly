import connectToDB from "@/backend/configs/db";
import getMe from "@/backend/utils/getme";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    const res = await getMe(token);
    return res;
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "خطای داخلی سرور." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
