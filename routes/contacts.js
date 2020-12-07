const express = require('express');

const router = express.Router();

// @desc Get all users contacts
// @route GET api/contacts
// @access Private
router.get('/', (req, res) => {
  res.send('Get all contacts');
});

// @desc Add new contacts
// @route POST api/contacts
// @access Private
router.post('/', (req, res) => {
  res.send('Add contact');
});

// @desc Update contact
// @route PUT api/contacts
// @access Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @desc Delete contact
// @route DELETE api/contacts
// @access Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
