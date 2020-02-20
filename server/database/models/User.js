const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const Thread = require("./Thread");

const userSchema = new Schema({
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
    type: Schema.Types.Mixed,
    of: Number
  },
  assigned_threads: [{ type: Schema.Types.ObjectId, ref: Thread }],
  registeredDate: {
    type: Date,
    default: Date.now
  },
  credits: {
    type: Number,
    default: 3
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

userSchema.method("login", async function(user, callback) {
  const payload = {
    user
  };

  jwt.sign(
    payload,
    config.jwt.tokenExpirationPolicy,
    {
      expiresIn: Number(config.jwt.tokenExpirationPolicy)
    },
    (err, token) => {
      callback(err, token);
    }
  );
});

module.exports = model("user", userSchema);
