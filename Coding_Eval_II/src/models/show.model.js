const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    timing: { type: String, required: true },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movie",
      required: true,
    },
    total_seats: { type: Number, required: true },
    screen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theatre",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("show", showSchema);
