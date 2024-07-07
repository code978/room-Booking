const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const roomRoutes = require('./routes/roomRoutes');
require('dotenv').config();
const { connectDB } = require('./config/db');


connectDB()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status:true,
    message:`Room-booking-schema is running`
  })
})

app.use('/api/rooms', roomRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
