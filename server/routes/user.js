const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../database/models/User');

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please use a valid email address').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.length) {
      return res.status(400).json({errors: errors.array()});
    }
    const { name, email } = req.body;
    try {
      const user = new User({ name, email });
      await user.save();
      res.send(user)
    } catch (err) {
      console.err(err.message);
    }
  }
);

module.exports = router;

