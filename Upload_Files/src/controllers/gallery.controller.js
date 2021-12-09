const express = require("express");
const router = express.Router();

const Gallery = require("../models/gallery.model");

const upload = require("../middleware/upload");
const deleteOldPic = require("../utils/deletePic");

router.post("/", upload.array("pictures", 5), async (req, res) => {
  const img_list = req.files.map((file) => file.path);
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

router.delete("/:id", async (req, res) => {
  try {
    var imgs = await Gallery.findById(req.params.id);

    imgs.pictures.forEach((img, i) => {
      deleteOldPic(img);
    });
    // console.log(imgs.pictures);

    // const pics = await Gallery.findByIdAndDelete(req.params.id, { new: true });
    res.status(201).json("{ pics }");
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "Failed" });
  }
});

module.exports = router;
