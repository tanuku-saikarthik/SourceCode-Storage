import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  username: String,
  pCodeLang: String,
  stdin: String,
  sourcecode: String,
  timestamp: { type: Date, default: Date.now }
});

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
