require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const seed = async () => {
  await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/clinicdb');
  const exists = await User.findOne({ email: 'doctor@example.com' });
  if (exists) {
    console.log('Seed already exists');
    process.exit(0);
  }
  const salt = await bcrypt.genSalt(10);
  const doctor = new User({
    name: 'Dr. Alice',
    email: 'doctor@example.com',
    passwordHash: await bcrypt.hash('doctor123', salt),
    role: 'doctor'
  });
  const recep = new User({
    name: 'Reception Bob',
    email: 'reception@example.com',
    passwordHash: await bcrypt.hash('reception123', salt),
    role: 'receptionist'
  });
  await doctor.save();
  await recep.save();
  console.log('Seed created: doctor@example.com / doctor123, reception@example.com / reception123');
  process.exit(0);
};

seed();
