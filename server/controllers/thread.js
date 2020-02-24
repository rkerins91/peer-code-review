const { Thread, Post } = require("../database");
const matchingQueue = require("../services/matchingQueue");

module.exports = {
  createRequest: async data => {
    const { title, content, language, user } = data;
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
    newThread.no_assign.push(user._id);
    const resultThread = await newThread.save();
    matchingQueue.add({ thread: resultThread, pass: 1 }); //enqueue matching job
    return resultThread;
  }
};
