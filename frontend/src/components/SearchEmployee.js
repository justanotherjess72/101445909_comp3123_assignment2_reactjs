import React, { useState } from 'react';
import axios from 'axios';

const SearchEmployee = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employees/search`, {
        params: { query }
      });
      onSearchResults(response.data);
    } catch (error) {
      console.error('Error searching employees:', error);
    }
  };

  return (
    <div>
      <h2>Search Employee</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by department or position"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchEmployee;
