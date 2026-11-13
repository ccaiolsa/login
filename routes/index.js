import express from 'express';

const router = express.Router();

// respond with "hello world" when a GET request is made to the homepage
router.get('/', (req, res) => {
  res.send('hello world');
});

export default router;