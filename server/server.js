require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const middlewares = require('./middlewares');

const app = express();

//Generic middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the app');
});

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.on('open', () => console.log('Connected to Mongo DB'));

const hanjasRouter = require('./routes/hanjas');
app.use('/hanjas', hanjasRouter);

const wordsRouter = require('./routes/words');
app.use('/words', wordsRouter);

app.use(middlewares.errorHandler);
app.use(middlewares.notFound);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
