import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getInitiative, updateInitiative } from '../../utilities/initiatives-api';

export default function EditInitiativePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

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
    requirements: ''
  });

  useEffect(() => {
    const fetchInitiative = async () => {
      try {
        const initiativeData = await getInitiative(id);
        setFormData(initiativeData[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching initiative:', error);
      }
    };

    fetchInitiative();
  }, [id]);

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

const handleUpdate = async (event) => {
  event.preventDefault();
  try {
    await updateInitiative(formData, id);
    // Optionally, navigate back to the initiative detail page after update
  } catch (error) {
    console.error('Error updating initiative:', error);
  }
};


  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Initiative</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>

        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleInputChange} />
        </label>

        <label>
          Street:
          <input type="text" name="street" value={formData.location.street} onChange={handleLocationChange} />
        </label>

        <label>
          City:
          <input type="text" name="city" value={formData.location.city} onChange={handleLocationChange} />
        </label>

        <label>
          State:
          <input type="text" name="state" value={formData.location.state} onChange={handleLocationChange} />
        </label>

        <label>
          Country:
          <input type="text" name="country" value={formData.location.country} onChange={handleLocationChange} />
        </label>

        <label>
          Zip:
          <input type="number" name="zip" value={formData.location.zip} onChange={handleLocationChange} />
        </label>

        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
        </label>

        <label>
          Category:
          <select name="category" value={formData.category} onChange={handleInputChange}>
            <option value="">Select a category</option>
            {['Education', 'Healthcare', 'Environmental', 'Community Development', 'Arts and Culture', 'Human Rights', 'Disaster Relief', 'Animal Welfare', 'Youth Programs', 'Senior Services'].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        <label>
          Duration:
          <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} />
        </label>

        <label>
          Requirements:
          <textarea name="requirements" value={formData.requirements} onChange={handleInputChange} />
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
