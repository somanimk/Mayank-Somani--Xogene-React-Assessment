import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DrugDetail = () => {
  const { drugName } = useParams();
  const [drugDetails, setDrugDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        const detailResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs?name=${drugName}`);
        const details = detailResponse.data.drugGroup.conceptGroup
          .flatMap(group => group.conceptProperties)
          .find(drug => drug.name.toLowerCase() === drugName.toLowerCase());
        
        if (details) {
          setDrugDetails(details);
          const ndcResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${details.rxcui}/ndcs`);
          details.ndcs = ndcResponse.data.ndcGroup.ndcList.ndc;
          setDrugDetails(details);
        } else {
          setError('Drug not found');
        }
      } catch (error) {
        console.error('Error fetching drug details:', error);
        setError('Failed to fetch drug data');
      }
    };

    fetchDrugDetails();
  }, [drugName]);

  if (error) return <div className="error">{error}</div>;
  if (!drugDetails) return <div>Loading...</div>;

  return (
    <div className="drug-detail-container">
      <h1>{drugDetails.name}</h1>
      <p>RxCUI: {drugDetails.rxcui}</p>
      <p>Synonym: {drugDetails.synonym}</p>
      <div>
        <h3>NDCs</h3>
        <ul>
          {drugDetails.ndcs && drugDetails.ndcs.map(ndc => <li key={ndc}>{ndc}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default DrugDetail;
