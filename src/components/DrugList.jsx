import React, { useState } from 'react';
import axios from 'axios';

const DrugList = () => {
  const [drugs, setDrugs] = useState([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const fetchDrugs = async (searchTerm) => {
    try {
      const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs?name=${searchTerm}`);
      setDrugs(response.data.drugGroup.conceptGroup);
    } catch (error) {
      setError('No results found');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDrugs(query);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a drug"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      <ul>
        {drugs.map((drug) => (
          <li key={drug.rxcui}>{drug.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DrugList;
