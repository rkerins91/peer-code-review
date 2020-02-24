const { User } = require("../database");

module.exports = {
  assignThread: async (userId, threadId) => {
    const user = await User.findById(userId);
    user.assigned_threads.push(threadId);
    const updatedUser = await user.save();
    return updatedUser;
  }
};
