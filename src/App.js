import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DrugSearch from './components/Search';
import DrugDetail from './components/DrugDetail';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<DrugSearch />} />
          <Route path="/drugs/:drug_name" element={<DrugDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
