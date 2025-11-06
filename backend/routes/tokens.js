const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTokens, updateTokenStatus } = require('../controllers/tokenController');

router.get('/', auth, getTokens);
router.patch('/:id', auth, updateTokenStatus);

module.exports = router;
