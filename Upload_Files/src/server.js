const connect = require("../src/configs/db");
const express = require("express");
const app = express();

app.use(express.json());

const start = async () => {
  await connect();

  app.listen(3000, () => {
    console.log("Listning port 3000");
  });
};

module.exports = start;
