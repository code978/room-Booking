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

  const handleBook = async (roomId, date, time) => {
    try {
      await apiService.bookRoom(roomId, date, time);
      fetchRooms(); // Refresh room list after booking
    } catch (error) {
      console.error("Failed to book room:", error);
    }
  };

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (<>
    <ToastContainer />
    <div className="App">

      <SearchBar onSearch={handleSearch} />      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <RoomList rooms={filteredRooms} handleBook={handleBook} />
      )}

    </div>
  </>
  );
};

export default App;
