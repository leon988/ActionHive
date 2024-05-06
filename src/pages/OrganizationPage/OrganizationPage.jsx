import React, { useState, useEffect } from 'react';
import { getAllOrganizations, updateOrganization, createOrganization } from '../../utilities/organizations-api';

export default function OrganizationsPage({ user }) {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', description: '', category: '' });
  const [organization, setOrganization] = useState(null);
  const [editing, setEditing] = useState(false);

  console.log(organizations, loading);
  console.log(user);

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

  // Filter organizations based on the current user's ID
  const userOrganization = organizations.filter(org => org.user === user._id);
  console.log(userOrganization);

  useEffect(() => {
    if (userOrganization.length > 0) {
      setOrganization(userOrganization[0]);
    }
  }, [userOrganization]);

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
        await updateOrganization(formData, organization._id); // Pass organization ID
      } else {
        await createOrganization(formData);
      }
      setEditing(false);
    } catch (error) {
      console.error('Error creating/updating organization:', error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await updateOrganization(formData, organization._id);
      setEditing(false);
    } catch (error) {
      console.error('Error updating organization:', error);
    }
  };

  return (
    <div>
      <h1>{organization ? 'Organization Info' : 'Create Organization'}</h1>
      {organization ? (
        <form onSubmit={handleUpdate}>
          <label>Name:
            <input type="text" name="name" value={organization.name} onChange={handleInputChange} />
          </label>

          <br />

          <label>Description:
            <textarea name="description" value={organization.description} onChange={handleInputChange} />
          </label>

          <br />

          <label>Category:
            <select name="category" value={organization.category} onChange={handleInputChange}>
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
        <form onSubmit={handleSubmit}>
          <label>Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>

          <br />

          <label>Description:
            <textarea name="description" value={formData.description} onChange={handleInputChange} />
          </label>

          <br />

          <label>Category:
            <select name="category" value={formData.category} onChange={handleInputChange}>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Social Services">Social Services</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <button type="submit">Create Organization</button>
        </form>
      )}
    </div>
  );
}
