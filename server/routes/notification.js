const express = require("express");
const router = express.Router();
const { Notification, User } = require("../database");
const {
  createNotification,
  getUsersNotifications
} = require("../controllers/notifications");

router.get("/:id/test", async (req, res) => {
  try {
    const notificationData = await getUsersNotifications(req.params.id);
    // console.log(notifications);
    res.status(200).send(notificationData);
  } catch (error) {
    res.status(500).send("No good");
  }
});

router.post("/test", async (req, res) => {
  try {
    const notification = await createNotification(req.body);
    console.log(notification);
    res.status(200).send(notification);
  } catch (error) {
    res.status(500).send("No good");
  }
});

module.exports = router;
