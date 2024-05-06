import React, { useState, useEffect } from 'react';
import { getAllVolunteers, updateVolunteer, createVolunteer } from '../../utilities/volunteer-api';

export default function VolunteerPage({ user }) {
  const [volunteers, setVolunteers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    bio: '',
    skills: [],
    status: ''
  });
  const [volunteer, setVolunteer] = useState(null);
  const [editing, setEditing] = useState(false);

  console.log(volunteer,loading)
  console.log(user)

  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        const volunteerData = await getVolunteer();
        setVolunteer(volunteerData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching volunteer:', error);
      }
    };
  
    fetchVolunteerData();
  }, []); 
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(volunteer){
      await createVolunteer(formData, volunteer._id); 
      } else {
        await createVolunteer(formData);
      }
      setEditing(false);
    } catch (error) {
      console.error('Error creating volunteer:', error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await updateVolunteer(formData, volunteer._id); 
      setEditing(false);
    } catch (error) {
      console.error('Error updating volunteer:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{editing ? 'Edit Volunteer Profile' : 'Volunteer Profile'}</h1>
      <form onSubmit={editing ? handleUpdate : handleSubmit}>
        <label>
          Bio:
          <textarea name="bio" value={formData.bio} onChange={handleInputChange} />
        </label>

        <label>
          Skills:
          <input type="text" name="skills" value={formData.skills.join(', ')} onChange={handleInputChange} />
        </label>

        <label>
          Status:
          <input type="text" name="status" value={formData.status} onChange={handleInputChange} />
        </label>

        <button type="submit">{editing ? 'Save' : 'Create'}</button>
      </form>
    </div>
  );
}
