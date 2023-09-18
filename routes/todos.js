import express from 'express';

const router = express.Router(); //initialising router, just as we used app in index.js

//all routes in here are starting with /todos
router.get('/', (req, res) => {
  res.send('Hello');
});

export default router;
