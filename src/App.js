import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/searchbar';
import DrugList from './components/DrugList';
import DrugDetail from './components/DrugDetail';

const App = () => {
  return (
    <Router>
      <div>
        <SearchBar />
        <Routes>
          <Route path="/drugs/search" element={<DrugList />} />
          <Route path="/drugs/:drug_name" element={<DrugDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
