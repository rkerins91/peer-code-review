const { Schema, model } = require('mongoose')

var userSchema = new Schema({
  name: String,
  email: String
});

module.exports = User = model('user', userSchema)
