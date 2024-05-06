import React, { useState, useEffect } from 'react';
import { getAllInitiatives } from '../../utilities/initiatives-api';

export default function InitiativesPage() {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const initiativesData = await getAllInitiatives();
        setInitiatives(initiativesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching initiatives:', error);
      }
    };

    fetchInitiatives();
  }, []);

  return (
    <div>
      <h2>Initiatives</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {initiatives.map(initiative => (
            <li key={initiative._id}>
              <h3>{initiative.name}</h3>
              <p>{initiative.description}</p>
              <p>Date: {initiative.date}</p>
              <p>Category: {initiative.category}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
