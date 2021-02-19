require("dotenv").config();
const express = require("express");
const router = express.Router();
const Data = require("../models/data.model");

//create a specific item
router.post("/set", (req, res) => {
  const newItem = Data({
    name: req.body.name,
    value: req.body.value,
  });
  newItem
    .save()
    .then((item) => {
      console.log("created new item", item);
      res.status(200).json({
        message: `created new item ${JSON.stringify({
          name: item.name,
          value: item.value,
        })}`,
      });
    })
    .catch((err) => res.status(500).json(err));
});

//get all items
router.get("/items", (req, res) => {
  console.log("getting all items");
  Data.find({})
    .then((items) => {
      if (!items) {
        res.status(404).json("could not fined items");
      } else {
        res.status(200).json({ items: items });
      }
    })
    .catch((err) => res.status(500).json(err));
});
//get specific item
router.get("/items/:name", (req, res) => {
  Data.findOne({ name: req.params.name })
    .then((item) => {
      if (!item) {
        res
          .status(404)
          .json({ error: `procedure ${req.params.name} not found` });
      } else {
        res.status(200).json({ item: item });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//update data of item
router.put("/items/update/:name", (req, res) => {
  const update = {};
  const { name, value } = req.query;
  if (name) update.name = name;
  if (value) update.value = value;

  Data.findOneAndUpdate({ name: req.params.name }, update)
    .then((oldItem) => {
      if (!oldItem) {
        res.status(404).json(err);
      } else {
        res.status(200).json({
          message: `procedure ${oldItem.name} was successfully updated`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//delete specific item
router.delete("/items/delete/:name", (req, res) => {
  Data.findOneAndRemove({ name: req.params.name })
    .then((item) => {
      if (!item) {
        res.status(404).json(err);
      } else {
        res.status(200).json({
          message: `procedure ${item.name} was successfully deleted`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
