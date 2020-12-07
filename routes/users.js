const express = require('express');

const router = express.Router();

// @desc Register a user
// @route POST api/users
// @access Public

router.post('/', (req, res) => {
  res.send('Register a user');
});

module.exports = router;
