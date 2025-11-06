const Token = require('../models/Token');
const Patient = require('../models/Patient');

exports.getTokens = async (req, res) => {
  try {
    const tokens = await Token.find().populate('patient').sort({ createdAt: 1 });
    res.json(tokens);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.updateTokenStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const token = await Token.findByIdAndUpdate(id, { status }, { new: true });
    res.json(token);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
