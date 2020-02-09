const { Schema, model } = require("mongoose");

var userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = model("user", userSchema);
