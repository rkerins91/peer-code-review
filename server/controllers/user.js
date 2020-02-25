const { User } = require("../database");

module.exports = {
  assignThread: async (userId, threadId) => {
    const user = await User.findById(userId);
    user.assigned_threads.addToSet(threadId);
    const updatedUser = await user.save();
    return updatedUser;
  },

  unassignThread: async (userId, threadId) => {
    const user = await User.findById(userId);
    user.assigned_threads.pull(threadId);
    const updatedUser = await user.save();
    return updatedUser;
  }
};
