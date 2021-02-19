require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const verify_token = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).json({ error: "token requested" });
  } else {
    jwt.verify(token.split(" ")[1], secret, (err, val) => {
      if (err) {
        res.status(500).json({ error: "failed to authenticate token" });
      } else {
        req.user = val.data;
      }
    });
  }
  next();
};
module.exports = {
  verify_token,
};
