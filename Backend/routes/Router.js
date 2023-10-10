/* eslint-disable import/extensions */
import express from 'express';
import asyncHandler from 'express-async-handler';
import apicache from 'apicache';

const router = express.Router();

router.get('/test', (req, res) => {
  return res.status(200).send('OK');
});

export default router;
