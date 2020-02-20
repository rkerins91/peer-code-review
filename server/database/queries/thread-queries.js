const Thread = require("../models/Thread");
const User = require("../models/User");

module.exports = {
  getAllUserRequests: async userId => {
    console.log(typeof Thread);
    const results = await Thread.find({ creator: userId }, null, {
      sort: { updatedAt: -1 }
    });
    return results;
  },

  getOpenUserRequests: async userId => {
    const results = await Thread.find(
      { creator: userId, status: { $lt: 3 } },
      null,
      { sort: { updatedAt: -1 } }
    );
    return results;
  },

  getOpenUserReviews: async userId => {
    const results = await Thread.find(
      { reviewer: userId, status: { $lt: 3 } },
      null,
      { sort: { updatedAt: -1 } }
    );
    return results;
  },

  getAssignedThreads: async userId => {
    const results = await User.find()
      .populate({
        path: "assigned_threads",
        match: {
          _id: userId
        },
        options: { sort: { createdAt: -1 } }
      })
      .exec();
    return results;
  }
};
