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
  experience: {
    type: Map,
    of: Number
  }
});

module.exports = model("user", userSchema);
