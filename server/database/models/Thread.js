const { Schema, model } = require("mongoose");
const { postSchema } = require("./Post");
const { User } = require("./User");

const threadSchema = new Schema(
  {
    creator_id: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true
    },
    status: {
      type: Number,
      default: 0,
      required: true
    },
    reviewer_id: {
      type: Schema.Types.ObjectId,
      ref: User
    },
    language: {
      name: String,
      experience: Number
    },
    posts: [postSchema],
    no_assign: [{ type: Schema.Types.ObjectId, ref: User }]
  },
  { timestamps: true }
);

module.exports = model("Thread", threadSchema);
