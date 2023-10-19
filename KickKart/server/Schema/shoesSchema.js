const mongoose = require("mongoose");

const ShoesScehma = new mongoose.Schema({
  image: {
    type: String,
    require: true,
    default:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1350,h_1350/global/307778/03/sv01/fnd/PNA/fmt/png/Porsche-Legacy-SPEEDFUSION-Men's-Driving-Shoes",
  },
  name: {
    type: String,
    require: true,
    default: "Leopard Shoes",
  },
  color: {
    type: String,
    default: "black",
  },
  type: {
    type: Array,
    default: ["Unknown"],
  },

  rate: {
    type: Number,
    default: 100,
  },
  brand: {
    type: String,
    default: "none",
  },
  sale: {
    type: String,
    default: "false",
  },
  salePrice: {
    type: Number,
    default: 0,
  },
});

const Shoesmodel = mongoose.model("Shoes", ShoesScehma);
Shoesmodel.createIndexes();

module.exports = Shoesmodel;
