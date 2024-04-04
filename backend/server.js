import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import Submission from './models/submission.js';

const __dirname = path.resolve();

dotenv.config();
const app = express();
const port = process.env.PORT || "https://sourcecode-storage.onrender.com";
app.use(cors());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to MongoDB database');
});

app.use(bodyParser.json());

// POST endpoint to handle form submission
app.post('/api', async (req, res) => {
  try {
    const { username, pCodeLang, stdin, sourcecode } = req.body;
    const submission = new Submission({ username, pCodeLang, stdin, sourcecode });
    await submission.save();
    console.log('Submission inserted into database:', submission);
    res.status(200).json({ success: true, message: 'Entry submitted successfully' });
  } catch (err) {
    console.error('Error inserting submission into database:', err);
    res.status(500).json({ success: false, message: 'Failed to submit entry' });
  }
});

// GET endpoint to retrieve all submissions
app.get('/api/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find();
    console.log('Submissions retrieved from database:', submissions);
    res.status(200).json(submissions);
  } catch (err) {
    console.error('Error retrieving submissions from database:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve submissions' });
  }
});

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on https://sourcecode-storage.onrender.com`);
});
