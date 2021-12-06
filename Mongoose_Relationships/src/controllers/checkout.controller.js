const express = require("express");
const router = express.Router();

const Checkout = require("../models/checkout.model");

router.get("/", async (req, res) => {
  const chekout = await Checkout.find().populate("book","title").lean().exec();

  res.send(chekout);
});

router.post("/", async (req, res) => {
  try {
    const chekout = await Checkout.create(req.body);
    res.status(201).send(chekout);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const chekout = await Checkout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.status(201).send(chekout);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id, {
      new: true,
    })
      .lean()
      .exec();
    res.status(201).send(author);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
