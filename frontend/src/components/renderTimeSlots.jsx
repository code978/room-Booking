import React, { useEffect } from 'react'
import io from 'socket.io-client';
import handleSlotBook from '../helpers/handleSlotBook';
import validTimes from '../data/validTime';
// import  socketUrl  from './../../constants/urls';

const TimeSlots = ({ selectedDate, roomDetails, tsLoad, setTsLoad }) => {
    if (!selectedDate) return null;

    const timeSlots = roomDetails?.timeSlots.find(slot => slot.date === selectedDate)?.slots || [];
    const slots = [];

    validTimes.forEach(timeString => {
        const slot = timeSlots.find(s => s.time === timeString);
        slots.push(
            <div key={timeString} className={`time-slot ${slot?.booked ? 'booked' : 'available'}`}
                onClick={(e) => { handleSlotBook(e, slot, roomDetails._id, selectedDate, setTsLoad) }} value={timeString}
            >
                {timeString}
            </div>
        );
    });

    // useEffect(() => {
    //     const socket = io(socketUrl);
    //     socket.on('bookRoom', async (data) => {
    //       try {
    //         const room = await room.findOne({ _id: data.roomId });
    //         if (room) {
    //           const slot = room.timeSlots.find(ts => ts.date === data.date);
    //           if (slot) {
    //             slot.slots.forEach(slot => {
    //               if (slot.time === data.time) {
    //                 slot.booked = true;
    //               }
    //             });
    //           }
    //         }
    //       } catch (error) {
    //         console.log(error);
    //         socket.emit('bookingFailed');
    //       }
    //     });
    //     return () => {
    //         socket.disconnect();
    //     };
    // }, []);

    return (
        <div className="time-slots">
            {slots}
        </div>
    );
};

export default TimeSlots;

