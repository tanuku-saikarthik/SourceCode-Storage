import express from 'express';
import submissionsRouter from './submissions.js';

const router = express.Router();

router.use('/submissions', submissionsRouter);

export default router;
