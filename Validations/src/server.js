const express = require("express");
const app = express();
const connect = require("../src/configs/db");
const userController = require("./controllers/user.controller");

app.use(express.json());

app.use("/user", userController);

const start = async () => {
  await connect();

  app.listen(5000, async (req, res) => {
    console.log("Listning port 5000");
  });
};

module.exports = start;
