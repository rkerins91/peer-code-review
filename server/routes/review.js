const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const { Post, Thread } = require("../database");
const config = require("../config/config");

router.post(
  "/create-request",
  [
    check("title", "Please add a title to your request")
      .not()
      .isEmpty(),
    check("content", "Please add some content to your request")
      .not()
      .isEmpty(),
    check("language", "Please select a language for your request")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, language, user } = req.body;

    const newPost = new Post({
      author: user._id,
      title,
      data: content
    });

    const newThread = new Thread({
      creator: user._id,
      status: 0,
      language: { name: language, experience: user.experience[language] }
    });

    try {
      const post = await newPost.save();
      newThread.posts.push(post);
      newThread.no_assign.push(user._id);
      const thread = await newThread.save();
      //Success, add this thread to the matching queue
      return res.status(201).json({
        success: true,
        threadId: thread._id
      });
    } catch (err) {
      return res.status(500);
    }
  }
);

module.exports = router;
