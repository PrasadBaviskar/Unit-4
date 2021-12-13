const express = require("express");
const connect = require("./configs/db");
const app = express();

const userController = require("./controllers/user.controller");
const movieController = require("./controllers/movie.controller");

app.use("/user", userController);
app.use("/movie", movieController);

const start = async () => {
  await connect();

  app.listen(5000, () => {
    console.log("Lisning to port 5000");
  });
};

module.exports = start;
