const express = require("express");
const app = express();
const path = require("path");
const { syncAndSeed } = require("./db");
const router = require("./numbers.routes");

app.use(express.static(path.join(__dirname, "public"))); //getting the css file and html file

app.use("/dist", express.static(path.join(__dirname, "dist"))); //getting the main.js that loads the script in the html

app.use("/api/numbers", router);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    syncAndSeed();
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
