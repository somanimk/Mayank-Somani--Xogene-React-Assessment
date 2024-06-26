import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs?name=${query}`);
      // Check if the response includes any drug information
      const groups = response.data.drugGroup.conceptGroup || [];
      const drugs = groups.flatMap(group => group.conceptProperties || []);
      if (drugs.length > 0) {
        // Navigate to the details page of the first result
        navigate(`/drugs/${drugs[0].name}`);
      } else {
        alert('No drugs found');
      }
    } catch (error) {
      console.error('Error fetching drugs:', error);
      alert('Failed to fetch drug data');
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a drug"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
