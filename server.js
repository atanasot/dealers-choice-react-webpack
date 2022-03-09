const express = require("express");
const app = express();
const path = require("path");
const {
  syncAndSeed,
  models: { Num },
} = require("./db");

//Middleware

app.use(express.static(path.join(__dirname, "public"))); //getting the css file

app.use("/dist", express.static(path.join(__dirname, "dist"))); //getting the main.js that loads the script in the html

// Routes

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html"))); //getting the html file

app.get("/api/numbers", async (req, res, next) => {
  try {
    res.send(await Num.findAll());
  } catch (err) {
    next(err);
  }
});

app.post("/api/numbers", async (req, res, next) => {
  try {
    res.status(201).send(await Num.generateRandom());
  } catch (err) {
    next(err);
  }
});

app.delete("/api/numbers/:id", async(req, res, next) => {
    try {
        const number = await Num.findByPk(req.params.id)
        await number.destroy()
        res.sendStatus(204) //No content
    } catch (err) {
        next(err)
    }
})

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
