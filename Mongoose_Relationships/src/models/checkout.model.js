const mongoose = require("mongoose");
const Book = require("./books.model");

const checkoutSchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "book", required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Checkout = mongoose.model("checkout", checkoutSchema);

module.exports = Checkout;
