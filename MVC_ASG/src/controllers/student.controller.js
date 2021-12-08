const express = require("express");
const router = express.Router();

const Student = require("../models/student.model");

router.get("/:eval", async (req, res) => {
  try {
    const allStudents = await Student.find({eval:{$eq:264}})
      .populate({path : "user_id", select: "first_name"})
      .populate({ path: "eval", select: "topic" })
      .lean()
      .exec();


    res.status(201).send(allStudents);
  } catch (e) {
    res.status(500).json({ message: e.message, status: "Failed" });
  }
});

router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).send(student);
  } catch (e) {
    res.status(500).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
