const { Schema, model } = require("mongoose");

var postSchema = new Schema({
  u_id: {
    type: String,
    required: true
  },
  timestamps: {},
  tite: {
    type: String,
    required: true
  },
  data: Schema.Types.Mixed
});

const Post = model("Post", postSchema);

module.exports = { Post, postSchema };
