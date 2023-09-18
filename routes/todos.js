import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router(); //initialising router, just as we used app in index.js

let todos = [];

//all routes in here are starting with /todos
router.get('/', (req, res) => {
  res.send(todos);
});

router.post('/', (req, res) => {
  const todo = req.body;

  todos.push({ ...todo, id: uuidv4() });

  res.send(`Todo with the title "${todo.title}" added to the database!`);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const foundTodo = todos.find((todo) => todo.id === id);

  res.send(foundTodo);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  todos = todos.filter((todo) => todo.id !== id);

  res.send(`Todo with the id "${id}" deleted from the database.`);
});

export default router;
