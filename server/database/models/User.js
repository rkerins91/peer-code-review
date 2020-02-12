const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

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
  experience: {
    type: Map,
    of: Number
  },
  registeredDate: {
    type: Date,
    default: Date.now
  }
});

// run before every model.save() call
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = model("user", userSchema);
