import React, { useState, useEffect } from 'react';

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch('/api/notes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        console.error('Failed to fetch notes');
      }
      setLoading(false);
    };

    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ text: newNote })
      });
  
      if (response.ok) {
        const addedNote = await response.json();
        setNotes(prevNotes => [addedNote, ...prevNotes]); 
        setNewNote(''); 
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add note');
      }
    } catch (error) {
      console.error('Error adding note:', error.message);
    }
  };
  
  return (
    <div>
      <h1>Your Notes</h1>
      <input
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Enter a new note"
      />
      <button onClick={handleAddNote}>Add Note</button>
      {loading ? (
        <p>Loading...</p>
      ) : notes.length > 0 ? (
        <ul>
          {notes.map(note => (
            <li key={note._id}>
              {note.text} - {new Date(note.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No Notes Yet!</p>
      )}
    </div>
  );
}

export default NotesPage;