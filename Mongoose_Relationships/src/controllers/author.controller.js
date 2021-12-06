const express = require("express");
const router = express.Router();

const Author = require("../models/author.model");

router.get("/", async (req, res) => {
  const allauthors = await Author.find().lean().exec();

  res.send(allauthors);
});

router.post("/", async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).send(author);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.status(201).send(author);
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
