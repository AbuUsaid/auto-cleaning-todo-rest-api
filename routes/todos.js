import express from 'express';

const router = express.Router(); //initialising router, just as we used app in index.js

const todos = [
  {
    title: 'Finish report',
    description: 'Complete the project report.',
    completed: false,
  },
  {
    title: 'Grocery shopping',
    description: 'Buy groceries for the week.',
    completed: true,
  },
];

//all routes in here are starting with /todos
router.get('/', (req, res) => {
  res.send(todos);
});

router.post('/', (req, res) => {
  const todo = req.body;

  todos.push(todo);

  res.send(`Todo with the title " ${todo.title} " added to the database!`);
});

export default router;
