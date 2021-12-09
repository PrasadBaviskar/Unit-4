const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const Gallery = require("../models/gallery.model");

const upload = require("../middleware/upload");

router.post("/", upload.single("profile_pic"), async (req, res) => {
  try {
    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: req.file.path,
    });
    res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "Failed" });
  }
});

router.post("/gallery", upload.any("pictures"), async (req, res) => {
    const img_list = req.files.map((file) => file.path);
  console.log("Prasad");
  try {
    const pics = await Gallery.create({
      user: req.body.user,
      pictures: img_list,
    });
    res.status(201).json({ pics });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "Failed" });
  }
});

module.exports = router;
