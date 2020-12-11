const express = require('express');

const router = express.Router();

const protect = require('../middleware/auth');
const { getUser, loginUser } = require('../controllers/auth');

router.route('/').get(protect, getUser).post(loginUser);

module.exports = router;
