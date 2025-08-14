const { default: mongoose } = require("mongoose");
import course from "@/models/course";
const schema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  username: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
    immutable: false,
  },
  responder: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  textresponse: {
    type: String,
  },
  isAnswered: {
    type: Boolean,
    default: false,
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  isShow: {
    type: Boolean,
    default: false,
  },
});

const model = mongoose.models.Comment || mongoose.model("Comment", schema);
export default model;
