const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPatient, getPatients, getPatientById } = require('../controllers/patientController');

router.post('/', auth, createPatient); // reception / doctor can create
router.get('/', auth, getPatients);
router.get('/:id', auth, getPatientById);

module.exports = router;
