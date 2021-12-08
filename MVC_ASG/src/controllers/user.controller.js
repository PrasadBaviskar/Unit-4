const express = require("express");
const router = express.Router();
const User = require("../models/users.model");

router.get("/", async (req, res) => {
  const Allusers = await User.find().lean().exec();
  res.send(Allusers);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "Failed" });
  }
});

module.exports = router;
