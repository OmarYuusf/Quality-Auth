const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Auth = require("../Models/Auth");
const jwt = require("jsonwebtoken");
const AuthCheck = require("../Checker/AuthCheck");

router.get("/", AuthCheck);

module.exports = router;
