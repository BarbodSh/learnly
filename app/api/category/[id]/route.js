import connectToDB from "@/backend/configs/db";
import { removeCategory, updateCategory } from "@/backend/utils/category";
import { authAdmin } from "@/backend/utils/helper";
import { categoryValidation } from "@/validator/category";
import { validateID } from "@/validator/helper";

export async function PUT(req, { params }) {
  try {
    const isAdmin = await authAdmin();
    if (!isAdmin) {
      throw new Error("this api protected and you can't access it");
    }

    const body = await req.json();
    const param = await params;

    const validateTitle = categoryValidation(body.title);
    const validateId = validateID(param.id);
    if (!validateTitle || !validateId) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }

    await connectToDB();

    const res = updateCategory(body, param.id);
    return res;
  } catch (err) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const isAdmin = await authAdmin();
    if (!isAdmin) {
      throw new Error("this api protected and you can't access it");
    }

    const param = await params;
    const validate = validateID(param.id);
    if (!validate) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }

    await connectToDB();
    const res = removeCategory(param.id);
    return res;
  } catch (err) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
