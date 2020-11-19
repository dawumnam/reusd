let mongoose = require("mongoose");
const timeZone = require("mongoose-timezone");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
});

// Export the Article model
itemSchema.plugin(timeZone, { paths: ["createdAt"] });
module.exports = mongoose.model("Item", itemSchema);
