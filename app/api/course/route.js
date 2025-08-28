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
    const priceFrom = searchParams.get("priceFrom");
    const priceTo = searchParams.get("priceTo");

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    console.log(priceFrom, priceTo);
    console.log(title);
    if (priceFrom || priceTo) {
      query.price = {};
      if (priceFrom && priceFrom !== "" && priceFrom !== "null") {
        query.price.$gte = Number(priceFrom);
      }
      if (priceTo && priceTo !== "" && priceTo !== "null") {
        query.price.$lte = Number(priceTo);
      }
    }
    console.log(query);
    const courses = await courseModel.find(query);
    return Response.json({ message: "successfully", courses }, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: "خطای داخلی سرور." },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
