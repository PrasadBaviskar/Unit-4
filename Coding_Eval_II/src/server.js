const express = require("express");
const connect = require("./configs/db");
const app = express();

const userController = require("./controllers/user.controller");
const movieController = require("./controllers/movie.controller");
const theatreController = require("./controllers/theatre.controller");
const screenController = require("./controllers/screen.controller");
const showController = require("./controllers/show.controller");
const seatController = require("./controllers/seat.controller");

app.use(express.json());

app.use("/user", userController);
app.use("/movie", movieController);
app.use("/theatre", theatreController);
app.use("/screen", screenController);
app.use("/show", showController);
app.use("/seat", seatController);

const start = async () => {
  await connect();

  app.listen(5000, () => {
    console.log("Lisning to port 5000");
  });
};

module.exports = start;
