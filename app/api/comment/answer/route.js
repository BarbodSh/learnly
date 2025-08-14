import connectToDB from "@/lib/backend/configs/db";
import { answerComment } from "@/lib/backend/utils/comment";
import { authAdmin } from "@/lib/backend/utils/helper";
import { commentTextValidate } from "@/lib/validator/comment";
import { validateID } from "@/lib/validator/helper";

export async function PUT(req) {
  try {
    const isAdmin = await authAdmin();
    if (!isAdmin) {
      throw new Error("this api protected and you can't access it");
    }

    const body = await req.json();

    const validateCommentID = validateID(body.commentID);
    const validateResponderID = validateID(body.responder);
    const validateTextResponse = commentTextValidate(body.textresponse);

    if (
      !validateCommentID ||
      !validateResponderID ||
      validateTextResponse !== true
    ) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }

    await connectToDB();
    const res = await answerComment(body);
    return res;
  } catch (err) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
