const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
  {
    section_type: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Section = mongoose.model("section", sectionSchema);

module.exports = Section;
