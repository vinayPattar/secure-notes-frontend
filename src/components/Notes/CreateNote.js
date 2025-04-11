import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/Notes.css';

const CreateNote = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const noteData = { content }; // Directly use the content as a string
      await api.post('/notes', noteData);
      navigate('/notes');
    } catch (err) {
      setError('Error creating note');
      console.error(err);
    }
  };

  return (
    <div className="note-form-container">
      <h2>Create a New Note</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="note-form">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter note content"
          required
        />
        <button type="submit">Create Note</button>
      </form>
    </div>
  );
};

export default CreateNote;
