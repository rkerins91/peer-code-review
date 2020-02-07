const express = require("express");
const router = express.Router();

const User = require('../database/models/User')

router.post('/register', async (req, res) => {
  const { name, email } = req.body
  try {
    const user = new User({name, email})
    await user.save()
    res.send(user)
  } catch (err) {
    console.err(err.message)
  }

});

module.exports = router
