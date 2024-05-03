import React, { useState } from 'react';

export default function CreateInitiativePage() {
    const [formData, setFormData] = useState({
        description: '',
        location:'',
        date: '',
        category: '',
        duration: '',
        requirements: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/initiatives', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create initiative');
            }
            alert('Initiative created successfully!');
            setFormData({
                description: '',
                location:'',
                date: '',
                category: '',
                duration: '',
                requirements: ''
            });
        } catch (error) {
            console.error('Creating initiative failed:', error);
            setError('Failed to create initiative - ' + error.message);
        }
    };

    return (
        <div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label>Description</label>
                    <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />

                    <label>Location</label>
                    <input type="text" name="street" placeholder="Street" value={formData.location.street} onChange={handleInputChange} required />
                    <br></br>
                    <input type="text" name="city" placeholder="City" value={formData.location.city} onChange={handleInputChange} required />
                    <br></br>
                    <input type="text" name="state" placeholder="State" value={formData.location.state} onChange={handleInputChange} required />
                    <br></br>
                    <input type="text" name="country" placeholder="Country" value={formData.location.country} onChange={handleInputChange} required />
                    <br></br>
                    <input type="text" name="zip" placeholder="Zip" value={formData.location.zip} onChange={handleInputChange} required />

                    <label>Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />

                    <label>Category:
                      <select name="category" value={formData.category} onChange={handleInputChange} required>
                        <option value="Education">Education</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Environmental">Environmental</option>
                        <option value="Community Development">Community Development</option>
                        <option value="Arts and Culture">Arts and Culture</option>
                        <option value="Human Rights">Human Rights</option>
                        <option value="Disaster Relief">Disaster Relief</option>
                        <option value="Animal Welfare">Animal Welfare</option>
                        <option value="Youth Programs">Youth Programs</option>
                        <option value="Senior Services">Senior Services</option>
                      </select>
                    </label>

                    <br></br>

                    <label>Duration</label>
                    <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} required />

                    <label>Requirements</label>
                    <input type="text" name="requirements" value={formData.requirements} onChange={handleInputChange} required />

                    <button type="submit">Create Initiative</button>
                </form>
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

