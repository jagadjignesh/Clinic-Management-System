const Bill = require('../models/Bill');
const Patient = require('../models/Patient');

exports.createBill = async (req, res) => {
  try {
    const { patientId, items } = req.body;
    const total = items.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);
    const bill = new Bill({ patient: patientId, items, total, createdBy: req.user._id });
    await bill.save();

    // add to patient history
    const patient = await Patient.findById(patientId);
    patient.history.push({
      visitDate: new Date(),
      complaint: `Bill generated - INR ${total}`,
      billId: bill._id
    });
    await patient.save();

    res.json(bill);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getBillsForPatient = async (req, res) => {
  try {
    const bills = await Bill.find({ patient: req.params.patientId });
    res.json(bills);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
