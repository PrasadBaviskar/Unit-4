const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const Show = require("../models/show.model");

router.post("/", async (req, res) => {
  try {
    const show = await Show.create(req.body);

    res.status(201).send(show);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
