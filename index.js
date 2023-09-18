import express from 'express';
import bodyParser from 'body-parser'; //helps us with post request bodies

import todosRoutes from './routes/todos.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/todos', todosRoutes);

app.get('/', (req, res) => res.send('Hello from Homepage.'));

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
