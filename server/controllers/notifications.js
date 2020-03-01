const { User, Notification } = require("../database");

const createNotification = async data => {
  const { recipient, event, origin, thread } = data;
  const newNotification = await new Notification({
    recipient,
    event: Number(event),
    origin,
    thread
  });
  const notification = await newNotification.save();
  return notification;
};

const updateNotifications = async notifications => {
  notifications.forEach(async notification => {
    const current = await Notification.findById(notification._id);
    current.seen = true;
    current.save();
  });
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
    link: generateNotificationLink(notification)
  };
};

const generateNotificationLink = notification => {
  switch (notification.event) {
    case 1:
      return `dashboard/requests/${notification.thread}`;
    case 2:
      return `dashboard/assigned/${notification.thread}`;
    case 3:
      return `dashboard/requests/${notification.thread}`;
    default:
      return "";
  }
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

module.exports = {
  createNotification,
  getUsersNotifications,
  updateNotifications
};
