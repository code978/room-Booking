// src/services/apiService.js

import axios from 'axios';

const API_URL = `http://localhost:9878/api/rooms`;


// Get token from backend
const getToken = async () => {
  const response = await axios.post(`${API_URL}/auth`);
  const token = response.data.token;
  localStorage.setItem('token', token);
};

// Call getToken before calling getRooms
const getRooms = async () => {
  if (!localStorage.getItem('token')) await getToken();
  const response = await axios.get(`${API_URL}/rooms`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  console.log(response.data)
  return response?.data?.rooms;
};

const bookRoom = async (roomId, date, time) => {
  
  console.log(roomId,date,time)

  if (!localStorage.getItem('token')) await getToken();
  let resposne = await axios.post(`${API_URL}/room/book`, { roomId, date, time }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return resposne?.data
};

const getRoomDetails = async (roomId) => {
  if (!localStorage.getItem('token')) await getToken();
  const response = await axios.get(`${API_URL}/room/${roomId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response?.data?.room;
}


const getSlots = async ()=>{

  if (!localStorage.getItem('token')) await getToken();
  const response = await axios.get(`${API_URL}/slots`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response?.data?.timeslots
}

export default {
  getRooms,
  bookRoom,
  getRoomDetails,
  getSlots
};




