import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles2.css";

function Page2() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get('https://localhost:3001/api/submissions');
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  return (
<div className="container">
  <h2 className="title">Submitted Entries</h2>
  <div className="submission-wrapper">
    <ul className="submission-list">
      <li className="submission-header">
        <span>Username</span>
        <span>Code Language</span>
        <span>Standard Input</span>
        <span>Timestamp</span>
        <span>Source Code (First 100 Characters)</span>
      </li>
      {submissions.map((submission, index) => (
        <li key={index} className="submission-item">
          <span>{submission.username}</span>
          <span>{submission.pCodeLang}</span>
          <span>{submission.stdin}</span>
          <span>{submission.timestamp}</span>
          <span>{submission.sourcecode.substring(0, 100)}</span>
        </li>
      ))}
    </ul>
  </div>
</div>

  );
}

export default Page2;
