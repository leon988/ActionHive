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
    <div className="bg-neutral min-h-screen text-dark p-8">
      <h2 className="text-3xl font-bold text-primary mb-6">Initiative Details</h2>
      {loading ? (
        <p className="text-lg text-gray-500">Loading...</p>
      ) : initiative?.location?.street ? (
        <>
          <p className="text-lg mb-1">Name: {initiative.name}</p>
          <p className="text-lg mb-1">Description: {initiative.description}</p>
          <p className="text-lg mb-1">Date: {initiative.date}</p>
          <p className="text-lg mb-1">Category: {initiative.category}</p>
          <p className="text-lg mb-1">Duration: {initiative.duration}</p>
          <p className="text-lg mb-1">Requirements: {initiative.requirements}</p>
          <p className="text-lg mb-1 font-semibold">Location:</p>
          <ul className="list-disc list-inside mb-4">
            <li className="text-lg">Street: {initiative?.location?.street}</li>
            <li className="text-lg">City: {initiative?.location?.city}</li>
            <li className="text-lg">State: {initiative?.location?.state}</li>
            <li className="text-lg">Country: {initiative?.location?.country}</li>
            <li className="text-lg">Zip: {initiative?.location?.zip}</li>
          </ul>
          <p className="text-lg mb-4 font-semibold">Ready to make a difference? Sign up today to participate in this initiative and help us make a positive impact!</p>
          <button className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition duration-300 mb-2 mr-4">Join!</button>
          <Link to={`/initiatives/${id}/edit`}>
            <button className="bg-accent text-white py-2 px-4 rounded hover:bg-primary transition duration-300">Update</button>
          </Link>

        </>
      ) : (
        <p className="text-lg text-red-500">No initiative found with ID: {id}</p>
      )}
    </div>
  );
}
