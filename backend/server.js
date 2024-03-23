import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import dotenv from 'dotenv'; // Import dotenv package
import cors from 'cors';
import path from 'path';


const __dirname = path.resolve();


dotenv.config();
const app = express();
const port = process.env.PORT || 3001; // Use environment variable for port or default to 3001
app.use(cors());
 

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'pool'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); // Exit process if unable to connect to the database
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());

// POST endpoint to handle form submission
app.post('/api', (req, res) => {
  const { username, pCodeLang, stdin, sourcecode } = req.body;
  const timestamp = new Date().toISOString();

  const sql = 'INSERT INTO submissions (username, pCodeLang, stdin, sourcecode, timestamp) VALUES (?, ?, ?, ?, ?)';
  const values = [username, pCodeLang, stdin, sourcecode, timestamp];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting submission into database:', err);
      return res.status(500).json({ success: false, message: 'Failed to submit entry' });
    }
    console.log('Submission inserted into database:', result);
    res.status(200).json({ success: true, message: 'Entry submitted successfully' });
  });
});

// GET endpoint to retrieve all submissions
app.get('/api/submissions', (req, res) => {
  const sql = 'SELECT * FROM submissions';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving submissions from database:', err);
      return res.status(500).json({ success: false, message: 'Failed to retrieve submissions' });
    }

    console.log('Submissions retrieved from database:', results);
    res.status(200).json(results);
  });
});

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
