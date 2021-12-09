const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    pictures: [{ type: String, required: true }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("gallery", gallerySchema);
