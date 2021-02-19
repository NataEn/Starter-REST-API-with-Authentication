const mongoose = require("mongoose");

const model = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "a name is required!"],
    },
    value: { type: Number, default: 0 },
  },
  { timestamp: true }
);
module.exports = new mongoose.model("Data", model);
