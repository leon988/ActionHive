import React, { useState, useEffect } from 'react';

export default function OrganizationPage() {
  const [organization, setOrganization] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', category: '' });

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const response = await fetch('/api/organizations');
        if (!response.ok) {
          setOrganization(null);
          setEditing(true); 
        } else {
          const data = await response.json();
          setOrganization(data);
          setFormData({
            name: data.name,
            description: data.description,
            category: data.category
          });
        }
      } catch (err) {
        console.error('Failed to fetch organization data:', err);
        setEditing(true);
      }
    };
    fetchOrganizationData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const method = organization ? 'PUT' : 'POST';
      const endpoint = '/api/organizations' + (organization ? '' : '/create'); 
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const updatedData = await response.json();
      setOrganization(updatedData);
      setEditing(false);
    } catch (err) {
      console.error('Error updating organization:', err);
    }
  };

  return (
    <div>
      <h1>Organization Info</h1>
      {organization || editing ? (
        <form onSubmit={handleSubmit}>
          <label>Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>
          <label>Description:
            <textarea name="description" value={formData.description} onChange={handleInputChange} />
          </label>
          <label>Category:
            <select name="category" value={formData.category} onChange={handleInputChange}>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Social Services">Social Services</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <button type="submit">Save Changes</button>
          {organization && <button type="button" onClick={() => setEditing(false)}>Cancel</button>}
        </form>
      ) : (
        <p>Loading or failed to load data...</p>
      )}
    </div>
  );
}