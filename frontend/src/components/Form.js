// src/components/Form.js

import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    username: '',
    language: '',
    stdin: '',
    sourceCode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/code-snippets', formData);
      alert('Code snippet submitted successfully!');
      setFormData({
        username: '',
        language: '',
        stdin: '',
        sourceCode: ''
      });
    } catch (error) {
      console.error('Error submitting code snippet:', error);
      alert('An error occurred while submitting the code snippet.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Submit Code Snippet</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="language" className="form-label">Preferred Code Language</label>
          <select className="form-select" id="language" name="language" value={formData.language} onChange={handleChange} required>
            <option value="">Select Language</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="stdin" className="form-label">Standard Input</label>
          <textarea className="form-control" id="stdin" name="stdin" value={formData.stdin} onChange={handleChange}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="sourceCode" className="form-label">Source Code</label>
          <textarea className="form-control" id="sourceCode" name="sourceCode" value={formData.sourceCode} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Form;
