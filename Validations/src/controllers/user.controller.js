const User = require("../models/user.model");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  body("first_name").notEmpty().withMessage("First Name is required"),
  body("last_name").notEmpty().withMessage("Last Name is required"),
  body("email").custom(async (value) => {
    const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(value);
    if (!isEmail) {
      throw new Error("Please enter a valid email address");
    }
    return true;
  }),

  body("pincode")
    .isLength({ min: 6, max: 6 })
    .withMessage("pincode must be 6 digits"),
  body("age").custom(async (value) => {
    const age = +value;
    if (age >= 1 && age <= 100) {
      return true;
    }
    throw new Error("Age must be in between 1 to 100.");
  }),
  body("gender").custom(async (value) => {
    const isGender = ["Male", "Female", "Other"];

    for (let i = 0; i < isGender.length; i++) {
      if (isGender[i] === value) {
        return true;
      }
      throw new Error("Please enter valid gender");
    }
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let newErrors = errors.array().map(({ msg, param, location }) => {
          return {
            [param]: msg,
          };
        });
        return res.status(400).json({ errors: newErrors });
      }

      const user = await User.create(req.body);
      return res.status(201).send(user);
    } catch (error) {
      return res.status(500).json({ status: "Failed", message: error.message });
    }
  }
);

module.exports = router;
