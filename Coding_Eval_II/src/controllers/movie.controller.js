const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const Movie = require("../models/movie.model");

router.get("/:actors", async (req, res) => {
  try {
    const movies = await Movie.find({ actors: { $in: [req.params.actors] } });

    res.status(201).send(movies);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

router.post("/", upload.single("poster_url"), async (req, res) => {
  try {
    const movie = await Movie.create({
      name: req.body.name,
      actors: req.body.actors,
      languages: req.body.languages,
      directors: req.body.directors,
      poster_url: req.file.path,
    });

    res.status(201).send(movie);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
