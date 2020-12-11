const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    phone: {
      type: String,
    },
    type: {
      type: String,
      default: 'personal',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', ContactSchema);
