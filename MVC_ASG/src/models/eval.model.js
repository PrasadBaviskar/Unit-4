const mongoose = require("mongoose");

const evalSchema = new mongoose.Schema(
  {
    doe: { type: String, required: true },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "topic",
      required: true,
    },
  },
  {
    versionKey: false,
    timeStamps: true,
  }
);

module.exports = mongoose.model("eval", evalSchema);
