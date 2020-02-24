const { Thread, Post } = require("../database");

const createRequest = async data => {
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
  return resultThread;
};

const addToNoAssign = async function(threadId, userId) {
  const newThread = await Thread.findById(threadId);
  newThread.no_assign.addToSet(userId);
  const resultThread = await newThread.save();
  console.log(`No assign ${resultThread.no_assign}`);
  return resultThread;
};

module.exports = { createRequest, addToNoAssign };
