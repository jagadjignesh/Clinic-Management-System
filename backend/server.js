require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const { morganMiddleware } = require('./middleware/logger');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morganMiddleware);

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/clinicdb');

app.use('/api/auth', require('./routes/auth'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/tokens', require('./routes/tokens'));
app.use('/api/prescriptions', require('./routes/prescriptions'));
app.use('/api/bills', require('./routes/bills'));

app.get('/', (req, res) => res.send('Clinic Management API Running'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
