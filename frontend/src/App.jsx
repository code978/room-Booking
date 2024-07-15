import React, { useState, useEffect } from 'react';
import RoomList from './components/RoomList';
import SearchBar from './components/SearchBar';
import apiService from './services/apiService';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, [searchTerm]);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const fetchedRooms = await apiService.getRooms();
      setRooms(fetchedRooms);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    }
    setLoading(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredRooms = rooms.filter(room => {
    if (searchTerm.includes('-')) {
            // This logic checks if a room is available at the specified time range, on the current date.
      // It splits the search term by '-' and takes the first part as the start time and the second part as the end time.
      // It then checks if there is no time slot on the current date that is booked in the specified time range.
      const [startTime, endTime] = searchTerm.split('-');
      if(endTime<startTime){
        // toast.error("End time should be greater than start time");
        // alert('endtime is should be greater than start time');
        return false;
      }
      return !room.timeSlots.some(ts =>
        ts.date === new Date().toISOString().slice(0, 10) &&
        ts.slots.some(slot => slot.time >= startTime && slot.time <= endTime && !slot.booked)
      );
    }
    return room.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (<>
    <ToastContainer />
    <div className="App">

      <SearchBar onSearch={handleSearch} />      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <RoomList rooms={filteredRooms} />
      )}

    </div>
  </>
  );
};

export default App;
