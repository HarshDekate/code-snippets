import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
  const [codeSnippets, setCodeSnippets] = useState([]);

  useEffect(() => {
    const fetchCodeSnippets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/code-snippets');
        setCodeSnippets(response.data);
      } catch (error) {
        console.error('Error fetching code snippets:', error);
      }
    };

    fetchCodeSnippets();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Code Snippets</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Language</th>
            <th>Standard Input</th>
            <th>Source Code (First 100 characters)</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {codeSnippets.map((snippet, index) => (
            <tr key={index}>
              <td>{snippet.username}</td>
              <td>{snippet.language}</td>
              <td>{snippet.stdin}</td>
              <td>{snippet.sourceCode.substring(0, 100)}</td>
              <td>{new Date(snippet.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
