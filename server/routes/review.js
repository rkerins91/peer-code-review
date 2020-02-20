const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const { Post, Thread } = require("../database");
const mongoose = require("mongoose");
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
      data: content
    });

    const newThread = new Thread({
      creator: user._id,
      title,
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
      console.log(err);
      return res.status(500);
    }
  }
);

router.get("/thread/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw "invalidThreadIdError";
    }
    const threadId = req.params.id;
    const thread = await Thread.findById(threadId);
    if (thread) {
      return res.status(200).json({
        success: true,
        thread: thread
      });
    } else {
      throw "invalidThreadIdError";
    }
  } catch (err) {
    console.log(err);
    if (err === "invalidThreadIdError") {
      return res.status(404).json({
        errors: [
          {
            value: req.params.id,
            msg: "Requested thread not found",
            param: "id"
          }
        ]
      });
    }
    res.sendStatus(500);
  }
});

module.exports = router;