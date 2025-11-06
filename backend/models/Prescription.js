const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  medicines: [{
    name: String,
    dosage: String,
    duration: String,
    notes: String
  }],
  notes: String
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
