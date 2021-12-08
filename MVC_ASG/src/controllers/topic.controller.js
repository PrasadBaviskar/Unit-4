const express = require("express");
const Topic = require("../models/topic.model");
const router = express.Router();

router.get("/", async (req, res) => {
  const allTopics = await Topic.find().lean().exec();
  res.send(allTopics);
});

router.post("/", async (req, res) => {
  try {
    const topic = await Topic.create(req.body);
    res.status(201).send(topic);
  } catch (e) {
    res.status(500).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
