import express from 'express';
import bodyParser from 'body-parser'; //helps us with post request bodies

import todosRoutes from './routes/todos.js';
import cron from 'node-cron';
import fs from 'fs/promises';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/todos', todosRoutes);

app.get('/', (req, res) => res.send('Hello from Homepage.'));

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

//schedule the deletion of completed:true task from the todos.json after x minutes
//replace the below expression to make it delete completed task everyday at midnight with '0 0 * * *'
cron.schedule('*/5 * * * *', async () => {
  try {
    const todos = await readTodosFromFile();

    //Filter out completed tasks and write the remaining tasks back the to the JSON file
    const remainingTodos = todos.filter((todo) => !todo.completed);

    await writeTodosToFile(remainingTodos);
    console.log('✅ Completed tasks removed from todos.json');
  } catch (error) {
    console.error(
      'Error while removing completed tasks from the todos.json',
      error
    );
  }
});

//func to read/write to the JSON file
const JSON_FILE_PATH = './todos.json';

const readTodosFromFile = async () => {
  try {
    const data = await fs.readFile(JSON_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
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
