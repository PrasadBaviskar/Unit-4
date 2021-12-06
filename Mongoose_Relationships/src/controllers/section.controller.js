const express = require("express");
const router = express.Router();

const Section = require("../models/section.model");

router.get("/", async (req, res) => {
  const allsections = await Section.find().lean().exec();

  res.send(allsections);
});

router.post("/", async (req, res) => {
  try {
    const section = await Section.create(req.body);
    res.status(201).send(section);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.status(201).send(section);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id, {
      new: true,
    })
      .lean()
      .exec();
    res.status(201).send(section);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
