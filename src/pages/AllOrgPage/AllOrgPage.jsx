import React, { useState, useEffect } from 'react';
import { getAllOrganizations } from '../../utilities/organizations-api';

export default function AllOrgPage() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const organizationsData = await getAllOrganizations();
        setOrganizations(organizationsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <div className="bg-neutral min-h-screen text-dark p-8">
      <h1 className="text-3xl font-bold text-primary mb-8">All Organizations</h1>
      {loading ? (
        <p className="text-lg text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-4">
          {organizations.map(org => (
            <li key={org._id} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-primary mb-2">{org.name}</h2>
              <p className="text-gray-800 mb-1">Description: {org.description}</p>
              <p className="text-gray-600">Category: {org.category}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
