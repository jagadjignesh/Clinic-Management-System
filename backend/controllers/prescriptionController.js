const Prescription = require('../models/Prescription');
const Patient = require('../models/Patient');

exports.createPrescription = async (req, res) => {
  try {
    const { patientId, medicines, notes } = req.body;
    const prescription = new Prescription({
      patient: patientId,
      doctor: req.user._id,
      medicines,
      notes
    });
    await prescription.save();

    // append to patient history
    const patient = await Patient.findById(patientId);
    patient.history.push({
      visitDate: new Date(),
      complaint: notes || 'Prescription added',
      prescriptionId: prescription._id
    });
    await patient.save();

    res.json(prescription);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getPrescriptionsForPatient = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patient: req.params.patientId }).populate('doctor', 'name email');
    res.json(prescriptions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
