const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
const connect = require("./configs/db.connect");

const topicontroller = require("./controllers/topic.controller");
const userController = require("./controllers/user.controller");
const studentControlller = require("./controllers/student.controller");
const evalController = require("./controllers/eval.controller");

app.use("/topic", topicontroller);
app.use("/user", userController);
app.use("/student", studentControlller);
app.use("/eval", evalController);

const start = async () => {
  await connect();

  app.listen(port, () => {
    console.log(`Listning to port ${port}`);
  });
};

module.exports = start;
