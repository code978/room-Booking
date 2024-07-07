import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search rooms by name or tag"
        style={{ width: '270px', padding: '8px', borderRadius: '2.5px', border: '1px solid #ccc' }}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
