import connectToDB from "@/backend/configs/db";
import userModel from "@/backend/models/user";

export async function GET() {
  await connectToDB();

  try {
    const users = await userModel.find();
    return Response.json({ message: "successfully", users }, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "خطای داخلی سرور." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
