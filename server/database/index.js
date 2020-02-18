const mongoose = require("mongoose");
const User = require("./models/User");
const config = require("../config/config");

const connectDB = async () => {
  try {
    await mongoose.connect(String(config.db.connectionString), {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("mongo connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connectDB, User };
