import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/Notes.css';

const NoteDetails = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const response = await api.get('/notes');
        const foundNote = response.data.find(n => n.id.toString() === id);
        if (foundNote) {
          foundNote.parsedContent = JSON.parse(foundNote.content).content; // Parse content
          setNote(foundNote);
        } else {
          setError('Note not found');
        }
      } catch (err) {
        setError('Failed to fetch notes');
        console.error('Error fetching note details', err);
      }
    };

    const checkAdminRole = async () => {
      try {
        const response = await api.get('/auth/user'); // Adjust the endpoint as necessary to get user info
        const roles = response.data.roles;
        if (roles.includes('ROLE_ADMIN')) {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error('Error checking admin role', err);
      }
    };

    const fetchAuditLogs = async () => {
      try {
        const response = await api.get(`/audit/note/${id}`);
        setAuditLogs(response.data);
      } catch (err) {
        console.error('Error fetching audit logs', err);
      }
    };

    fetchNoteDetails();
    checkAdminRole();
    if (isAdmin) {
      fetchAuditLogs();
    }
  }, [id, isAdmin]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="note-details-container">
      {note ? (
        <>
          <h2>Note Details</h2>
          <div className="note-content">{note.parsedContent}</div>
          {note.owner ? (
            <div className="note-metadata">
              <h3>Owner: {note.owner.username || "Unknown User"}</h3>
              <p>Email: {note.owner.email || "No Email Provided"}</p>
              <ul>
                {note.owner.roles.map(role => (
                  <li key={role.roleId}>{role.roleName}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No owner information available</p>
          )}
          {isAdmin && (
            <div className="audit-log">
              <h3>Audit Log</h3>
              <table>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Username</th>
                    <th>Timestamp</th>
                    <th>Note Content</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map(log => (
                    <tr key={log.id}>
                      <td>{log.action}</td>
                      <td>{log.username}</td>
                      <td>{new Date(log.timestamp).toLocaleString()}</td>
                      <td>{log.noteContent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NoteDetails;
