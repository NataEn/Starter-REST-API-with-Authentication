require("dotenv").config();
const express = require("express");
const dataRoutes = require("./routes/data.route");
const authRoutes = require("./routes/auth.route");
const authMiddleware = require("./middleware/auth.middleware");

const mongoose = require("mongoose");

const app = express();

//config
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

//connecting to database
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((error) => {
    console.log("Database could not connected: " + error);
  });

//app routing
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/api/dashboard", authMiddleware.verify_token, (req, res, next) => {
  res.status(200).json(req.user);
});
app.use("/api/data", dataRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`app listening at http://localhost:${process.env.PORT}`);
});
