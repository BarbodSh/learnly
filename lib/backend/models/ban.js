const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Ban || mongoose.model("Ban", schema);
export default model;
