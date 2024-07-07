import React from 'react'
import handleSlotBook from '../helpers/handleSlotBook';
import validTimes from '../data/validTime';

const TimeSlots = ({ selectedDate, roomDetails, tsLoad, setTsLoad }) => {
    if (!selectedDate) return null;
    console.log(selectedDate)

    const timeSlots = roomDetails?.timeSlots.find(slot => slot.date === selectedDate)?.slots || [];
    console.log(timeSlots)
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

    return (
        <div className="time-slots">
            {slots}
        </div>
    );
};

export default TimeSlots;