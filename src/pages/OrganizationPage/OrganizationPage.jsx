import React, { useState, useEffect } from 'react';
import { getOrganization, updateOrganization, createOrganization } from '../../utilities/organizations-api';

export default function OrganizationPage({ user }) {
  const [organization, setOrganization] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', category: '' });
  console.log(user)
  
  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const response = await getOrganization(user._id); 
        setOrganization(response);
        setFormData({
          name: response.name,
          description: response.description,
          category: response.category
        });
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
      if (organization) {
        await updateOrganization(formData);
      } else {
        await createOrganization(formData); 
      }
      setEditing(false);
    } catch (err) {
      console.error('Error updating organization:', err);
    }
  };
  console.log(organization, editing)
  return (
    <div>
      <h1>Organization Info</h1>
      {organization || editing ? (
        <form onSubmit={handleSubmit}>
          <label>Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>

          <br></br>

          <label>Description:
            <textarea name="description" value={formData.description} onChange={handleInputChange} />
          </label>

          <br></br>

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
