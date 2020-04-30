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

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://quality-auth.herokuapp.com"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

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
