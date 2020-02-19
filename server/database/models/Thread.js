const { Schema, model } = require("mongoose");
const { postSchema } = require("./Post");

const threadSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: Number,
      default: 0,
      required: true
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    language: {
      name: String,
      experience: Number
    },
    posts: [postSchema],
    no_assign: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

/* postSchema.path("creator").ref(User);
postSchema.path("reviewer").ref(User);
postSchema.path("no_assign").ref(User); */

module.exports = model("Thread", threadSchema);
