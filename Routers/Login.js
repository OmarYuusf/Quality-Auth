const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Auth = require("../Models/Auth");
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
  Auth.find({ email: req.body.email })
    .exec()
    .then((result) => {
      if (result.length == 0) {
        res.status(402).json({ Account: "Wrong Account " });
      } else {
        bcrypt.compare(req.body.password, result[0].password, (err, data) => {
          if (err) {
            res.status(401).json({ Account: "Wrong Password " });
          }
          if (data) {
            const token = jwt.sign(
              {
                email: result[0].email,
                _id: result[0]._id,
              },
              "ilovereact",
              {
                expiresIn: "1h",
              }
            )
            return res.status(200).json({ status: "Logged In", token: token });
          }
        });
      }
    })
    .catch((err) => res.status(401).json({ Account: err }));
});

module.exports = router;
