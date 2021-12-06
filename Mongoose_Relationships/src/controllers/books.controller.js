const express = require("express");
const router = express.Router();

const Book = require("../models/books.model");

router.get("/", async (req, res) => {
  const allbooks = await Book.find()
    .populate("author", "first_name")
    .populate("section", "section_type")
    .lean()
    .exec();

  res.send(allbooks);
});

router.get("/:first_name", async (req, res) => {
    console.log(req.params.first_name);
  const allbooks = await Book.find({ "author.first_name": req.params.first_name })
    .populate("author", "first_name")
    .populate("section", "section_type")
    .lean()
    .exec();

  res.send(allbooks);
});

router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).send(book);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.status(201).send(book);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id, {
      new: true,
    })
      .lean()
      .exec();
    res.status(201).send(book);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
