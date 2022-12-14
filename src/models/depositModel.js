const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const Deposit = model('Deposit', new Schema({
  senderId: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  amountInEthers: {
    type: String,
    required: true,
  },
  chainId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  collection: 'deposits',
}));

module.exports = Deposit;
