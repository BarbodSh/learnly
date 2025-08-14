import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
});

const model = mongoose.models.Category || mongoose.model("Category", schema);
export default model;
