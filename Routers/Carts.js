const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Products = require("../Models/Products");
const Carts = require("../Models/Carts");
const TokenCheck = require("../Checker/TokenCheck");

router.post("/", TokenCheck, (req, res, next) => {
  Carts({
    products: {
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
    },
  })
    .save()
    .then((res) => res.status(200).json({ carts: res }))
    .catch((error) => res.status(401).json({ error: "Wrong product" }));
});

module.exports = router;
