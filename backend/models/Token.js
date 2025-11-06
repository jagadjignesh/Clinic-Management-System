const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  tokenNumber: { type: Number, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['waiting','served','cancelled'], default: 'waiting' }
});

module.exports = mongoose.model('Token', TokenSchema);
