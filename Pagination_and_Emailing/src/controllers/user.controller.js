const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const transport = require("../configs/mail");

router.get("/", async (req, res) => {
  let page = +req.query.page || 1;
  let size = +req.query.size || 3;

  let sk = (page - 1) * size;
  const users = await User.find().skip(sk).limit(size).lean().exec();
  res.send(users);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    // console.log(`Welcome to ABC system ${user.first_name} ${user.last_name}`);

    // Send mail to user
    transport.sendMail({
      from: "check_assignment@masai.school",
      to: "user@gmail.com",
      subject: `Welcome to ABC system ${user.first_name} ${user.last_name}`,
      text: `Hi ${user.first_name}, Please confirm your email address`,
      html: "<h1> Welcome To Masai School </h1>",
    });

    let admins = [
      "admin_1@gmail.com",
      "admin_2@gmail.com",
      "admin_3@gmail.com",
      "admin_4@gmail.com",
    ];

    //send mail to admins

    admins.forEach((admin, i) => {
      setTimeout(function () {
        transport.sendMail({
          from: "student_portal@masai.school",
          to: admin,
          subject: `${user.first_name} ${user.last_name} has registered with us.`,
          text: `Please welcome ${user.first_name} ${user.last_name}.`,
          html: "<h1> Welcome To Masai School </h1>",
        });
      }, i * 1000);
    });

    res.status(201).send(user);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "Failed" });
  }
});

module.exports = router;
