require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};

const register = async (req, res) => {
  try {
    // check if the email is already exists
    var user = await User.findOne({ email: req.body.email });

    // if it is the throw error
    if (user) {
      return res
        .status(500)
        .json({ status: "Failed", message: "Email is already exists" });
    }
    // else create user and hash password (thiss will be in model)
    user = await User.create(req.body);

    // create token
    const token = newToken(user);

    // return user and token
    res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
};

const login = async (req, res) => {
  //check if the email rovided already exist
  try {
    // check if the email is already exists
    var user = await User.findOne({ email: req.body.email });

    // if deos not then throw error
    if (!user) {
      return res
        .status(500)
        .json({ status: "Failed", message: "Please enter valid credentials" });
    }
    // else we match the password
    const match = await bcrypt.compare(req.body.password, user.password);

    // if pwd not match then throw error
    if (!match) {
      return res
        .status(500)
        .json({ status: "Failed", message: "Please enter valid credentials" });
    }

    //if matches then create token
    const token = newToken(user);

    //return user and the token
    res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
};

module.exports = { register, login };
