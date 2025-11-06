const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: { type: String, enum: ['male','female','other'], default: 'other' },
  phone: String,
  address: String,
  notes: String,
  createdAt: { type: Date, default: Date.now },
  history: [{
    visitDate: Date,
    complaint: String,
    prescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' },
    billId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill' }
  }]
});

module.exports = mongoose.model('Patient', PatientSchema);
