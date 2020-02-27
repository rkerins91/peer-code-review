const { Schema, model } = require("mongoose");
const config = require("../../config/config");

const notificationSchema = new Schema({
  event: {
    type: Number
  },
  origin: {
    type: String
  },
  seen: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: config.constants.noticationExpiry }
  }
});

const Notification = model("Notification", notificationSchema);

module.exports = { Notification, notificationSchema };
