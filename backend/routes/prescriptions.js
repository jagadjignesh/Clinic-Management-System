const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPrescription, getPrescriptionsForPatient } = require('../controllers/prescriptionController');

router.post('/', auth, createPrescription);
router.get('/:patientId', auth, getPrescriptionsForPatient);

module.exports = router;
