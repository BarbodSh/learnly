const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    percent: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    maxUse: {
      type: Number,
      required: true,
      min: 1,
    },
    uses: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Discunt || mongoose.model("Discunt", schema);

export default model;
