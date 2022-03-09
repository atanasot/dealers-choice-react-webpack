const router = require("express").Router();
const {
  models: { Num },
} = require("./db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await Num.findAll());
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Num.generateRandom());
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const number = await Num.findByPk(req.params.id);
    await number.destroy();
    res.sendStatus(204); //No content
  } catch (err) {
    next(err);
  }
});


module.exports = router