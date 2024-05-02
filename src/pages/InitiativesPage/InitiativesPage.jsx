import React, { useState, useEffect } from 'react';

export default function InitiativesPage() {
    const [initiatives, setInitiatives] = useState([]);

    useEffect(() => {
        const fetchInitiatives = async () => {
            try {
                const response = await fetch('/api/initiatives'); 
                const data = await response.json();
                setInitiatives(data);
            } catch (error) {
                console.error('Failed to fetch initiatives:', error);
            }
        };
        fetchInitiatives();
    }, []);

    return (
        <div>
            <h1>Initiatives</h1>
            {initiatives.length > 0 ? (
                <ul>
                    {initiatives.map(initiative => (
                        <li key={initiative._id}>
                            {initiative.description} - {new Date(initiative.date).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No initiatives found.</p>
            )}
        </div>
    );
}
