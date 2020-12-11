const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contacts');
const ErrorResponse = require('../utils/errorResponse');

// @desc Get all users contacts
// @route GET api/contacts
// @access Private
exports.getContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find({ user: req.user.id })
    .populate({
      path: 'user',
      select: 'name email',
    })
    .sort({ date: -1 });

  res.status(200).json({
    success: true,
    contacts,
    count: contacts.length,
  });
});

// @desc Add new contacts
// @route POST api/contacts
// @access Private
exports.createContact = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const contact = await Contact.create(req.body);

  res.status(201).json({
    success: true,
    contact,
  });
});

// @desc Update Contact
// @route PUT api/contacts/:id
// @access Private
exports.updateContact = asyncHandler(async (req, res, next) => {
  let updatedContact = await Contact.findById(req.params.id);

  if (!updatedContact) {
    return next(
      new ErrorResponse(`No contact with id ${req.params.id} exists`, 404)
    );
  }

  if (req.user.id !== updatedContact.user.toString()) {
    return next(
      new ErrorResponse('User not authorized to update this contact', 403)
    );
  }

  updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    success: true,
    contact: updatedContact,
  });
});

// @desc Delete Contact
// @route DELETE api/contacts/:id
// @access Private

exports.deleteContact = asyncHandler(async (req, res, next) => {
  let deleteContact = await Contact.findById(req.params.id);

  if (!deleteContact) {
    return next(
      new ErrorResponse(`No contact with id ${req.params.id} exists`, 404)
    );
  }

  if (req.user.id !== deleteContact.user.toString()) {
    return next(
      new ErrorResponse('User not authorized to delete this contact', 403)
    );
  }

  await deleteContact.remove();

  res.status(200).json({
    success: true,
    message: 'Contact has been deleted',
  });
});
