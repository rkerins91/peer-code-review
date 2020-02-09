const mongoose = require("mongoose");
const User = require("./models/User");

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI_DEV);
    await mongoose.connect(String(process.env.MONGO_URI_DEV), {
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
