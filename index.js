import express from 'express';
import bodyParser from 'body-parser'; //helps us with post request bodies

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
