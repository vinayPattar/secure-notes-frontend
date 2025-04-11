import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/Notes.css';

const AllNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get('/notes');
        const parsedNotes = response.data.map(note => ({
          ...note,
          parsedContent: JSON.parse(note.content).content // Assuming each note's content is JSON-formatted.
        }));
        setNotes(parsedNotes);
      } catch (error) {
        console.error('Error fetching notes', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="notes-container">
      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <p className="note-content">{note.parsedContent}</p>
          <Link to={`/notes/${note.id}`} className="note-link">View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default AllNotes;
