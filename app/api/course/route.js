import connectToDB from "@/backend/configs/db";
import { createCourse } from "@/backend/utils/course";
import { authAdmin } from "@/backend/utils/helper";
import courseModel from "@/models/course";

export async function POST(req) {
  try {
    const isAdmin = await authAdmin();
    if (!isAdmin) {
      throw new Error("this api protected and you can't access it");
    }
    await connectToDB();
    const formData = await req.formData();
    const res = await createCourse(formData);
    return res;
  } catch (err) {
    return Response.json(
      { error: "خطای داخلی سرور." },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(req) {
  await connectToDB();
  try {
    const query = {};
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title")?.trim();
    const priceFromRaw = searchParams.get("priceFrom");
    const priceToRaw = searchParams.get("priceTo");

    const priceFrom = priceFromRaw ? Number(priceFromRaw) : null;
    const priceTo = priceToRaw ? Number(priceToRaw) : null;

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (priceFrom !== null || priceTo !== null) {
      query.price = {};
      if (priceFrom !== null) query.price.$gte = priceFrom;
      if (priceTo !== null) query.price.$lte = priceTo;
    }
    const courses = await courseModel.find(query);
    return Response.json({ message: "successfully", courses }, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: "خطای داخلی سرور." },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
