const { default: mongoose } = require("mongoose");
import CategoryModel from "@/models/category";
import userModel from "@/models/user";
import commentModel from "@/models/comment";
import lessonModel from "@/models/lesson";
const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isFree: {
      type: Boolean,
      required: true,
      default: false,
    },
    score: {
      type: Number,
      default: 5,
    },
    support: {
      type: String,
      enum: ["chat", "email", "phone", "none"],
      required: true,
      default: "none",
    },
    teacher: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    lesson: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Lesson",
        },
      ],
    },
    comments: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Comment",
        },
      ],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Course || mongoose.model("Course", schema);
export default model;
