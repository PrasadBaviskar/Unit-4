const express = require("express");
const app = express();
const User = require("../models/user.model");

app.post("/", async (req, res) => {
  try {
    const user = User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "Failed" });
  }
});
