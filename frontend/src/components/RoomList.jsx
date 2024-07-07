import React from 'react';
import Room from './Room';

const RoomList = ({ rooms, handleBook }) => {
  return (
    <div className="room-list">
      {rooms.map((room) => (
        <Room key={room._id} room={room} handleBook={handleBook} />
      ))}
    </div>
  );
};

export default RoomList;
