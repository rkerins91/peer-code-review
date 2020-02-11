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

// run before every schema.save() call
userSchema.pre("save", (this) => {
  return bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) throw err;
      this.password = hash;
    });
  });
});
d;

module.exports = model("user", userSchema);
