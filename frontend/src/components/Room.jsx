import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import './Room.css'; // Add this line if you want to style the component separately
import { useNavigate } from 'react-router-dom';

const Room = ({ room }) => {

  const navigate = useNavigate();

  return (
    <div className="room">
      <h2
        onClick={() => navigate(`/roomslots/${room._id}`)}
        style={{ cursor: 'pointer' }}
      >
        {room.name}
      </h2>

      <div className="calendar-container">
      </div>
    </div>
  );
};

export default Room;

