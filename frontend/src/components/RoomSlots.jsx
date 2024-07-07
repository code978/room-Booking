import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import './RoomSlots.css'; // Add this line to include CSS for styling
import { toast } from 'react-toastify';
import Calendar from './renderCalender';
import TimeSlots from './renderTimeSlots';

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
            <p> Room Tag: {roomDetails?.tag||"Sorry, there is no room tag"}</p>
            <Calendar
                roomDetails={roomDetails}
                currentSelectedDay={currentSelectedDay}
                setSelectedDate={setSelectedDate}
                setCurrentSelectedDay={setCurrentSelectedDay}
            />
            <TimeSlots
                selectedDate={selectedDate}
                roomDetails={roomDetails}
                tsLoad={tsLoad}
                setTsLoad={setTsLoad}
            />
            <a href={`/`}>Go to Room Slots</a>
        </div>
    );
};

export default RoomSlots;
