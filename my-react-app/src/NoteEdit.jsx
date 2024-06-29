import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function NoteEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noteText, setNoteText] = useState('');
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/notes/${id}`)
      .then(response => response.json())
      .then(data => setNoteText(data.text));
  }, [id]);

  const editNote = () => {
    fetch(`http://localhost:3000/notes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: noteText }),
    }).then(() => navigate('/'));
  };

  const generateImage = () => {
    fetch('http://localhost:3000/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: noteText }),
    })
      .then(response => response.json())
      .then(data => setImageData(data));
  };

  return (
    <div>
      <h1>Edit Note</h1>
      <input
        type="text"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
      <button onClick={editNote}>Save</button>
      <button onClick={generateImage}>Generate Image</button>
      {imageData && (
        <div>
          <img src={imageData.imageUrl} alt="Note related" />
          <p>
            Photo by <a href={imageData.author.link}>{imageData.author.name}</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default NoteEdit;
