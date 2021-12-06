const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const connect = require("./src/configs/db");
const sectionController = require("./src/controllers/section.controller");
const authorController = require("./src/controllers/author.controller");
const bookscontroller = require("./src/controllers/books.controller");
const checkcontroller = require("./src/controllers/checkout.controller");

app.use(express.json());

app.use("/section", sectionController);
app.use("/author", authorController);
app.use("/book", bookscontroller);
app.use("/checkout", checkcontroller);

const start = async () => {
  await connect();

  app.listen(port, async (req, res) => {
    console.log(`Listining port ${port}`);
  });
};

module.exports = start;
