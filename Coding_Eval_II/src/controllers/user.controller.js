const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const User = require("../models/user.model");

router.post("/", upload.single("profile_photo_url"), async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profile_photo_url: req.file.path,
      roles: req.body.roles,
    });

    res.status(201).send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
