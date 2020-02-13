const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    type: Schema.Types.Mixed,
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

userSchema.method("login", async function(user, callback) {
  const payload = {
    user
  };

  jwt.sign(
    payload,
    process.env.SECRET,
    {
      expiresIn: Number(process.env.TOKEN_EXPIRATION)
    },
    (err, token) => {
      callback(err, token);
    }
  );
});

module.exports = model("user", userSchema);
