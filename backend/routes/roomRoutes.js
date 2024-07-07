const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { protect } = require('../middleware/protect');


// set token 
router.post('/auth', roomController.setToken)

// add room
router.post('/add', protect, roomController.addRoom);

// Search rooms
router.get('/rooms', protect, roomController.searchRooms);

// Book a room
router.post('/room/book', protect, roomController.bookRoom);

// Get all rooms
router.get('/rooms/all', protect, roomController.getAllRooms);

router.get('/room/:id',roomController.getRoomDetails)


module.exports = router;
