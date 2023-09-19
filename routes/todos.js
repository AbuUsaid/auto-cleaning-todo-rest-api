import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';

const router = express.Router(); //initialising router, just as we used app in index.js

const JSON_FILE_PATH = './todos.json'; //This file acts like DB

//funs to read and write to the JSON file
const readTodosFromFile = async () => {
  try {
    const data = await fs.readFile(JSON_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const writeTodosToFile = async (todos) => {
  try {
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(todos, null, 2), 'utf-8');
  } catch (error) {
    console.error(error);
  }
};

let todos = await readTodosFromFile();

//all routes in here are starting with /todos
router.get('/', (req, res) => {
  res.send(todos);
});

router.post('/', (req, res) => {
  const todo = req.body;

  todos.push({ ...todo, id: uuidv4() });
  writeTodosToFile(todos); //write updated todos to the JSON file.

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
  writeTodosToFile(todos); //write updated todos to the JSON file

  res.send(`Todo with the id "${id}" deleted from the database.`);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const todo = todos.find((todo) => todo.id === id);

  if (title) todo.title = title;
  if (description) todo.description = description;
  if (completed !== undefined) todo.completed = completed;

  writeTodosToFile(todos); //Write updated todos to the JSON file
  res.send(`Todo with the id "${id}" has been updated`);
});

export default router;
