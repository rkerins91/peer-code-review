const { Schema, model } = require("mongoose");
const { postSchema } = require("./Post");

const threadSchema = new Schema(
  {
    creator_id: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      default: 0,
      required: true
    },
    reviewer_id: String,
    language: {
      name: String,
      experience: Number
    },
    posts: [postSchema]
  },
  { timestamps: true }
);

module.exports = model("Thread", threadSchema);
