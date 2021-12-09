const connect = require("../src/configs/db");
const express = require("express");
const app = express();

const userController = require("./controllers/user.controller");
const gallery_Controller = require("./controllers/gallery.controller");

app.use(express.json());

app.use("/user", userController);
app.use("/gallery", gallery_Controller);

const start = async () => {
  await connect();

  app.listen(3000, () => {
    console.log("Listning port 3000");
  });
};

module.exports = start;
