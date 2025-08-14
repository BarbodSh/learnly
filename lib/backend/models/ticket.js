const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    default: 1,
    enum: [1, 2, 3],
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
});

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema);
export default model;
