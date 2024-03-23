import express from 'express';
import db from '../config/database.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { username, pCodeLang, stdin, sourcecode } = req.body;
  const timestamp = new Date().toISOString();

  const sql = 'INSERT INTO submissions (username, pCodeLang, stdin, sourcecode, timestamp) VALUES (?, ?, ?, ?, ?)';
  const values = [username, pCodeLang, stdin, sourcecode, timestamp];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting submission into database:', err);
      return res.status(500).json({ success: false, message: 'Failed to submit entry' });
    }
    console.log('Submission inserted into database:', result);
    res.status(200).json({ success: true, message: 'Entry submitted successfully' });
  });
});

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM submissions';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving submissions from database:', err);
      return res.status(500).json({ success: false, message: 'Failed to retrieve submissions' });
    }

    console.log('Submissions retrieved from database:', results);
    res.status(200).json(results);
  });
});

export default router;
