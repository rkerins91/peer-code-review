const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const { User } = require("../database");

router.post(
  "/register",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please use a valid email address").isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.length) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email } = req.body;
    try {
      const user = new User({ name, email, experience: {} });
      await user.save();
      res.send(user);
    } catch (err) {
      console.err(err.message);
    }
  }
);

router.put("/:id/experience", async (req, res) => {
  // Get language data from body of request, userID from params
  const languages = req.body;
  const user = await User.findById(req.params.id);
  try {
    // loop through body of request, setting user experience for each key
    for (let language in languages) {
      await user.experience.set(language, Number(languages[language]));
    }
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
