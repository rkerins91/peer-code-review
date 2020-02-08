const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log(typeof process.env.MONGO_URI, process.env.MONGO_URI)
    await mongoose.connect(String(process.env.MONGO_URI_DEV), { useUnifiedTopology: true, useNewUrlParser: true });
    console.log('mongo connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;

