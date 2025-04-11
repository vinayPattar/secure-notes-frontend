import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Sidebar from './AdminAreaSidebar';
import '../../styles/AdminAuditLogs.css';

const AdminAuditLogs = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const response = await api.get('/audit');
        setAuditLogs(response.data);
      } catch (err) {
        setError('Failed to fetch audit logs');
        console.error('Error fetching audit logs', err);
      }
    };

    fetchAuditLogs();
  }, []);

  const handleNoteDetailClick = (noteId) => {
    navigate(`/notes/${noteId}`);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="admin-audit-logs-page">
      <Sidebar />
      <div className="admin-audit-logs-container">
        <h2>Audit Logs</h2>
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Username</th>
              <th>Timestamp</th>
              <th>Note Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map(log => (
              <tr key={log.id}>
                <td>{log.action}</td>
                <td>{log.username}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
                <td>{log.noteContent}</td>
                <td>
                  <button onClick={() => handleNoteDetailClick(log.noteId)}>View Note</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAuditLogs;
