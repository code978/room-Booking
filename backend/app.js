const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const roomRoutes = require('./routes/roomRoutes');
require('dotenv').config();
const { connectDB } = require('./config/db');
const Room = require('./models/room');

connectDB()
const app = express();
const PORT = process.env.PORT || 5000;

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: ["http://localhost:5173"]
  }
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: `Room-booking-schema is running`
  })
})

app.use('/api/rooms', roomRoutes);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('bookRoom', async (data) => {
    try {
      // add validation on date and time
      const room = await Room.findById(data?.roomId);

      if (!room) {
        io.to(socket.id).emit('bookingFailed', { status: true, message: 'Room not found' });
        return;
      }

      const slot = await Room.findOne({
        _id: data?.roomId,
        'timeSlots.date': data?.selectedDate,
        'timeSlots.slots.time': data?.data
      });

      if (slot?.booked) {
        io.to(socket.id).emit('bookingFailed', { status: true, message: 'Time slot already booked' });
        return;
      }

      let timeSlot = room.timeSlots.find(ts => ts.date === data?.selectedDate);
      if (timeSlot) {
        let slotToBook = timeSlot.slots.find(s => s.time === data?.data);
        if (slotToBook) {
          if (slotToBook.booked) {
            io.to(socket.id).emit('bookingFailed', { status: true, message: 'Time slot already booked' });
          } else {
            slotToBook.booked = true;
          }
        } else {
          timeSlot.slots.push({ time: data?.data, booked: true });
        }
      } else {
        room.timeSlots.push({ date: data?.selectedDate, slots: [{ time: data?.data, booked: true }] });
      }

      await room.save();
      io.emit('updateRoom', room);
      io.to(socket.id).emit('bookingSuccess');

    } catch (error) {
      console.log(error);
      io.to(socket.id).emit('bookingFailed', { status: true, message: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Socket running on port ${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
