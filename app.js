const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(
  "mongodb+srv://QualityNode:devilkingdom@qualitynode-3uzpb.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const productsRouter = require("./Routers/Products");
const cartsRouter = require("./Routers/Carts");
const authRouter = require("./Routers/Auth");
const logRouter = require("./Routers/Login");
const userDataRouter = require("./Routers/userData");

app.use("/products", productsRouter);
app.use("/carts", cartsRouter);
app.use("/sign", authRouter);
app.use("/login", logRouter);
app.use("/user-data", userDataRouter);

module.exports = app;
