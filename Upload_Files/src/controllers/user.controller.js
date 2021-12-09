const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

const upload = require("../middleware/upload");

const deleteOldPic = require("../utils/deletePic");

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

router.patch("/:id", upload.single("profile_pic"), async (req, res) => {
  try {
    let u = await User.findById(req.params.id);
    console.log(u.profile_pic);
    deleteOldPic(u.profile_pic);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        profile_pic: req.file.path,
      },
      {
        new: true,
      }
    );
    res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "Failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let u = await User.findById(req.params.id);
    deleteOldPic(u.profile_pic);
    const user = await User.findByIdAndDelete(req.params.id, {
      new: true,
    });
    res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "Failed" });
  }
});

module.exports = router;
