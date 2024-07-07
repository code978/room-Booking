import React from 'react';

const Calendar = ({ roomDetails, currentSelectedDay, setSelectedDate, setCurrentSelectedDay }) => {
    const currentDate = new Date();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay();

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateString = `${String(day).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${year}`;
        const timeSlots = roomDetails?.timeSlots.find(slot => slot.date === dateString)?.slots || [];
        const isBooked = timeSlots.some(s => s.booked);
        calendarDays.push(
            <div key={day} className={`calendar-day ${isBooked ? 'booked' : 'available'} ${currentSelectedDay === day ? 'current-select' : ''}`} onClick={() => {
                setSelectedDate(dateString);
                setCurrentSelectedDay(day);
            }}>
                {day}<span style={{ fontSize: 'small', margin: '12px', color: 'black', fontStyle: 'italic' }}>{timeSlots?.length > 0 && timeSlots?.length}</span>
            </div>
        );
    }

    return (
        <div className="calendar">
            <div className="calendar-header">
                <h2>{monthName} {year}</h2>
            </div>
            <div className="calendar-weekdays">
            </div>
            <div className="calendar-days">
                {calendarDays}
            </div>
        </div>
    );
};

export default Calendar;
