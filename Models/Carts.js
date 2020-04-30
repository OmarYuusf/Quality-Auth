const mongoose = require("mongoose");

const cartsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  products: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      price: Number,
    },
  ],
});

module.exports = mongoose.model("Carts", cartsSchema);
