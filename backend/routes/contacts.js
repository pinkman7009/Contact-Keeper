const express = require('express');

const router = express.Router();

const protect = require('../middleware/auth');

const {
  getContacts,
  updateContact,
  deleteContact,
  createContact,
} = require('../controllers/contacts');

router.route('/').get(protect, getContacts).post(protect, createContact);

router.route('/:id').put(protect, updateContact).delete(protect, deleteContact);

module.exports = router;
