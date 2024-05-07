import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllInitiatives, deleteInitiative } from '../../utilities/initiatives-api';

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

  const handleDelete = async (id) => {
    try {
      await deleteInitiative(id);
      const updatedInitiatives = initiatives.filter(initiative => initiative._id !== id);
      setInitiatives(updatedInitiatives);
    } catch (error) {
      console.error('Error deleting initiative:', error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-primary mb-4">
        Initiatives
      </h2>
      {loading ? (
        <p className="text-lg text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-4">
          {initiatives.map(initiative => (
            <li key={initiative._id} className="bg-neutral p-4 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-dark mb-2">{initiative.name}</h3>
              <p className="text-gray-800">{initiative.description}</p>
              <p className="text-gray-600">Date: {initiative.date}</p>
              <p className="text-gray-600">Category: {initiative.category}</p>
              <div className="flex justify-center space-x-4 mt-4">
                <Link to={`/initiatives/${initiative._id}`}>
                  <button className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition duration-300">
                    View Details
                  </button>
                </Link>
                <button onClick={() => handleDelete(initiative._id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
