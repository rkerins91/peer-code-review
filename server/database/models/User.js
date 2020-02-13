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
    type: Schema.Types.Mixed,
    of: Number
  }
});

module.exports = model("user", userSchema);
