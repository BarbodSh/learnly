import connectToDB from "@/lib/backend/configs/db";
import { cookies } from "next/headers";

export async function POST() {
  await connectToDB();

  try {
    cookies().set("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
      maxAge: 0,
    });

    return Response.json(
      { message: "Signed out successfully" },
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "خطای داخلی سرور." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
