const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const Transaction = model('Transaction', new Schema({
  transactionHash: {
    type: String,
    index: true,
  },
  blockNumber: {
    type: String,
    required: true,
  },
  blockHash: {
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
  amount: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  collection: 'transactions',
}));

module.exports = Transaction;
