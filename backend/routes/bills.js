const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createBill, getBillsForPatient } = require('../controllers/billController');

router.post('/', auth, createBill);
router.get('/:patientId', auth, getBillsForPatient);

module.exports = router;
