const Room = require('../models/room');
const jwt = require('jsonwebtoken');
const { checkValidTimes } = require('../utils/checkValidTimes');
const { searchQuery } = require('../query');

exports.setToken = (req, res, next) => {
  const token = jwt.sign({}, process.env.SECRET_KEY);
  res.cookie('token', token);
  res.locals.token = token;
  res.status(200).json({
    status: true,
    token
  })
}

// Search for rooms by name, date, and time slot
exports.searchRooms = async (req, res) => {

  const { name, date, time } = req.query;

  try {
    let query = {};

    query = searchQuery(name, date, time);

    const rooms = await Room.find(query);

    if (!rooms || rooms.length == 0) {
      return res.status(404).json({ status: true, message: 'No rooms found' });
    }

    if (time) {
      const filteredRooms = rooms.filter(room => {
        for (let i = 0; i < 30; i++) {
          const date = new Date(new Date().setDate(new Date().getDate() + i)).toISOString().split('T')[0];
          const slot = room.timeSlots.find(ts => {
            const slot = ts.slots.find(slot => slot.time === time && !slot.booked && ts.date === date);
            return slot === undefined;
          });
          if (slot === undefined) {
            return true;
          }
        }
        return false;
      });

      return res.status(200).json({ status: true, rooms: filteredRooms });
    }

    res.status(200).json({ status: true, rooms });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Book a room
exports.bookRoom = async (req, res) => {

  const { roomId, date, time } = req.body;

  try {

    let isValidTime = checkValidTimes(time);

    if (isValidTime?.status == false) {
      return res.status(500).json({ status: isValidTime.status, mesage: isValidTime?.message })
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ status: true, message: 'Room not found' });
    }

    const slot = await Room.findOne({
      _id: roomId,
      'timeSlots.date': date,
      'timeSlots.slots.time': time
    });

    if (slot?.booked) {
      return res.status(400).json({ status: true, message: 'Time slot already booked' });
    }

    let timeSlot = room.timeSlots.find(ts => ts.date === date);
    if (timeSlot) {
      let slotToBook = timeSlot.slots.find(s => s.time === time);
      if (slotToBook) {
        if (slotToBook.booked) {
          return res.status(400).json({ status: true, message: 'Time slot already booked' });
        } else {
          slotToBook.booked = true;
        }
      } else {
        timeSlot.slots.push({ time: time, booked: true });
      }
    } else {
      room.timeSlots.push({ date: date, slots: [{ time: time, booked: true }] });
    }

    await room.save();
    res.json({ status: true, message: 'Time slot booked successfully' });
  } catch (err) {
    res.status(500).json({ status: true, message: err.message });
  }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {

    const token = req.headers.authorization;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decodedToken;
    }

    const rooms = await Room.find();
    res.status(200).json({ status: true, rooms });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.addRoom = async (req, res) => {
  try {

    const { name, capacity } = req.body;

    // Create a new room instance
    const newRoom = new Room({
      name,
      capacity
    });

    // Save the room to the database
    await newRoom.save();

    res.status(201).json({ status: true, newRoom });
  } catch (error) {
    res.status(500).json({ message: 'Error adding room', error: error.message });
  }
};


exports.getRoomDetails = async (req, res) => {
  try {
    const roomId = req.params.id;

    // Find the room by ID
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ status: false, message: 'Room not found' });
    }

    res.status(200).json({ status: true, room });
  }
  catch (e) {
    res.status(500).json({ message: 'Error while fetching room', error: error.message });
  }
}


exports.getSlots = async (req,res,next) =>{

    try {
      const rooms = await Room.find({});
      const timeslots = rooms.map(room => room.timeSlots);
      res.status(200).json({ status: true, timeslots });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching timeslots', error: error.message });
    }

}
