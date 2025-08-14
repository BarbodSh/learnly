const { default: mongoose } = require("mongoose");
const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: [{ type: mongoose.Types.ObjectId, ref: "Course", required: true }],
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Order || mongoose.model("Order", schema);
export default model;
