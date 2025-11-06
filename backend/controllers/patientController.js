const Patient = require('../models/Patient');
const Token = require('../models/Token');

exports.createPatient = async (req, res) => {
  try {
    const data = req.body;
    const patient = new Patient(data);
    await patient.save();

    // Generate token number: highest tokenNumber + 1 for today
    const today = new Date(); today.setHours(0,0,0,0);
    const latestToken = await Token.findOne({ createdAt: { $gte: today } }).sort({ tokenNumber: -1 });
    const nextTokenNo = latestToken ? latestToken.tokenNumber + 1 : 1;
    const token = new Token({ tokenNumber: nextTokenNo, patient: patient._id });
    await token.save();

    res.json({ patient, token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate('history.prescriptionId')
      .populate('history.billId');
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
