const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const { Thread } = require("../database");
const {
  createRequest,
  createPost,
  getRequestThreads
} = require("../controllers/thread");
const matchingQueue = require("../services/matchingQueue");
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
    try {
      const thread = await createRequest(req.body);
      matchingQueue.add({ thread: thread, pass: 1 }); //enqueue matching job

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

//push a new post onto a thread
router.post("/thread/:id/post", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw new Error("invalidThreadIdError");
    }
    await createPost(req.params.id, req.body);
    return res.status(201).json({
      success: true,
      threadId: thread._id
    });
  } catch (err) {
    console.log(err);
    if (err.message === "invalidThreadIdError") {
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
    if (err.message === "Missing required request data") {
      return res.status(404).json({
        errors: [
          {
            msg: err.message
          }
        ]
      });
    }
    res.sendStatus(500);
  }
});

//get a single thread by id
router.get("/thread/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw new Error("invalidThreadIdError");
    }
    const threadId = req.params.id;
    const thread = await Thread.findById(threadId);
    if (thread) {
      return res.status(200).json({
        success: true,
        thread: thread
      });
    } else {
      throw new Error("invalidThreadIdError");
    }
  } catch (err) {
    console.log(err);
    if (err.message === "invalidThreadIdError") {
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

//get a user's requests by id and status
router.get("/requests/:status/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw new Error("invalidUserIdError");
    }
    const threads = await getRequestThreads(req.params.id, req.params.status);
    return res.status(200).json({
      success: true,
      threads: threads
    });
  } catch (err) {
    console.log(err);
    if (err.message === "invalidUserIdError") {
      return res.status(404).json({
        errors: [
          {
            value: req.params.id,
            msg: "User not found",
            param: "id"
          }
        ]
      });
    } else if (err === "invalidStatusError") {
      return res.status(404).json({
        errors: [
          {
            value: req.params.status,
            msg: "Invalid status parameter",
            param: "status"
          }
        ]
      });
    }
    res.sendStatus(500);
  }
});

//Save an edited post
router.put("/thread/:threadId/post/:postId", async (req, res) => {
  const newData = req.body.content;
  try {
    const thread = await Thread.findOneAndUpdate(
      { _id: req.params.threadId, "posts._id": req.params.postId },
      {
        $set: {
          "posts.$.data": newData
        }
      }
    );
    if (thread) {
      return res.status(200).json({
        success: true
      });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
