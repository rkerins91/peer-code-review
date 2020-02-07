const mongoose = require('mongoose');
const userSchema = require('./models/User')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true });
    // mongoose.
    console.log('mongo connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;

