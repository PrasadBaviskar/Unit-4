const User = require("../models/user.model");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");



// route for sign up

router.post(
  "/signup",
  body("name").notEmpty().withMessage("Name is required"),
  body("email").custom(async (value) => {
    const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(value);
    if (!isEmail) {
      throw new Error("Please enter a valid email address");
    }
    return true;
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

// route for sign in
router.post(
  "/signin",
  body("email").custom(async (value) => {
    const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(value);
    if (!isEmail) {
      throw new Error("Please enter a valid email address");
    }
    return true;
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
