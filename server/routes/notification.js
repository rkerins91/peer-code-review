const express = require("express");
const router = express.Router();
const { Notification, notificationSchema } = require("../database");

router.get("/:id/test", async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findOne({ _id: id });
    res.status(200).send(notification);
  } catch (error) {
    res.status(500).send("No good");
  }
});

router.post("/test", async (req, res) => {
  try {
    const { recipient, event, origin } = req.body;

    const newNotification = await new Notification({
      recipient,
      event: Number(event),
      origin
    });
    const notification = await newNotification.save();
    res.status(200).send(notification);
  } catch (error) {
    res.status(500).send("No good");
  }
});

module.exports = router;
