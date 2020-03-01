const { User, Notification } = require("../database");

const createNotification = async reqBody => {
  const { recipient, event, origin, thread } = reqBody;
  const newNotification = await new Notification({
    recipient,
    event: Number(event),
    origin,
    thread
  });
  const notification = await newNotification.save();
  return notification;
};

const getUsersNotifications = async recipient => {
  const notifications = await Notification.find({ recipient });

  const notificationData = notifications.map(notification => {
    return generateNotificationData(notification);
  });
  return notificationData;
};

const generateNotificationData = notification => {
  return {
    ...notification._doc,
    message: generateNotificationMessage(notification),
    // May want to use a function to generate link in future, if there are notifications
    // that will not be linking to a specific review
    link: `/reviews/${notification.thread}`
  };
};

const generateNotificationMessage = notification => {
  switch (notification.event) {
    case 1:
      return `Your code has been reviewed by ${notification.origin}`;
    case 2:
      return `You have been assigned code to review for ${notification.origin}`;
    case 3:
      return `A thread you are in has a new post`;
    default:
      return null;
  }
};

module.exports = { createNotification, getUsersNotifications };
