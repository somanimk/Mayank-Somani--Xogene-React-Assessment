import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DrugDetail = () => {
  const { drug_name } = useParams();
  const [drugDetails, setDrugDetails] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui?name=${drug_name}`);
        const rxcui = response.data.idGroup.rxnormId[0];
        const detailsResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/allProperties`);
        setDrugDetails(detailsResponse.data);
      } catch (error) {
        setError('Details not found');
      }
    };

    fetchDrugDetails();
  }, [drug_name]);

  return (
    <div>
      {error && <p>{error}</p>}
      <h1>{drugDetails.name}</h1>
      <p>RXCUI: {drugDetails.rxcui}</p>
      <p>Synonym: {drugDetails.synonym}</p>
    </div>
  );
};

export default DrugDetail;
