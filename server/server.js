require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const middleware = require('./middlewares');

const app = express();

//Generic middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());

app.get('', (req, res) => {
  res.send('Welcome to the app');
});

app.use(middleware.notFound);
app.use(middleware.errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
