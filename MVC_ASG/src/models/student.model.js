const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    student_code: { type: Number, required: true },
    current_batch: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    eval : {
      type: mongoose.Schema.Types.ObjectId,
      ref : "eval",
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("student", studentSchema);
