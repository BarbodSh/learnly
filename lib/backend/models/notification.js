const { default: mongoose } = require("mongoose");
import userModel from "@/models/user";
const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  recipient: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const model =
  mongoose.models.Notification || mongoose.model("Notification", schema);
export default model;
