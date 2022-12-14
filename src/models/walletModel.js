const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const Wallet = model('Wallet', new Schema({
  _id: String,
  address: {
    type: String,
    required: true,
  },
  privateKey: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  collection: 'wallets',
}));

module.exports = Wallet;
