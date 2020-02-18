const { Schema, model } = require("mongoose");
const postSchema = require("./Post");

var threadSchema = Schema({
  creator_id: {
    type: String,
    required: true
  },
  timestamps: {},
  status: {
    type: Number,
    default: 0,
    required: true
  },
  reviewer_id: String,
  language: {
    name: String,
    experience: Number,
    required: true
  },
  posts: [postSchema]
});

module.exports = model("Thread", threadSchema);
