const { default: mongoose } = require("mongoose");
import courseModel from "@/models/course";

const schema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

schema.index({ user: 1, course: 1 }, { unique: true });

const model = mongoose.models.Favorite || mongoose.model("Favorite", schema);

export default model;
