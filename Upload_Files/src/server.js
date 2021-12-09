const connect = require("../src/configs/db");
const express = require("express");
const app = express();

const userController = require("./controllers/user.controller");

app.use(express.json());

app.use("/user", userController);

const start = async () => {
  await connect();

  app.listen(3000, () => {
    console.log("Listning port 3000");
  });
};

module.exports = start;
