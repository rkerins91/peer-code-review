const { Schema, model } = require("mongoose");

var userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  registeredDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = model("user", userSchema);
