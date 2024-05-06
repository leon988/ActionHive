import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link here
import { getInitiative } from '../../utilities/initiatives-api';

export default function DetailInitiativePage() {
  const { id } = useParams();
  const [initiative, setInitiative] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitiative = async () => {
      try {
        const initiativeData = await getInitiative(id);
        console.log(initiativeData[0])
        await setInitiative(initiativeData[0]) ;
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchInitiative();
  }, [id, loading]);
  console.log(initiative)

  return (
    <div>
      <h2>Initiative Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : initiative?.location?.street ? (
        <>
          <p>Name: {initiative.name}</p>
          <p>Description: {initiative.description}</p>
          <p>Date: {initiative.date}</p>
          <p>Category: {initiative.category}</p>
          <p>Duration: {initiative.duration}</p>
          <p>Requirements: {initiative.requirements}</p>
          <p>Location:</p>
          <ul>
        
            <li>Street: {initiative?.location?.street}</li>
            <li>City: {initiative?.location?.city}</li>
            <li>State: {initiative?.location?.state}</li>
            <li>Country: {initiative?.location?.country}</li>
            <li>Zip: {initiative?.location?.zip}</li>
          </ul>
          <p>Ready to make a difference? Sign up today to participate in this initiative and help us make a positive impact!</p>
          <button>Join!</button>
          {/* Add the Link and button for updating here */}
          <Link to={`/initiatives/${id}/edit`}>
            <button>Update</button>
          </Link>
        </>
      ) : (
        <p>No initiative found with ID: {id}</p>
      )}
    </div>
  );
}
