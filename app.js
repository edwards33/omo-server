const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParser = require('body-parser');

var mongoose = require('mongoose');
var cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/covomoDB");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authRouter = require('./src/routes/authRoutes')();

app.use('/auth', authRouter);

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
