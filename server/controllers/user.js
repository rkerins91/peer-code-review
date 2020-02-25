const { User } = require("../database");
const config = require("../controllers/config");

module.exports = {
  setExperience: async (userId, experience) => {
    const user = await User.findById(userId);
    if (
      Object.keys(experience).every(ele =>
        config.server.availableLanguages.includes(ele)
      )
    ) {
      // Set values of languages obj to numbers
      for (let language in experience) {
        if (experience.hasOwnProperty(language)) {
          experience[language] = Number(experience[language]);
        }
      }
    }
    // Set user experience to new languages obj and save
    user.experience = experience;
    user.markModified("experience");
    user.save();
  },

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
