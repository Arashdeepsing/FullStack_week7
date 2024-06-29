import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => setNotes(data));
  }, []);

  const addNote = () => {
    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: noteText }),
    })
      .then(response => response.json())
      .then(newNote => setNotes([...notes, newNote]));
  };

  const deleteNote = (id) => {
    fetch(`http://localhost:3000/notes/${id}`, { method: 'DELETE' })
      .then(() => setNotes(notes.filter(note => note.id !== id)));
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <Link to={`/note/${note.id}`}>{note.text}</Link>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
      <button onClick={addNote}>Add Note</button>
    </div>
  );
}

export default Home;
