const { Schema, model, mongoose } = require("mongoose");
const User = require("./User");

const postSchema = new Schema(
  {
    u_id: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    data: Schema.Types.Mixed
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

module.exports = { Post, postSchema };
