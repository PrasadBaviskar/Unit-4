const express = require("express");
const router = express.Router();

const Eval = require("../models/eval.model");

router.get("/", async (req, res) => {
    try {
        const eval = await Eval.find();
        res.status(201).send(eval);
    } catch (e) {
        res.status(500).json({ message: e.message, status: "Failed" });
    }
});

router.post("/", async (req, res) => {
  try {
    const eval = await Eval.create(req.body);
    res.status(201).send(eval);
  } catch (e) {
    res.status(500).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router
