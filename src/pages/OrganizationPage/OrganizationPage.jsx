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
        await updateOrganization(formData, organization._id); 
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
    <div className="bg-neutral min-h-screen text-dark p-8">
      <h1 className="text-3xl font-bold text-primary mb-8">
        {organization ? "Organization Info" : "Create Organization"}
      </h1>
      {organization ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold">Name:
              <input type="text" name="name" value={organization.name} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
            </label>
          </div>
  
          <div className="flex flex-col">
            <label className="font-semibold">Description:
              <textarea name="description" value={organization.description} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
            </label>
          </div>
  
          <div className="flex flex-col">
            <label className="font-semibold">Category:
              <select name="category" value={organization.category} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded w-full">
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Social Services">Social Services</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
  
          <div className="flex justify-center space-x-4 mt-4">
            <button type="submit" className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition duration-300">
              Save Changes
            </button>
            {organization && (
              <button type="button" onClick={() => setEditing(false)} className="bg-gray-300 text-dark py-2 px-4 rounded hover:bg-gray-400 transition duration-300">
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold">Name:
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
            </label>
          </div>
  
          <div className="flex flex-col">
            <label className="font-semibold">Description:
              <textarea name="description" value={formData.description} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
            </label>
          </div>
  
          <div className="flex flex-col">
            <label className="font-semibold">Category:
              <select name="category" value={formData.category} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded w-full">
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Social Services">Social Services</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
  
          <button type="submit" className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition duration-300 w-full">
            Create Organization
          </button>
        </form>
      )}
    </div>
  );
}