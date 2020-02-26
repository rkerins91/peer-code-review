const { Thread, Post, threadQueries } = require("../database");
const config = require("../config/config");

module.exports = {
  createRequest: async data => {
    const { title, content, language, user } = data;

    if (title && content && language && user) {
      const newPost = new Post({
        author: user._id,
        authorName: user.name,
        data: content
      });

      const newThread = new Thread({
        creator: user._id,
        title,
        status: 0,
        language: { name: language.name, experience: language.experience }
      });

      const post = await newPost.save();
      newThread.posts.push(post);
      newThread.noAssign.push(user._id);
      const resultThread = await newThread.save();
      return resultThread;
    } else throw new Error("Missing required request data");
  },

  createPost: async (threadId, postData) => {
    const { author, authorName, content } = postData;
    if (author && authorName && content) {
      const newPost = new Post({
        author: author,
        authorName: authorName,
        data: content
      });
      const post = await newPost.save();
      var thread = await Thread.findById(threadId);
      thread.posts.push(post);
      const resultThread = await thread.save();
      return resultThread;
    } else throw new Error("Missing required request data");
  },

  acceptRequest: async (threadId, userId) => {
    var thread = await Thread.findById(threadId);
    if (thread.status === 1 && thread.creator !== userId) {
      thread.reviewer = userId;
      thread.status = 2;
      const resultThread = await thread.save();
      return resultThread;
    }
    return null;
  },

  getRequestThreads: async (userId, status) => {
    var threads;
    switch (status) {
      case config.server.threadStatus[0]:
        threads = await threadQueries.getOpenUserRequests(userId);
        break;
      case "all":
        threads = await threadQueries.getAllUserRequests(userId);
        break;
      default:
        throw new Error("invalidStatusError");
    }
    return threads;
  },

  addToNoAssign: async (threadId, userId) => {
    const newThread = await Thread.findById(threadId);
    newThread.noAssign.addToSet(userId);
    const resultThread = await newThread.save();
    return resultThread;
  },

  updateStatus: async (threadId, newStatus) => {
    const status = config.server.threadStatus.indexOf(newStatus);
    const resultThread = await Thread.updateOne(
      { _id: threadId },
      { status: status }
    );
    return resultThread;
  }
};
