import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const AuditLogs = () => {
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const response = await api.get('/audit/logs');
        setAuditLogs(response.data);
      } catch (err) {
        console.error('Error fetching audit logs', err);
      }
    };

    fetchAuditLogs();
  }, []);

  return (
    <div className="audit-logs">
      <h2>Audit Logs</h2>
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
  );
};

export default AuditLogs;
