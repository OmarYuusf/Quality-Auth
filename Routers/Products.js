const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Products = require("../Models/Products");

router.post("/", (req, res, next) => {
  Products({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  })
    .save()
    .then(() => res.status(200).json({ message: "Product Is Created" }))
    .catch((err) => res.status(400).json({ error: err }));
});

router.get("/", (req, res, next) => {
  Products.find()
    .exec()
    .then((docs) =>
      res.status(200).json({ type: "Product Created", products: docs })
    )
    .catch((err) => res.status(400).json({ err }));
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Products.findById(id)
    .exec()
    .then((doc) => res.status(200).json({ Product: doc }))
    .catch((err) => res.status(400).json({ error: err }));
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Products.remove({ _id: id })
    .exec()
    .then(() => res.status(200).json({ type: "DELETED" }))
    .catch((err) => res.status(400).json({ error: err }));
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Products.updateOne(
    { _id: id },
    { $set: { name: req.body.name, price: req.body.price } }
  )
    .exec()
    .then(() => res.status(200).json({ new_product: "UPDATED" }))
    .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;
