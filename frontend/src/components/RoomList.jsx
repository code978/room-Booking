import React from 'react';
import Room from './Room';

const RoomList = ({ rooms}) => {
  return (
    <div className="room-list">
      {rooms.map((room) => (
        <Room key={room._id} room={room} />
      ))}
    </div>
  );
};

export default RoomList;
