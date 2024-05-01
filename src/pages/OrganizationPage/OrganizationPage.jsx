import React, { useState, useEffect } from 'react';

export default function OrganizationPage() {
  const [organization, setOrganization] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', category: '' });

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const response = await fetch('/api/organizations'); 
        const data = await response.json();
        setOrganization(data);
        setFormData({
          name: data.name,
          description: data.description,
          category: data.category
        });
      } catch (err) {
        console.err('Failed to fetch organization data:', err);
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
      const response = await fetch('/api/organizations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });
      const updatedData = await response.json();
      setOrganization(updatedData);
      setEditing(false);
    } catch (err) {
      console.err('Error updating organization:', err);
    }
  };

  return (
    <div>
      <h1>Organization Info</h1>
      {organization ? (
        editing ? (
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
            <button type="button" onClick={() => setEditing(false)}>Cancel</button>
          </form>
        ) : (
          <div>
            <p>Name: {organization.name}</p>
            <p>Description: {organization.description}</p>
            <p>Category: {organization.category}</p>
            <button onClick={() => setEditing(true)}>Edit</button>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
