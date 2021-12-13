const express = require("express");
const router = express.Router();
const Seat = require("../models/seats.model");

router.get("/:show", async (req, res) => {
  try {
    const seats = await Seat.find().populate({path:"show", select:"total_seats"});
    res.status(201).send(seats);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

router.post("/", async (req, res) => {
  try {
    const seat = await Seat.create(req.body);

    res.status(201).send(seat);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
