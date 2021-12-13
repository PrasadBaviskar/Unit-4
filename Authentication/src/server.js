const express = require("express");
const app = express();
const connect = require("../src/configs/db");

const { register, login } = require("./controllers/auth.controller");

app.use(express.json());

// app.use("/user", userController);
app.post("/register", register);
app.post("/login", login);

const start = async () => {
  await connect();

  app.listen(5000, async () => {
    console.log("Listning port 5000");
  });
};

module.exports = start;
