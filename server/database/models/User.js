const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const Thread = require("./Thread");

const userSchema = new Schema(
  {
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
    assigned_count: { type: Number, default: 0 },
    credits: {
      type: Number,
      default: 3
    }
  },
  { timestamps: true }
);

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

// run after model.save
userSchema.post("save", async function() {
  try {
    const count = this.assigned_threads.length;
    await this.updateOne({ assigned_count: count });
    return;
  } catch (err) {
    console.error(err);
    return;
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
