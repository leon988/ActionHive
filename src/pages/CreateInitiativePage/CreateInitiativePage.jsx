import React, { useState } from 'react';
import { createInitiative } from '../../utilities/initiatives-api';

export default function CreateInitiativePage({ organizationId }) {
  console.log(organizationId)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: {
      street: '',
      city: '',
      state: '',
      country: '',
      zip: ''
    },
    date: '',
    category: '',
    duration: '',
    requirements: '',
    organization: organizationId 
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLocationChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      location: {
        ...prevState.location,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createInitiative(formData);
    } catch (error) {
      console.error('Error creating initiative:', error);
    }
  };

  return (
    <div className="bg-neutral min-h-screen text-dark p-8">
      <h2 className="text-3xl font-bold text-primary mb-8">Create Initiative</h2>
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
  
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold">Street:
              <input type="text" name="street" value={formData.location.street} onChange={handleLocationChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
            </label>
          </div>
          
          <div className="flex flex-col">
            <label className="font-semibold">City:
              <input type="text" name="city" value={formData.location.city} onChange={handleLocationChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
            </label>
          </div>
  
          <div className="flex flex-col">
            <label className="font-semibold">State:
              <input type="text" name="state" value={formData.location.state} onChange={handleLocationChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
            </label>
          </div>
  
          <div className="flex flex-col">
            <label className="font-semibold">Country:
              <input type="text" name="country" value={formData.location.country} onChange={handleLocationChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
            </label>
          </div>
  
          <div className="flex flex-col">
            <label className="font-semibold">Zip:
              <input type="number" name="zip" value={formData.location.zip} onChange={handleLocationChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
            </label>
          </div>
        </div>
  
        <div className="flex flex-col">
          <label className="font-semibold">Date:
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </label>
        </div>
  
        <div className="flex flex-col">
          <label className="font-semibold">Category:
            <select name="category" value={formData.category} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded w-full">
              <option value="">Select a category</option>
              {['Education', 'Healthcare', 'Environmental', 'Community Development', 'Arts and Culture', 'Human Rights', 'Disaster Relief', 'Animal Welfare', 'Youth Programs', 'Senior Services'].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
        </div>
  
        <div className="flex flex-col">
          <label className="font-semibold">Duration:
            <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </label>
        </div>
  
        <div className="flex flex-col">
          <label className="font-semibold">Requirements:
            <textarea name="requirements" value={formData.requirements} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </label>
        </div>
  
        <button type="submit" className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition duration-300 w-full">Create</button>
      </form>
    </div>
  );
}
