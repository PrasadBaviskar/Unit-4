const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

const connect = require("./configs/db");
const userController = require("./controllers/user.controller");

app.use(express.json());
app.use("/user", userController);

const start = async () => {
  await connect();
  app.listen(port, () => {
    console.log(`Listning to port ${port}`);
  });
};

module.exports = start;
