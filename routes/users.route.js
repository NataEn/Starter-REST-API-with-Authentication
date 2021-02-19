require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  const salt = bcrypt.genSaltSync();
  bcrypt.hash(req.body.password, salt, (error, hash) => {
    if (error) res.status(500).json(error);
    else {
      const newUser = User({ email: req.body.email, password: hash });
      newUser
        .save()
        .then((user) => {
          console.log("created user", user);
          res.status(200).json({ token: generateToken(user) });
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    }
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ error: `user with email ${req.body.email} does not exist` });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, match) => {
          if (err) {
            res.status(500).json(err);
          } else if (match) {
            res.status(200).json({ token: generateToken(user) });
          } else {
            res.status(403).json({ error: "password does not match" });
          }
        });
      }
    })
    .catch((err) => res.status(500).json(err));
});
// router("/logout", (req, res) => {})--> implemented on the client side by removing the token from local-storage

function generateToken(user) {
  return jwt.sign({ data: user }, process.env.SECRET, { expiresIn: "1h" });
}

module.exports = router;
