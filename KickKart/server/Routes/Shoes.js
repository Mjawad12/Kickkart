const express = require("express");
const router = express.Router();
const Shoesmodel = require("../Schema/shoesSchema");

router.get("/Men", async (req, res) => {
  try {
    const shoes = await Shoesmodel.find({ type: "men" });
    res.status(200).send(shoes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Enternal SErver error");
  }
});

router.get("/Women", async (req, res) => {
  try {
    const shoes = await Shoesmodel.find({ type: "women" });
    res.status(200).send(shoes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Enternal SErver error");
  }
});
router.get("/Kids", async (req, res) => {
  try {
    const shoes = await Shoesmodel.find({ type: "kids" });
    res.status(200).send(shoes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Enternal SErver error");
  }
});
router.get("/Allshoes", async (req, res) => {
  try {
    const shoes = await Shoesmodel.find();
    res.status(200).send(shoes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Enternal SErver error");
  }
});

router.post("/addshoes", async (req, res) => {
  try {
    const newShoes = await Shoesmodel.create({
      image: req.body.image,
      name: req.body.name,
      color: req.body.color,
      type: req.body.type,
      rate: req.body.rate,
      brand: req.body.brand,
      sale: req.body.sale,
      salePrice: req.body.salePrice,
    });
    res.send(newShoes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Enternal Server error");
  }
});

//  get shoes by id

router.post("/getShoes", async (req, res) => {
  try {
    let id = req.body.id;
    const fetchedShoe = await Shoesmodel.findById(id);
    if (fetchedShoe) {
      res.status(200).send(fetchedShoe);
    } else {
      res.status(400).send("invalid id");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Enternal Server error");
  }
});

module.exports = router;
