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
    <div>
      <h1>All Organizations</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {organizations.map(org => (
            <li key={org._id}>
              <h2>{org.name}</h2>
              <p>Description: {org.description}</p>
              <p>Category: {org.category}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
