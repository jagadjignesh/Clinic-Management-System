const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  items: [{
    desc: String,
    qty: { type: Number, default: 1 },
    price: { type: Number, default: 0 }
  }],
  total: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Bill', BillSchema);
