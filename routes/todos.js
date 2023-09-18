import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router(); //initialising router, just as we used app in index.js

const todos = [];

//all routes in here are starting with /todos
router.get('/', (req, res) => {
  res.send(todos);
});

router.post('/', (req, res) => {
  const todo = req.body;

  todos.push({ ...todo, id: uuidv4() });

  res.send(`Todo with the title " ${todo.title} " added to the database!`);
});

export default router;
