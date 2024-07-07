import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import './RoomSlots.css'; // Add this line to include CSS for styling
import { toast } from 'react-toastify';


const RoomSlots = () => {
    const { id } = useParams();

    console.log(id)

    const [roomDetails, setRoomDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentSelectedDay, setCurrentSelectedDay] = useState(null);
    const [tsLoad, setTsLoad] = useState(false);

    useEffect(() => {
        fetchRoomDetails();
    }, [id]);

    const fetchRoomDetails = async () => {
        try {
            const details = await apiService.getRoomDetails(id);
            setRoomDetails(details);
        } catch (error) {
            console.error("Failed to fetch room details:", error);
        }
        setLoading(false);
    };

    const renderCalendar = () => {
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

    const handleSlotBook = async (e, slot) => {
        if (slot) {
            alert('already booked');
            return;
        }

        const userConfirmation = window.confirm("Do you want to book this time slot?");
        if (!userConfirmation) {
            return alert('Booking cancelled by user.');
        }
        console.log(e.target.innerText, slot);

        const data = e.target.innerText
        if (!data) return alert('something went wrong with time slot.')

        try {
            setTsLoad(true);

            let repsonse = await apiService.bookRoom(id, selectedDate, data)

            if (repsonse?.status) {
                alert(repsonse?.message || 'time slot booked sucessfully!')

                setTimeout(()=>{
                    window.location.reload();
                },[2000])

            }

        } catch (error) {
            console.log(error)
        } finally {
            setTsLoad(false);
        }
    }

    const renderTimeSlots = () => {
        if (!selectedDate) return null;
        console.log(selectedDate)

        const timeSlots = roomDetails?.timeSlots.find(slot => slot.date === selectedDate)?.slots || [];
        console.log(timeSlots)
        const slots = [];
        const validTimes = [
            '09:00-09:30', '09:30-10:00', '10:00-10:30', '10:30-11:00', '11:00-11:30', '11:30-12:00', '12:00-12:30', '12:30-13:00',
            '13:00-13:30', '13:30-14:00', '14:00-14:30', '14:30-15:00', '15:00-15:30', '15:30-16:00', '16:00-16:30', '16:30-17:00',
            '17:00-17:30', '17:30-18:00'
        ];

        validTimes.forEach(timeString => {
            const slot = timeSlots.find(s => s.time === timeString);
            slots.push(
                <div key={timeString} className={`time-slot ${slot?.booked ? 'booked' : 'available'}`} onClick={(e) => { handleSlotBook(e, slot) }} value={timeString}>
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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!roomDetails) {
        return <p>Room details not found</p>;
    }

    return (
        <div className="room-list">
            <p>Room ID: {id}</p>
            <p>Room Name: {roomDetails?.name}</p>
            {renderCalendar()}
            {tsLoad ? <div>laoding... </div>:renderTimeSlots()}
            <a href={`/`}>Go to Room Slots</a>
        </div>
    );
};

export default RoomSlots;
