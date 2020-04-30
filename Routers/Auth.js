const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Auth = require("../Models/Auth");

router.post("/", (req, res, next) => {
  Auth.find({ email: req.body.email })
    .exec()
    .then((result) => {
      if (result.length != 0) {
        res.status(401).json({ Email: "Emails exists" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(402).json({ err: err });
          }
          if (hash) {
            Auth({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            })
              .save()
              .then((result) => {
                res.status(200).json({
                  message: "Account Created !!!",
                  user: result,
                });
              })
              .catch((error) => {
                res.status(402).json({ message: error });
              });
          }
        });
      }
    })
    .catch((err) => res.status(400).json({ err }));
});

module.exports = router;
