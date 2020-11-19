let mongoose = require("mongoose");

const ROLE = {
  BASIC: "user",
  ADMIN: "admin",
};

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: ROLE.BASIC,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  item: [
    {
      type: String,
    },
  ],
});

module.exports = { User: mongoose.model("User", userSchema), ROLE: ROLE };
