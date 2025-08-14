const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    isFree: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Lesson || mongoose.model("Lesson", schema);
export default model;
