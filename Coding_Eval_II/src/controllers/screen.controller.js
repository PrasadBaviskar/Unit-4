const express = require("express");
const router = express.Router();
const Screen = require("../models/screen.model");

router.post("/", async (req, res) => {
  try {
    const screen = await Screen.create(req.body);

    res.status(201).send(screen);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
