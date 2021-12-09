const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "77e031cecd686e",
    pass: "f4252f6733c8d7",
  },
});
